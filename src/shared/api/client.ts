import type { AuthResponseDto } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7119/api/v1'
const TOKEN_STORAGE_KEY = 'kbm-auth'

export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export function getStoredAuth(): AuthResponseDto | null {
  try {
    const raw = window.localStorage.getItem(TOKEN_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoredAuth(auth: AuthResponseDto | null) {
  if (auth) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(auth))
  } else {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  auth?: boolean
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = false } = options

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (auth) {
    const stored = getStoredAuth()
    if (stored?.token) headers.Authorization = `Bearer ${stored.token}`
  }

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch (err) {
    throw new ApiError(0, `Could not reach the API at ${API_BASE_URL}. Is the backend running and CORS-enabled? (${(err as Error).message})`)
  }

  if (response.status === 204) return undefined as T

  const text = await response.text()
  const data = text ? JSON.parse(text) : undefined

  if (!response.ok) {
    const message = typeof data === 'string' ? data : data?.title ?? data?.message ?? response.statusText
    throw new ApiError(response.status, message)
  }

  return data as T
}
