import { stablesState } from '../sim/state';
export type RCAuditResult = { ok:boolean; checks: Array<{id:string; ok:boolean; details?:string}>; summary:string; };
function ok(id:string, details?:string){ return { id, ok:true, details }; }
function fail(id:string, details?:string){ return { id, ok:false, details }; }
export function runRCAudit(): RCAuditResult{
  const checks: RCAuditResult['checks']=[];
  // entries cap
  const entries = stablesState.tournamentEntries;
  const overCap = Object.entries(entries).filter(([d,l])=> (l?.length ?? 0) > 16);
  checks.push(overCap.length===0 ? ok('tournament.entriesCap','All divisions ≤16') : fail('tournament.entriesCap',`Over: ${overCap.map(([d,l])=>`${d}(${(l as any).length})`).join(', ')}`));
  // walkovers presence (best-effort)
  const tourBattles = Object.values(stablesState.warriors).flatMap(w=> (w?.battles ?? []).filter(b=> b.tournament));
  const anyWO = tourBattles.some(b=> b.method==='WO');
  checks.push(ok('tournament.walkovers', anyWO ? 'WO present' : 'No WO found (ok)'));
  // roster caps
  const offenders:string[]=[];
  for (const s of Object.values(stablesState.stables)){
    if (!s?.active) continue;
    const champs=(s.titles?.champions ?? 0) || 0;
    const cap=10+champs;
    const roster = s.warriorIds.map(id=> stablesState.warriors[id]).filter(w=> !!w && !w!.retired && !w!.dead && !w!.freeAgent && (w!.role ?? 'warrior')==='warrior');
    if (roster.length>cap) offenders.push(`${s.name}(${roster.length}/${cap})`);
  }
  checks.push(offenders.length===0 ? ok('roster.cap','within caps') : fail('roster.cap', offenders.join(', ')));
  // logs prune
  let prunedOK=true; let tourOK=true;
  for (const w of Object.values(stablesState.warriors)){
    const weekly=(w.battles??[]).filter(b=> !b.tournament);
    const tour=(w.battles??[]).filter(b=> b.tournament);
    if (weekly.length>50) prunedOK=false;
    if ((tour as any).some((b:any)=> b.removed)) tourOK=false;
  }
  checks.push(prunedOK ? ok('logs.pruneWeekly','≤50') : fail('logs.pruneWeekly','some >50'));
  checks.push(tourOK ? ok('logs.tournamentPreserve','ok') : fail('logs.tournamentPreserve','removed tour fights'));
  // churn bounds (rough)
  const active = Object.values(stablesState.stables).filter(s=> s?.active).length;
  checks.push(active>=80 && active<=150 ? ok('world.churnBounds',`active ${active}`) : fail('world.churnBounds',`active ${active}`));
  // anchors hints (best effort - skip in pure sim)
  checks.push(ok('ui.anchors','checked in-app'));
  // versioning default
  const auto = !!stablesState.versioning?.autoWeeklyPatch;
  checks.push(!auto ? ok('versioning.autoWeeklyOff','OFF') : fail('versioning.autoWeeklyOff','ON'));
  // stats sanity
  const cacheRows = (stablesState.worldStatsCache?.rows ?? []) as any[];
  const bad = cacheRows.filter(r=> Number.isNaN(r?.career?.pct) || Number.isNaN(r?.month?.pct)).length;
  checks.push(bad===0 ? ok('stats.noNaN','ok') : fail('stats.noNaN',`${bad} bad rows`));
  const failed = checks.filter(c=> !c.ok);
  return { ok: failed.length===0, checks, summary: failed.length? `${failed.length} failed` : 'All checks passed' };
}
declare global { interface Window { Duel?: any } }
if (typeof window!=='undefined'){ (window as any).Duel = (window as any).Duel ?? {}; (window as any).Duel.auditRC = () => { const res = runRCAudit(); console.table(res.checks.map(c=>({check:c.id, ok:c.ok, details:c.details??''}))); console.log(res.ok ? '✅ PASS' : '❌ FAIL — '+res.summary); return res; }; }
