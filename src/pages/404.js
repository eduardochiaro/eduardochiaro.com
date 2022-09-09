import styles from '../styles/404.module.scss'
import NotFound from '../components/icons/404'
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="h-screen justify-center">
      <center className="pt-24 m-auto">
        <div className="max-w-xl mx-auto">
          <NotFound className="w-full"/>
        </div>
        <div className="tracking-widest mt-4">
        <span className="text-xl">Sorry, We couldn&lsquo;t find what you are looking for!</span>

        </div>
        </center>
        <center className="mt-6">
          <Link
            href="/">
            <a className="text-zinc-500 text-xl bg-primary-300 p-3 rounded-md hover:shadow-md">Go back </a>
            </Link>
      </center>
    </div>
  )
}