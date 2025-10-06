import React, { useMemo, useState } from 'react';
import { stablesState } from '../../sim/state';
export default function PeopleDirectoryPanel(){
  const [q,setQ]=useState('');
  const rows = useMemo(()=> Object.values(stablesState.warriors).filter(w=> (w.role ?? 'warrior')==='warrior' && (w.name||'').toLowerCase().includes(q.toLowerCase())), [q]);
  return <section id="people-dir">
    <h3 style={{margin:'8px 0'}}>People Directory</h3>
    <input placeholder="Search warriors…" value={q} onChange={e=> setQ(e.target.value)} />
    <div style={{overflowX:'auto', marginTop:8}}>
      <table><thead><tr><th>Name</th><th>Style</th><th>Stable</th></tr></thead>
      <tbody>
        {rows.map(r=> <tr key={r.id}><td>{(r.name&&r.name.trim())?r.name:'(unnamed)'}</td><td>{r.style}</td><td>{r.stableId? stablesState.stables[r.stableId].name : '—'}</td></tr>)}
        {!rows.length && <tr><td colSpan={3} className="muted">No people match your filters.</td></tr>}
      </tbody></table>
    </div>
  </section>;
}
