import { useEffect, useState } from 'react'
import { fetchLessonById } from '../api'
import { getLessonById } from '../mockData'
import type { Lesson } from '../types'

export function useLesson(id: string | undefined) {
  const [lesson, setLesson] = useState<Lesson | undefined>(() => getLessonById(id ?? ''))
  const [loading, setLoading] = useState(true)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    if (!id) {
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
