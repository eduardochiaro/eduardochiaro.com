import { getProviders, signIn } from "next-auth/react"

export default function SignIn({ providers }) {
  return (
    <div className="container mx-auto">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className="text-white bg-gray-600 border border-gray-900 rounded px-8 py-2" onClick={() => signIn(provider.id)}>
            Sign A in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}