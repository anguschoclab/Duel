import { stablesState } from '../sim/state';
export type Semver = { major: number; minor: number; patch: number };
export type Milestone = { id:string; version:string; name:string; notes?:string; dateISO:string; hash:string };
export type VersioningState = { current: Semver; codename?: string; milestones: Milestone[]; autoWeeklyPatch?: boolean };
function stableStringify(obj:any){ const seen=new WeakSet(); const walk=(x:any):any=>{ if(x&&typeof x==='object'){ if(seen.has(x))return'[circular]'; seen.add(x); if(Array.isArray(x))return x.map(walk); const out:any={}; for(const k of Object.keys(x).sort()) out[k]=walk(x[k]); return out; } if(typeof x==='function')return'[fn]'; if(typeof x==='undefined')return null; return x; }; return JSON.stringify(walk(obj)); }
function tinyHash(str:string){ let h=2166136261>>>0; for(let i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619);} return ('0000000'+(h>>>0).toString(16)).slice(-8); }
export function computeWorldSnapshotHash(): string {
  const sample = { warriors: stablesState.warriors, stables: stablesState.stables, tournaments: { entries: stablesState.tournamentEntries, schedules: stablesState.tournamentSchedules, windows: stablesState.tournamentWindows, }, versioning: stablesState.versioning?.current };
  return tinyHash(stableStringify(sample));
}
function semverToString(v: Semver){ return `${v.major}.${v.minor}.${v.patch}`; }
function ensureVersioning(): VersioningState {
  if (!stablesState.versioning) stablesState.versioning = { current:{major:0,minor:9,patch:0}, codename:"Arena Bloom", milestones:[], autoWeeklyPatch:false };
  return stablesState.versioning as VersioningState;
}
export type BumpKind = 'major'|'minor'|'patch';
export function tagMilestone(kind:BumpKind, name:string, notes?:string){
  const vs=ensureVersioning(); const cur={...vs.current};
  if(kind==='major'){ cur.major+=1; cur.minor=0; cur.patch=0; }
  if(kind==='minor'){ cur.minor+=1; cur.patch=0; }
  if(kind==='patch'){ cur.patch+=1; }
  vs.current=cur;
  const ms: Milestone = { id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`, version:semverToString(cur), name, notes, dateISO:new Date().toISOString(), hash:computeWorldSnapshotHash() };
  vs.milestones.unshift(ms); return ms;
}
export function getCurrentVersion(){ const v=ensureVersioning().current; return { version: `${v.major}.${v.minor}.${v.patch}`, codename: ensureVersioning().codename }; }
export function setCodename(label:string){ ensureVersioning().codename = label; }
export function listMilestones(){ return ensureVersioning().milestones.slice(); }
export function toggleAutoWeeklyPatch(enabled:boolean){ ensureVersioning().autoWeeklyPatch = enabled; }
