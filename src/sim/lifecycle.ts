import { stablesState } from './state';
import { publishNews } from './news';

export function weeklyMaintenance(){
  pruneWeeklyFightLogs();
  enforceRosterCaps();
  enforceStableChurn();
  publishNews("Week rolls by…","Systems maintained.");
}

export function pruneWeeklyFightLogs(){
  for (const w of Object.values(stablesState.warriors)){
    if (!w?.battles) continue;
    const weekly = w.battles.filter(b=> !b.tournament);
    const tourny = w.battles.filter(b=> b.tournament);
    const keptWeekly = weekly.slice(-50);
    w.battles = [...keptWeekly, ...tourny].sort((a,b)=> a.dateISO<b.dateISO?-1:1);
  }
}

function currentCapForStable(id:string){
  const s = stablesState.stables[id];
  const champs = (s.titles?.champions ?? 0) || 0;
  return 10 + champs;
}

export function enforceRosterCaps(){
  for (const s of Object.values(stablesState.stables)){
    if (!s?.active) continue;
    const cap = currentCapForStable(s.id);
    const roster = s.warriorIds.map(id=> stablesState.warriors[id]).filter(w=> !!w && !w!.retired && !w!.dead && !w!.freeAgent && (w!.role ?? 'warrior')==='warrior');
    if (roster.length <= cap){ stablesState.complianceFlags[s.id] = false; continue; }
    const overBy = roster.length - cap;
    const isPlayer = s.id === stablesState.playerStableId;
    if (isPlayer){
      stablesState.complianceFlags[s.id] = true;
    } else {
      autoTrimRoster(s.id, overBy);
    }
  }
}

function autoTrimRoster(stableId:string, count:number){
  const s = stablesState.stables[stableId]; if (!s) return;
  const roster = s.warriorIds.map(id=> stablesState.warriors[id]).filter(w=> !!w && !w!.retired && !w!.dead && !w!.freeAgent);
  const scored = roster.map(w=>{
    const W=w!.record.wins, L=w!.record.losses; const pct = (W+L)?W/(W+L):0;
    const age = w!.age ?? 0;
    const val = pct*100 - age*0.2;
    return { id:w!.id, score: val };
  }).sort((a,b)=> a.score-b.score);
  const cut = scored.slice(0, count).map(x=>x.id);
  for (const id of cut){ fireWarriorToPool(stableId, id); }
}

function fireWarriorToPool(stableId:string, wid:string){
  const s = stablesState.stables[stableId]; if (!s) return;
  s.warriorIds = s.warriorIds.filter(id=> id!==wid);
  const w = stablesState.warriors[wid]; if (w){ w.freeAgent = true as any; w.stableId = null; }
  stablesState.freeAgentPool.push(wid);
}
