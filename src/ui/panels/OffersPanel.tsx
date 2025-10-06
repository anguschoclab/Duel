import React from 'react';
import { stablesState } from '../../sim/state';
import { WarriorLink } from '../components/WarriorLink';
export default function OffersPanel(){
  const sid = stablesState.playerStableId!;
  const offers = (stablesState.offers ?? []).filter(o=> o.toStableId === sid);
  return <section id="offers">
    <h3 style={{margin:'8px 0'}}>Offers</h3>
    <div className="card">
      {offers.length? <ul>
        {offers.map(o=> <li key={o.id}>Home offer for <WarriorLink id={o.warriorId}/> from <b>{stablesState.stables[o.fromStableId]?.name}</b></li>)}
      </ul> : <div className="muted">No pending offers.</div>}
    </div>
  </section>;
}
