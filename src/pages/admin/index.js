import { useSession, signIn, signOut } from "next-auth/react"

export default function AdminIndex() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="container mx-auto">
        Signed in as {session.user.email} <br />
        <button className="rounded bg-gray-600 text-white py-2 px-1" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div className="container mx-auto">
      Not signed in <br />
      <button className="rounded bg-gray-600 text-white py-1 px-4" onClick={() => signIn()}>Sign in</button>
    </div>
  )
}