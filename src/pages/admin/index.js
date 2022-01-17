import { useSession, signIn, signOut } from "next-auth/react"
import SVG from 'react-inlinesvg'

export default function AdminIndex() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="container mx-auto text-center">
        Signed in as {session.user.email} <br />
        <button className="rounded bg-gray-600 text-white py-1 px-4" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center min-h-screen from-green-sheen-100 via-green-sheen-300 to-green-sheen-500 bg-gradient-to-br">
    <div className='w-full max-w-lg px-10 py-8 mx-auto'>
        <div className='max-w-md mx-auto space-y-6'>
          <div className="bg-white rounded-lg shadow-xl px-4 py-6 text-center">
            <div className="mx-auto w-40 text-center mb-4">
              <SVG
                  title="" 
                  alt="" 
                  className={`w-40 mainLogo`}
                  width={65}
                  src={'/images/logo-n.svg'} />
            </div>
            Not signed in <br />
            <button className="rounded bg-gray-600 text-white text-3xl py-1 px-4 mt-8" onClick={() => signIn()}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  )
}