type Toast = { id: string; text: string; href?: string; expiresAt: number };
const toasts: Toast[] = [];
const listeners = new Set<() => void>();
const QUEUE_CAP = 20;
const LIFETIME_MS = 8000;
function gc(){
  const now = Date.now();
  while (toasts.length && toasts[0].expiresAt <= now) toasts.shift();
  while (toasts.length > QUEUE_CAP) toasts.shift();
}
export function pushToast(text:string, href?:string){
  gc(); toasts.push({ id:`${Date.now()}-${Math.random()}`, text, href, expiresAt: Date.now()+LIFETIME_MS });
  for (const l of listeners) l();
}
export function useToasts(){ gc(); return toasts.slice(); }
export function subscribeToasts(fn:()=>void){ listeners.add(fn); return ()=> listeners.delete(fn); }
