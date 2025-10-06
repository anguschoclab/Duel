import React, { useState } from 'react';
import { runRCAudit, type RCAuditResult } from '../../dev/rcAudit';
export default function RCAuditPanel(){
  const [res,setRes]=useState<RCAuditResult|null>(null);
  return <section id="rc-audit">
    <div className="row"><h3 style={{margin:0}}>RC Audit</h3><button onClick={()=> setRes(runRCAudit())}>Run Audit</button>{res && <span className={res.ok?'muted':''} style={{marginLeft:8}}>{res.ok? 'PASS':'FAIL'} — {res.summary}</span>}</div>
    {res && <div className="card" style={{marginTop:8}}>
      <table><thead><tr><th>Check</th><th>Result</th><th>Details</th></tr></thead><tbody>
        {res.checks.map(c=> <tr key={c.id}><td>{c.id}</td><td style={{color:c.ok?'#047857':'#b91c1c'}}>{c.ok?'OK':'FAIL'}</td><td>{c.details ?? '—'}</td></tr>)}
      </tbody></table>
    </div>}
  </section>;
}
