import { apiRequest } from './client'
import type { AuthResponseDto, LoginDto, RegisterDto } from './types'

export const login = (dto: LoginDto) => apiRequest<AuthResponseDto>('/auth/login', { method: 'POST', body: dto })

export const register = (dto: RegisterDto) =>
  apiRequest<AuthResponseDto>('/auth/register', { method: 'POST', body: dto })

export const logout = () => apiRequest<void>('/auth/logout', { method: 'POST', auth: true })
