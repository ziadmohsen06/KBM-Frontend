import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Breadcrumb from '../../../shared/components/Breadcrumb'
import Button from '../../../shared/components/Button'
import LessonFilters from '../components/LessonFilters'
import LessonGrid from '../components/LessonGrid'
import LessonGroupedList from '../components/LessonGroupedList'
import Pagination from '../components/Pagination'
import { lessons } from '../mockData'

export default function LessonsListPage() {
  const [groupByDepartment, setGroupByDepartment] = useState(false)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Lessons Learned' }]} />

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-text-primary">Lesson Learned</h1>
          <p className="mt-2 text-sm text-text-muted">
            A dedicated space for automation engineers to reflect, share, and grow - documenting key
            takeaways, challenges, and solutions discovered during project lifecycles.
          </p>
        </div>
        <Link to="/lessons/create" className="shrink-0">
          <Button variant="primary">
            <Plus size={16} /> Create Lessons
          </Button>
        </Link>
      </div>

      <div className="mt-8">
        <LessonFilters
          groupByDepartment={groupByDepartment}
          onToggleGroup={() => setGroupByDepartment((v) => !v)}
        />
      </div>

      <div className="mt-8">
        {groupByDepartment ? (
          <LessonGroupedList lessons={lessons} />
        ) : (
          <>
            <LessonGrid lessons={lessons} />
            <div className="mt-8">
              <Pagination />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
