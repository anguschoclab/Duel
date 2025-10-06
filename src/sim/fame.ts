import { stablesState } from './state';
export function fameIndex(renown:number=0, notoriety:number=0){
  return Math.max(-100, Math.min(100, Math.round((renown - notoriety)/2)));
}
export function stablePolarity(stableId?: string){
  if (!stableId) return 'neutral' as const;
  const s = stablesState.stables[stableId]; if (!s) return 'neutral' as const;
  const idx = Math.round(((s.fame ?? 0) - (s.infamy ?? 0))/2);
  if (idx >= 25) return 'heroic' as const;
  if (idx <= -25) return 'infamous' as const;
  return 'neutral' as const;
}
export function reputationTitle(idx:number){
  if (idx>=60) return "Legend";
  if (idx>=30) return "Renowned";
  if (idx>=10) return "Noted";
  if (idx>=-9) return "Obscure";
  if (idx>=-29) return "Notorious";
  return "Infamous";
}
