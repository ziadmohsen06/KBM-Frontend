import { useEffect, useState } from 'react'
import { fetchLessons } from '../api'
import { lessons as mockLessons } from '../mockData'
import { getDemoLessons } from '../localDemoStore'
import type { Lesson } from '../types'

export function useLessons() {
  const [lessons, setLessons] = useState<Lesson[]>(mockLessons)
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    let cancelled = false

    fetchLessons()
      .then((result) => {
        if (!cancelled) {
          setLessons(result)
          setIsFallback(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLessons([...getDemoLessons(), ...mockLessons])
          setIsFallback(true)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { lessons, loading, isFallback }
}
