import { useState } from 'react'
import { Search, Settings2 } from 'lucide-react'
import Input from '../../../shared/components/Input'
import Select from '../../../shared/components/Select'
import Button from '../../../shared/components/Button'

export interface LessonFilterValues {
  search: string
  department: string
  keyword: string
}

export default function LessonFilters({
  departments,
  keywords,
  onApply,
  groupByDepartment,
  onToggleGroup,
}: {
  departments: string[]
  keywords: string[]
  onApply: (values: LessonFilterValues) => void
  groupByDepartment: boolean
  onToggleGroup: () => void
}) {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [keyword, setKeyword] = useState('')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <Input
            placeholder="Search for a lesson..."
            icon={<Search size={16} />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onApply({ search, department, keyword })}
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            placeholder="All Departments"
            clearable
            options={departments}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            placeholder="All Keywords"
            clearable
            options={keywords}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <Button variant="primary" className="w-full md:w-auto" onClick={() => onApply({ search, department, keyword })}>
          Apply
        </Button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onToggleGroup}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
        >
          <Settings2 size={15} />
          {groupByDepartment ? 'Ungroup lessons' : 'Group by Department'}
        </button>
      </div>
    </div>
  )
}
