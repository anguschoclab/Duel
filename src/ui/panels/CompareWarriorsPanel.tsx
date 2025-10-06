import React, { useMemo, useState } from 'react';
import { stablesState } from '../../sim/state';

export default function CompareWarriorsPanel(){
  const warriors = Object.values(stablesState.warriors).filter(w=> (w.role ?? 'warrior')==='warrior');
  const [a,setA]=useState(''); const [b,setB]=useState('');
  const A = useMemo(()=> warriors.find(w=> w.id===a), [a]);
  const B = useMemo(()=> warriors.find(w=> w.id===b), [b]);
  function record(w:any){ const W=w.record?.wins??0, L=w.record?.losses??0, K=w.record?.kills??0; const pct=(W+L)? (W/(W+L)*100).toFixed(1):'0.0'; return `${W}-${L}-${K} (${pct}%)`; }
  return <section id="compare">
    <h3 style={{margin:'8px 0'}}>Compare Warriors</h3>
    <div className="row">
      <select value={a} onChange={e=> setA(e.target.value)}><option value="">Select A…</option>{warriors.map(w=> <option key={w.id} value={w.id}>{w.name}</option>)}</select>
      <select value={b} onChange={e=> setB(e.target.value)}><option value="">Select B…</option>{warriors.map(w=> <option key={w.id} value={w.id}>{w.name}</option>)}</select>
      <button disabled={!A||!B} onClick={()=>{
        if (!A||!B) return;
        const rows = [
          ['Metric', A.name, B.name],
          ['Record', record(A), record(B)],
          ['Style', A.style, B.style]
        ];
        const csv = rows.map(r=> r.map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')).join('\n');
        const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'}));
        const aEl = document.createElement('a'); aEl.href=url; aEl.download=`compare_${A.name}_vs_${B.name}.csv`; aEl.click(); URL.revokeObjectURL(url);
      }}>Export CSV</button>
    </div>
    {A && B && <div className="card" style={{marginTop:8}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <div><b>{A.name}</b><div>Style: {A.style}</div><div>Record: {record(A)}</div></div>
        <div><b>{B.name}</b><div>Style: {B.style}</div><div>Record: {record(B)}</div></div>
      </div>
    </div>}
  </section>;
}
