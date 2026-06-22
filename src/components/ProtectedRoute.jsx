import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Loading from '@/components/Loading'

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, profile, loading } = useAuth()

  if (loading) return <Loading />

  // Not authenticated -> redirect to login
  if (!user) return <Navigate to="/login" replace />

  // If role check is specified and user doesn't have the required role
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // Admin tries to access member page or vice versa
    if (profile.role === 'admin') return <Navigate to="/" replace />
    if (profile.role === 'member') return <Navigate to="/member/orders" replace />
    return <Navigate to="/" replace />
  }

  return children
}
