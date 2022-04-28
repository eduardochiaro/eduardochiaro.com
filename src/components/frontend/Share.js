import * as React from 'react';
import TwitterIcon from '../icons/twitter';
import LinkedInIcon from '../icons/linkedin';
import GitHubIcon from '../icons/github';

export default function Share () {

  return (
    <section id="share" className="px-8 lg:px-0 mt-10">
      <div className="max-w-5xl mx-auto my-10 flex flex-row-reverse gap-8">
        <div className="flex-initial w-30 text-center h-6">
          <a href="https://twitter.com/eduardochiaro" title="Twitter">
            <TwitterIcon
              className={`inline-block h-full transition hover:text-gray-600 dark:hover:text-gray-400`}
            />
          </a>
        </div>
        <div className="flex-initial w-30 text-center h-6">
          <a href="https://linkedin.com/in/eduardochiaro" title="LinkedIn">
            <LinkedInIcon
              className={`inline-block h-full transition  hover:text-gray-600 dark:hover:text-gray-400`}
            />
          </a>
        </div>
        <div className="flex-initial w-30 text-center h-6">
        <a href="https://github.com/eduardochiaro" title="GitHub">
            <GitHubIcon
              className={`inline-block h-full transition hover:text-gray-600 dark:hover:text-gray-400`}
            />
          </a>
        </div>
      </div>
    </section>
  )
}