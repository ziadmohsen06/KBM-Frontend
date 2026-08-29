import { apiRequest } from './client'
import type { DepartmentDto, FunctionDto, IndustryDto } from './types'

export const getDepartments = () => apiRequest<DepartmentDto[]>('/departments')
export const getFunctions = () => apiRequest<FunctionDto[]>('/functions')
export const getIndustries = () => apiRequest<IndustryDto[]>('/industries')
