import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Breadcrumb from '../../../shared/components/Breadcrumb'
import Button from '../../../shared/components/Button'
import FallbackBanner from '../../../shared/components/FallbackBanner'
import LessonFilters from '../components/LessonFilters'
import LessonGrid from '../components/LessonGrid'
import LessonGroupedList from '../components/LessonGroupedList'
import Pagination from '../components/Pagination'
import { useLessons } from '../hooks/useLessons'
import { useCatalog } from '../hooks/useCatalog'

export default function LessonsListPage() {
  const { lessons, loading, isFallback } = useLessons()
  const { catalog } = useCatalog()
  const [groupByDepartment, setGroupByDepartment] = useState(false)
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')

  const departmentNames = useMemo(() => catalog.departments.map((d) => d.name), [catalog])
  const functionNames = useMemo(() => catalog.functions.map((f) => f.name), [catalog])

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const matchesSearch = lesson.title.toLowerCase().includes(search.toLowerCase())
      const matchesDepartment = !department || lesson.department === department
      return matchesSearch && matchesDepartment
    })
  }, [lessons, search, department])

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

      {isFallback && (
        <div className="mt-6">
          <FallbackBanner />
        </div>
      )}

      <div className="mt-8">
        <LessonFilters
          departments={departmentNames}
          keywords={functionNames}
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          groupByDepartment={groupByDepartment}
          onToggleGroup={() => setGroupByDepartment((v) => !v)}
        />
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="py-12 text-center text-text-muted">Loading lessons...</p>
        ) : filteredLessons.length === 0 ? (
          <p className="py-12 text-center text-text-muted">No lessons match your filters.</p>
        ) : groupByDepartment ? (
          <LessonGroupedList lessons={filteredLessons} />
        ) : (
          <>
            <LessonGrid lessons={filteredLessons} />
            <div className="mt-8">
              <Pagination />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
