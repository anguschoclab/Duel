import React from 'react';
import { stablesState } from '../../sim/state';
import { fameIndex, reputationTitle } from '../../sim/fame';

export default function Dashboard(){
  const sid = stablesState.playerStableId!;
  const stable = stablesState.stables[sid];
  const idx = fameIndex(stable.fame??0, stable.infamy??0);
  return (
    <section className="card">
      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <h2 style={{margin:0}}>Stable Dashboard</h2>
        <span>{stable.name}</span>
        <span style={{marginLeft:'auto'}}>Reputation: <b>{reputationTitle(idx)}</b></span>
      </div>
      <div style={{marginTop:8, fontSize:14,color:'#475569'}}>Warriors: {stable.warriorIds.length}</div>
    </section>
  );
}