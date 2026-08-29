// Mirrors the DTO shapes in KBM-Backend (Application/Features/**/DTOs).
// JSON is camelCase, matching ASP.NET Core's default System.Text.Json output.

export interface DepartmentDto {
  id: string
  name: string
  createdDate: string
  modifiedDate: string
}

export interface FunctionDto {
  id: string
  name: string
  createdDate: string
  lastModifiedDate: string
}

export interface IndustryDto {
  id: string
  name: string
  createdDate: string
  modifiedDate: string
}

export interface LessonDto {
  id: string
  title: string
  projectName: string
  departmentId: string
  functionId: string
  industryId: string
  valueProposition: string
  description: string
  imageUrl: string | null
  personToContact: string
  createdDate: string
  modifiedDate: string
}

export interface CreateLessonDto {
  title: string
  projectName: string
  departmentId: string
  functionId: string
  industryId: string
  valueProposition: string
  description: string
  imageUrl?: string | null
  personToContact: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
}

export interface AuthResponseDto {
  token: string
  refreshToken: string
  email: string
  role: 'Admin' | 'User'
}
