import { useState } from 'react'
import CompleteBrandDashboardDemo from './Complete_Brand_Dashboard_Demo'

const DEMO_PASSWORD = 'sublimebrands'

function App() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('openleaf-auth') === 'true'
  )
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === DEMO_PASSWORD) {
      sessionStorage.setItem('openleaf-auth', 'true')
      setAuthenticated(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (authenticated) {
    return <CompleteBrandDashboardDemo />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Open Leaf</h1>
          <p className="text-sm text-gray-500 mt-1">Cannabis Trust Layer — Demo Access</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false) }}
            placeholder="Enter demo password"
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors ${
              error ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
            autoFocus
          />
          {error && (
            <p className="text-sm text-red-600 mt-2">Incorrect password. Please try again.</p>
          )}
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Access Demo
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          This is a private demo. Contact your account rep for access.
        </p>
      </div>
    </div>
  )
}

export default App
