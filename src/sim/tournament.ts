import { stablesState } from './state';
import { fameIndex } from './fame';

export function openEntryWindow(division:string, startISO:string){
  const start = new Date(startISO);
  const lock = new Date(start); lock.setDate(lock.getDate()-7);
  stablesState.tournamentWindows?.push({ division, opensISO:new Date(lock.getTime()-24*3600*1000).toISOString(), locksISO: lock.toISOString(), tournamentStartISO:start.toISOString(), locked:false });
}

export function isEntryLocked(division:string){
  const w = stablesState.tournamentWindows?.find(x=> x.division===division);
  if (!w) return true;
  const locked = Date.now() >= Date.parse(w.locksISO);
  w.locked = locked; return locked;
}

export function submitEntry(division:string, warriorId:string){
  const arr = stablesState.tournamentEntries?.[division] ?? (stablesState.tournamentEntries![division]=[]);
  if (!arr.includes(warriorId)) arr.push(warriorId);
}

export function finalizeEntries(division:string){
  const pool = (stablesState.tournamentEntries?.[division] ?? []);
  if (pool.length<=16) return;
  const scored = pool.map(wid=>{
    const w = stablesState.warriors[wid];
    const rec = w?.record ?? {wins:0,losses:0};
    const pct = (rec.wins+rec.losses)? rec.wins/(rec.wins+rec.losses):0.5;
    const fame = fameIndex(w?.renown ?? 0, w?.notoriety ?? 0);
    return { wid, sc: pct*100 + fame + Math.random()*0.1 };
  }).sort((a,b)=> b.sc-a.sc);
  stablesState.tournamentEntries![division] = scored.slice(0,16).map(x=>x.wid);
}

export function ensureSchedule(division:string){
  const entries = stablesState.tournamentEntries?.[division] ?? [];
  if (entries.length===0) return;
  const days = 15;
  const schedule: Record<number, {a:string,b:string}[]> = {};
  // round-robin-ish pairing over 15 days with 16 entrants
  const ids = entries.slice();
  if (ids.length<16){ while(ids.length<16) ids.push(ids[0]); }
  const n = ids.length;
  for (let d=1; d<=days; d++){
    const matches = [];
    for (let i=0;i<n/2;i++){
      const a = ids[i]; const b = ids[n-1-i];
      matches.push({a,b});
    }
    schedule[d] = matches;
    // rotate (circle method)
    const fixed = ids[0];
    const rest = ids.slice(1);
    rest.unshift(rest.pop() as string);
    ids.splice(0, ids.length, fixed, *rest);
  }
  stablesState.tournamentSchedules![division] = schedule;
}
