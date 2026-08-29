import LessonCard from './LessonCard'
import type { Lesson } from '../types'

export default function LessonGroupedList({ lessons }: { lessons: Lesson[] }) {
  const groups = lessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
    acc[lesson.department] = acc[lesson.department] ?? []
    acc[lesson.department].push(lesson)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(groups).map(([department, group]) => (
        <section key={department} className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-text-primary">{department}</h2>
            <span className="rounded-full bg-bg-card-alt px-2.5 py-0.5 text-xs font-medium text-text-muted">
              {group.length} lesson{group.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {group.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
