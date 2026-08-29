import LessonCard from './LessonCard'
import type { Lesson } from '../types'

export default function LessonGrid({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {lessons.map((lesson) => (
        <LessonCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  )
}
