import type { Lesson } from './types'

const STORAGE_KEY = 'kbm-demo-lessons'

function readAll(): Lesson[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(lessons: Lesson[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lessons))
}

export function getDemoLessons(): Lesson[] {
  return readAll()
}

export function getDemoLessonById(id: string): Lesson | undefined {
  return readAll().find((l) => l.id === id)
}

export function addDemoLesson(lesson: Lesson): void {
  writeAll([lesson, ...readAll()])
}
