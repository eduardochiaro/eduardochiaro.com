import * as React from 'react';
import TwitterIcon from '../icons/twitter';
import LinkedInIcon from '../icons/linkedin';
import GitHubIcon from '../icons/github';
import Link from 'next/link';

export default function Share () {

  return (
    <section id="share" className="px-4 lg:px-0 mt-8 md:mt-10 ">
      <div className="max-w-5xl mx-auto flex gap-8">
        <span className="grow"/>
        <Link
          alt="GitHub"
          href="https://github.com/eduardochiaro"
          >
          <a className="flex-none w-30">
            <GitHubIcon
              className={`inline-block h-6 transition-colors ease-out duration-500 fill-zinc-900 dark:fill-zinc-100 hover:fill-primary-700 dark:hover:fill-primary-600`}
            />
          </a>
        </Link>
        <Link
          alt="LinkedIn"
          href="https://linkedin.com/in/eduardochiaro"
          >
          <a className="flex-none w-30">
            <LinkedInIcon
              className={`inline-block h-6 transition-colors ease-out duration-500 fill-zinc-900 dark:fill-zinc-100 hover:fill-primary-700 dark:hover:fill-primary-600`}
            />
          </a>
        </Link>
        <Link
          alt="Twitter"
          href="https://twitter.com/eduardo_chiaro"
          >
          <a className="flex-none w-30">
            <TwitterIcon
              className={`inline-block h-6 transition-colors ease-out duration-500 fill-zinc-900 dark:fill-zinc-100 hover:fill-primary-700 dark:hover:fill-primary-600`}
            />
          </a>
        </Link>
      </div>
    </section>
  )
}