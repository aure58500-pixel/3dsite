import { useSyncExternalStore } from 'react'
import { mediaMatches, subscribeMedia } from '../lib/media'

const QUERY = '(prefers-reduced-motion: reduce)'

const subscribe = (callback: () => void): (() => void) => subscribeMedia(QUERY, callback)
const getSnapshot = (): boolean => mediaMatches(QUERY)
const getServerSnapshot = (): boolean => false

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
