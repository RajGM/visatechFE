'use client'
import { useContext } from 'react'
import { UserContext } from '@lib/context'

/**
 * Wraps some UI so that only signed-in users see it.
 * @param {{ children: React.ReactNode, fallback?: React.ReactNode }} props
 */
export default function AuthCheck({ children, fallback }) {
  const { user } = useContext(UserContext)
  return user ? <>{children}</> : fallback ?? <p>You must be signed in</p>
}
