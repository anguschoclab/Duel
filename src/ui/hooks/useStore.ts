import { useSyncExternalStore } from 'react'
import { stablesState } from '../../sim/state'
import { bus } from '../../sim/bus'

/** Subscribe to the global sim state with a selector (Zustand-ish API). */
export function useStore<T>(selector: (s: typeof stablesState) => T): T {
  return useSyncExternalStore(
    bus.subscribe,
    () => selector(stablesState),
    () => selector(stablesState) // SSR fallback
  )
}

/** Optional helpers you may want later */
export const getState = () => stalesafe(stablesState)
function stalesafe<T extends object>(o: T): T {
  // avoid accidental mutation patterns in components
  return o
}