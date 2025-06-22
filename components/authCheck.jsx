'use client'
import { useContext } from 'react'
import { UserContext } from '@lib/context'
import { SignInButton } from "@components/signinButton";
import { SignOutButton } from "@components/signoutButton";

/**
 * Shows its children only to authenticated users.
 *
 * @param {{ children: React.ReactNode; fallback?: React.ReactNode }} props
 */
export default function AuthCheck({ children, fallback }) {
  const { user } = useContext(UserContext)
  console.log('AuthCheck user:', user)

  return (
    <>
      {/* Auth status banner */}
      <div className="mb-4 text-sm">
        {user ? (
          <p>
            Logged in as&nbsp;
            <strong>{user.displayName}</strong> ({user.email})
            <SignOutButton className="ml-2 inline-block" />
          </p>
        ) : (
          <p>
            Please log in to add and update bookings.
            <SignInButton className="ml-2 inline-block" />
          </p>
        )}
      </div>

      {/* Protected content */}
      {user ? children : fallback ?? <p>You must be signed in</p>}
    </>
  )
}
