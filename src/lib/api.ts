import type { User } from './types'

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    // Pegar session do localStorage
    const sessionId = typeof window !== 'undefined' ? localStorage.getItem('session_id') : null

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    // Adicionar Authorization header se tiver session
    if (sessionId) {
      headers['Authorization'] = `Bearer ${sessionId}`
    }

    // Merge com headers das options
    if (options?.headers) {
      Object.assign(headers, options.headers)
    }

    const config: RequestInit = {
      ...options,
      credentials: 'include',
      headers,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `HTTP ${response.status}`)
    }

    const result = await response.json()
    return result
  }

  // Health Check
  async healthCheck(): Promise<string> {
    const response = await fetch(`${this.baseURL}/health`)
    return response.text()
  }

  // Auth URL (para redirecionamento)
  getGoogleAuthURL(): string {
    return `${this.baseURL}/api/auth/google`
  }

  // Buscar dados do usuário
  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/auth/me')
  }

  // Get auth token for seamless redirect
  async getAuthToken(): Promise<{ token: string }> {
    return this.request<{ token: string }>('/api/auth/token', {
      method: 'POST',
    })
  }
}

export const api = new ApiClient(API_URL)