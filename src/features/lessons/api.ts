import { apiRequest } from '../../shared/api/client'
import { getDepartments, getFunctions, getIndustries } from '../../shared/api/catalog'
import type { CreateLessonDto, DepartmentDto, FunctionDto, IndustryDto, LessonDto } from '../../shared/api/types'
import type { CategoryColor, Lesson } from './types'

const CATEGORY_COLORS: CategoryColor[] = ['blue', 'orange', 'green']

function colorForName(name: string): CategoryColor {
  const hash = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  return CATEGORY_COLORS[hash % CATEGORY_COLORS.length]
}

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/)
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
}

export interface Catalog {
  departments: DepartmentDto[]
  functions: FunctionDto[]
  industries: IndustryDto[]
}

export async function fetchCatalog(): Promise<Catalog> {
  const [departments, functions, industries] = await Promise.all([
    getDepartments(),
    getFunctions(),
    getIndustries(),
  ])
  return { departments, functions, industries }
}

export function toLesson(dto: LessonDto, catalog: Catalog): Lesson {
  const department = catalog.departments.find((d) => d.id === dto.departmentId)
  const fn = catalog.functions.find((f) => f.id === dto.functionId)
  const industry = catalog.industries.find((i) => i.id === dto.industryId)
  const functionName = fn?.name ?? 'General'

  return {
    id: dto.id,
    title: dto.title,
    projectName: dto.projectName,
    department: department?.name ?? 'Unknown Department',
    functionName,
    industry: industry?.name ?? 'Unknown Industry',
    categoryLabel: functionName.toUpperCase(),
    categoryColor: colorForName(functionName),
    caption: dto.projectName,
    authorName: dto.personToContact,
    authorInitials: initialsFor(dto.personToContact) || 'NA',
    authorAvatarColor: colorForName(dto.personToContact),
    rating: undefined,
    reviewCount: undefined,
    valueProposition: dto.valueProposition,
    description: dto.description,
    personToContact: dto.personToContact,
    attachments: [],
    quickLinks: [],
    keywords: [functionName, industry?.name].filter((v): v is string => Boolean(v)),
  }
}

export async function fetchLessons(): Promise<Lesson[]> {
  const [lessons, catalog] = await Promise.all([apiRequest<LessonDto[]>('/lessons'), fetchCatalog()])
  return lessons.map((dto) => toLesson(dto, catalog))
}

export async function fetchLessonById(id: string): Promise<Lesson> {
  const [dto, catalog] = await Promise.all([apiRequest<LessonDto>(`/lessons/${id}`), fetchCatalog()])
  return toLesson(dto, catalog)
}

export async function createLesson(dto: CreateLessonDto): Promise<LessonDto> {
  return apiRequest<LessonDto>('/lessons', { method: 'POST', body: dto, auth: true })
}
