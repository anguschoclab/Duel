import React, { useMemo, useState } from 'react';
import { stablesState } from '../../sim/state';

export default function ComparePanel(){
  const warriors = Object.values(stablesState.warriors).filter(w=> w.role==='warrior');
  const [a,setA]=useState(''); const [b,setB]=useState('');
  const A = useMemo(()=> warriors.find(w=> w.id===a), [a]);
  const B = useMemo(()=> warriors.find(w=> w.id===b), [b]);
  function record(w:any){ const W=w.record?.wins??0, L=w.record?.losses??0, K=w.record?.kills??0; const pct=(W+L)? (W/(W+L)*100).toFixed(1):'0.0'; return `${W}-${L}-${K} (${pct}%)`; }
  return (
    <section>
      <h3 style={{margin:'8px 0'}}>Compare Warriors</h3>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
        <select value={a} onChange={e=> setA(e.target.value)}>
          <option value="">Select A…</option>
          {warriors.map(w=> <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
        <select value={b} onChange={e=> setB(e.target.value)}>
          <option value="">Select B…</option>
          {warriors.map(w=> <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>
      </div>
      {A && B && (
        <div className="card" style={{marginTop:8}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
            <div><b>{A.name}</b><div>Style: {A.style}</div><div>Record: {record(A)}</div></div>
            <div><b>{B.name}</b><div>Style: {B.style}</div><div>Record: {record(B)}</div></div>
          </div>
        </div>
      )}
    </section>
  );
}