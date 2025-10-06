import React, { useMemo, useState } from 'react';
import { listMilestones, tagMilestone, getCurrentVersion, setCodename, toggleAutoWeeklyPatch } from '../../versioning/registry';
export default function MilestonesPanel(){
  const [name,setName]=useState(''); const [notes,setNotes]=useState(''); const [kind,setKind]=useState<'major'|'minor'|'patch'>('patch');
  const [codename,setCode]=useState(getCurrentVersion().codename ?? '');
  const ms = useMemo(()=> listMilestones(), []);
  const cur = getCurrentVersion();
  return <section id="milestones">
    <div className="row"><h3 style={{margin:0}}>Milestones</h3><span className="muted">Current v{cur.version}{codename?` “${codename}”`:''}</span></div>
    <div className="card" style={{display:'grid', gap:8}}>
      <div className="row">
        <select value={kind} onChange={e=> setKind(e.target.value as any)}>
          <option value="patch">Patch</option><option value="minor">Minor</option><option value="major">Major</option>
        </select>
        <input placeholder="Milestone name" value={name} onChange={e=> setName(e.target.value)} />
        <input placeholder="Notes (optional)" value={notes} onChange={e=> setNotes(e.target.value)} style={{flex:1}} />
        <button onClick={()=>{ if (!name.trim()) return; tagMilestone(kind, name.trim(), notes.trim()||undefined); location.reload(); }}>Tag</button>
      </div>
      <div className="row">
        <input placeholder="Codename" value={codename} onChange={e=> setCode(e.target.value)} />
        <button onClick={()=>{ setCodename(codename); location.reload(); }}>Set Codename</button>
        <label className="row" style={{gap:6, marginLeft:8}}><input type="checkbox" onChange={e=> toggleAutoWeeklyPatch(e.target.checked)}/> Auto-tag weekly patches</label>
      </div>
    </div>
    <div className="card" style={{marginTop:8}}>
      <table><thead><tr><th>Version</th><th>Name</th><th>Date</th><th>Hash</th><th>Notes</th></tr></thead><tbody>
        {ms.length? ms.map(m=> <tr key={m.id}><td>v{m.version}</td><td>{m.name}</td><td>{new Date(m.dateISO).toLocaleString()}</td><td><code>{m.hash}</code></td><td className="muted">{m.notes ?? '—'}</td></tr>)
        : <tr><td colSpan={5} className="muted">No milestones yet.</td></tr>}
      </tbody></table>
    </div>
  </section>;
}
