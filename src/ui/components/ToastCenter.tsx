import React, { useEffect, useState } from 'react';
import { subscribeToasts, useToasts } from '../store/ToastStore';
export default function ToastCenter(){
  const [,force]=useState(0);
  useEffect(()=>{ const u=subscribeToasts(()=> force(x=>x+1)); const t=setInterval(()=>force(x=>x+1),1000); return ()=>{u(); clearInterval(t);} },[]);
  const list = useToasts();
  if (!list.length) return null;
  return <div style={{position:'fixed', right:16, bottom:16, display:'grid', gap:8, zIndex:50}}>
    {list.slice(-4).map(t=> <a key={t.id} href={t.href ?? '#'} className="card" style={{padding:'8px 12px', fontSize:14}}>{t.text}</a>)}
  </div>;
}
