import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuth } from '../auth/AuthContext'
import { ApiError } from '../api/client'

export default function LoginPage() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password)
      }
      navigate('/lessons')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: mode === 'login' ? 'Log In' : 'Register' }]} />

      <div className="mt-6 rounded-xl border border-border bg-bg-card p-6">
        <h1 className="text-xl font-bold text-text-primary">{mode === 'login' ? 'Log In' : 'Create an Account'}</h1>
        <p className="mt-1 text-sm text-text-muted">
          {mode === 'login'
            ? 'Log in to create and manage lessons.'
            : 'Register a new account to start contributing lessons.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" variant="primary" disabled={loading} className="w-full">
            {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Register'}
          </Button>
        </form>

        <button
          onClick={() => setMode((m) => (m === 'login' ? 'register' : 'login'))}
          className="mt-4 text-sm text-accent hover:underline cursor-pointer"
        >
          {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Log In'}
        </button>
      </div>
    </div>
  )
}
