import React, { useMemo, useState } from 'react';
import { stablesState } from '../../sim/state';
import { openEntryWindow, isEntryLocked, submitEntry, finalizeEntries, ensureSchedule } from '../../sim/tournament';

openEntryWindow("Champions", new Date(Date.now()+8*24*3600*1000).toISOString());

export default function TournamentEntryPanel({division}:{division:string}){
  const locked = isEntryLocked(division);
  const [q,setQ] = useState('');
  const player = stablesState.stables[stablesState.playerStableId!];
  const candidates = useMemo(()=> player.warriorIds.map(id=> stablesState.warriors[id]).filter(w=> (w.name||'').toLowerCase().includes(q.toLowerCase())), [q]);
  const entries = (stablesState.tournamentEntries[division] ?? []).map(id=> stablesState.warriors[id]);
  return <section>
    <div className="row">
      <h3 style={{margin:0}}>Tournament Entries — {division}</h3>
      {locked ? <span title="Locked">🔒 Locked</span> : <span title="Open">🟢 Open</span>}
      {!locked && <small className="hint">Max 16 entrants; oversub trims by record+fame</small>}
      <button style={{marginLeft:'auto'}} disabled={locked} onClick={()=>{ finalizeEntries(division); ensureSchedule(division); }}>Finalize</button>
    </div>
    {!locked && <div className="row" style={{marginTop:8}}>
      <input placeholder="Filter your warriors…" value={q} onChange={e=> setQ(e.target.value)} />
      <button onClick={()=>{ if (candidates.length) submitEntry(division, candidates[0].id); }}>Submit first match</button>
    </div>}
    <div style={{marginTop:8}}>
      <b>Current Entries ({entries.length}/16)</b>
      <ul>{entries.map(w=> <li key={w.id}>{w.name}</li>)}{!entries.length && <li className="muted">No entries yet.</li>}</ul>
    </div>
  </section>;
}
