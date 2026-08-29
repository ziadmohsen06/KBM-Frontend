import { Search, Settings2 } from 'lucide-react'
import Input from '../../../shared/components/Input'
import Select from '../../../shared/components/Select'
import Button from '../../../shared/components/Button'
import { departments, keywordsList } from '../mockData'

export default function LessonFilters({
  groupByDepartment,
  onToggleGroup,
}: {
  groupByDepartment: boolean
  onToggleGroup: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex-1">
          <Input placeholder="Search for a lesson..." icon={<Search size={16} />} />
        </div>
        <div className="w-full md:w-48">
          <Select placeholder="Department" options={departments} />
        </div>
        <div className="w-full md:w-48">
          <Select placeholder="Keywords" options={keywordsList} />
        </div>
        <Button variant="primary" className="w-full md:w-auto">
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
