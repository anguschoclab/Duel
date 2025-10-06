import React from 'react';
import { stablesState } from '../../sim/state';
import { reputationTitle } from '../../sim/fame';
export default function StableDashboardPanel(){
  const sid = stablesState.playerStableId!;
  const s = stablesState.stables[sid];
  const idx = Math.round(((s.fame ?? 0) - (s.infamy ?? 0))/2);
  const over = !!stablesState.complianceFlags[sid];
  return <section className="card">
    <div className="row">
      <h2 style={{margin:0}}>Stable Dashboard</h2>
      <span className="muted">{s.name}</span>
      <span style={{marginLeft:'auto'}}>Reputation: <b>{reputationTitle(idx)}</b></span>
      <a href="#people-dir">People Directory ↗</a>
    </div>
    {over && <div className="card" style={{background:'#fffbeb', borderColor:'#fde68a', color:'#92400e', marginTop:8}}>⚠️ Over roster cap — trim your roster in the Roster panel.</div>}
  </section>;
}
