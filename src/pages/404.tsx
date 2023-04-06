import NotFound from '@/components/icons/404';
import ThemeIcon from '@/components/ThemeIcon';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 right-4">
        <ThemeIcon orientation="bottom" />
      </div>
      <center className="pt-24 m-auto">
        <div className="max-w-xl mx-auto">
          <NotFound className="w-full" />
        </div>
        <div className="tracking-widest mt-4">
          <span className="text-xl">Sorry, We couldn&lsquo;t find what you are looking for!</span>
        </div>
      </center>
      <center className="mt-6">
        <Link href="/" className="bg-primary-500 dark:bg-primary-50 text-primary-50 dark:text-primary-900 rounded text-xl p-2">
          Go back
        </Link>
      </center>
    </div>
  );
}
