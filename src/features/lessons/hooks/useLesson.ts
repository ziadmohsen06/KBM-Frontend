import { useEffect, useState } from 'react'
import { fetchLessonById } from '../api'
import { getLessonById } from '../mockData'
import { getDemoLessonById } from '../localDemoStore'
import type { Lesson } from '../types'

function findFallback(id: string): Lesson | undefined {
  return getDemoLessonById(id) ?? getLessonById(id)
}

export function useLesson(id: string | undefined) {
  const [lesson, setLesson] = useState<Lesson | undefined>(() => (id ? findFallback(id) : undefined))
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }

    const demo = getDemoLessonById(id)
    if (demo) {
      setLesson(demo)
      setIsFallback(true)
      setLoading(false)
      return
    }

    let cancelled = false

    fetchLessonById(id)
      .then((result) => {
        if (!cancelled) {
          setLesson(result)
          setIsFallback(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLesson(getLessonById(id))
          setIsFallback(true)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  return { lesson, loading, isFallback }
}
