import React, { Suspense } from 'react';
import { seedWorld, stablesState } from '../sim/state';
import Dashboard from './panels/Dashboard';
import TournamentEntryPanel from './panels/TournamentEntryPanel';
import PeopleDirectory from './panels/PeopleDirectory';
import ComparePanel from './panels/ComparePanel';

seedWorld();

export default function App(){
  return (
    <div className="container" style={{display:'grid', gap:16}}>
      <h1 style={{marginBottom:0}}>Duelmasters (Dev)</h1>
      <Dashboard/>
      <div className="card"><TournamentEntryPanel division="Champions"/></div>
      <div className="card"><PeopleDirectory/></div>
      <div className="card" id="compare"><ComparePanel/></div>
    </div>
  );
}
