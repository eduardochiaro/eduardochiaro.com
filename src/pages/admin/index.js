import { LoginIcon, LogoutIcon, InboxIcon } from "@heroicons/react/outline"
import { useSession, signIn, signOut } from "next-auth/react"
import SVG from 'react-inlinesvg'

export default function AdminIndex({ basePath }) {
  const { data: session } = useSession();
  if (session) {
    return (

      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
        <div className="fixed flex flex-col top-0 left-0 w-64 bg-gray-50 h-full border-r">
          <div className="flex items-center justify-center h-14 border-b">
            <div>Admin</div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                </div>
              </li>
              <li>
                <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-terra-cotta-500 pr-6">
                  <InboxIcon className="inline-flex justify-center items-center ml-4 w-5"/>
                  <span className="ml-2 text-sm tracking-wide truncate">Inbox</span>
                  <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-terra-cotta-600 bg-terra-cotta-100 rounded-full">New</span>
                </a>
              </li>
              <li className="px-5">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">Signed in as {session.user.email}</div>
                </div>
              </li>
              <li>
                <a onClick={() => signOut()} className="cursor-pointer relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-terra-cotta-500 pr-6">
                  <LogoutIcon className="inline-flex justify-center items-center ml-4 w-5" />
                  <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-auto bg-isabelline-100">

        </div>
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
            <p className="text-xl font-header ">Not signed in</p>
            <button className="relative w-fit h-fit px-4 py-2 bg-independence-700 text-2xl border rounded text-white mt-8" onClick={() => signIn(null, { callbackUrl: basePath + 'admin' })}>
              Sign in
              <LoginIcon className="h-6 inline ml-2 align-sub"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: { basePath: process.env.NEXTAUTH_URL },
  }
}