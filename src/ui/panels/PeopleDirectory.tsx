import React, { useMemo, useState } from 'react';
import { stablesState } from '../../sim/state';

export default function PeopleDirectory(){
  const [q,setQ]=useState('');
  const rows = useMemo(()=> Object.values(stablesState.warriors).filter(w=> w.role==='warrior' && w.name.toLowerCase().includes(q.toLowerCase())), [q]);
  return (
    <section>
      <h3 style={{margin:'8px 0'}}>People Directory</h3>
      <input placeholder="Search warriors…" value={q} onChange={e=> setQ(e.target.value)} />
      <div style={{overflowX:'auto', marginTop:8}}>
        <table style={{width:'100%'}}>
          <thead><tr><th>Name</th><th>Style</th><th>Stable</th></tr></thead>
          <tbody>
            {rows.map(r=> <tr key={r.id}><td>{r.name}</td><td>{r.style}</td><td>{r.stableId ? stablesState.stables[r.stableId].name : '—'}</td></tr>)}
            {!rows.length && <tr><td colSpan={3} style={{color:'#64748b'}}>No people match your filters.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}