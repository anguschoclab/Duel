import React from 'react';
import { stablesState } from '../../sim/state';
export function WarriorLink({id}:{id:string}){
  const w = stablesState.warriors[id];
  const nm = (w?.name && w.name.trim()) ? w.name : '(unnamed)';
  return <a href={'#warrior-'+id} title={id}>{nm}</a>;
}
