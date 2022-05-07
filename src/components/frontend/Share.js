import * as React from 'react';
import TwitterIcon from '../icons/twitter';
import LinkedInIcon from '../icons/linkedin';
import GitHubIcon from '../icons/github';

export default function Share () {

  return (
    <section id="share" className="px-4 lg:px-0 mt-8 md:mt-10 ">
      <div className="max-w-5xl mx-auto flex flex-row-reverse gap-8">
        <div className="flex-initial w-30 text-center h-6">
          <a href="https://twitter.com/eduardochiaro" title="Twitter">
            <TwitterIcon
              className={`inline-block h-full transition-color hover:text-primary-700 dark:hover:text-primary-600`}
            />
          </a>
        </div>
        <div className="flex-initial w-30 text-center h-6">
          <a href="https://linkedin.com/in/eduardochiaro" title="LinkedIn">
            <LinkedInIcon
              className={`inline-block h-full transition-color  hover:text-primary-700 dark:hover:text-primary-600`}
            />
          </a>
        </div>
        <div className="flex-initial w-30 text-center h-6">
        <a href="https://github.com/eduardochiaro" title="GitHub">
            <GitHubIcon
              className={`inline-block h-full transition-color hover:text-primary-700 dark:hover:text-primary-600`}
            />
          </a>
        </div>
      </div>
    </section>
  )
}