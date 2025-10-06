import React, { Suspense } from 'react';
import './App.css';
import { seedWorld } from '../sim/state';
import StableDashboardPanel from './panels/StableDashboardPanel';
import TournamentEntryPanel from './panels/TournamentEntryPanel';
import PeopleDirectoryPanel from './panels/PeopleDirectoryPanel';
import CompareWarriorsPanel from './panels/CompareWarriorsPanel';
import OffersPanel from './panels/OffersPanel';
import MilestonesPanel from './panels/MilestonesPanel';
import RCAuditPanel from './panels/RCAuditPanel';
import ToastCenter from './components/ToastCenter';
import { VersionBadge } from './components/VersionBadge';

seedWorld();

export default function App(){
  return <div className="container" style={{display:'grid', gap:16}}>
    <div className="row" style={{justifyContent:'space-between'}}>
      <h1 style={{margin:0}}>Duelmasters (Dev)</h1>
      <VersionBadge/>
    </div>
    <div className="card"><StableDashboardPanel/></div>
    <div className="card"><TournamentEntryPanel division="Champions"/></div>
    <div className="card"><PeopleDirectoryPanel/></div>
    <div className="card" id="compare"><CompareWarriorsPanel/></div>
    <div className="card" id="offers"><OffersPanel/></div>
    <div className="card" id="milestones"><MilestonesPanel/></div>
    <div className="card" id="rc-audit"><RCAuditPanel/></div>
    <ToastCenter/>
  </div>;
}
