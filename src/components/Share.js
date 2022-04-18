import * as React from 'react';
import TwitterIcon from '../elements/icons/twitter';
import LinkedInIcon from '../elements/icons/linkedin';
import GitHubIcon from '../elements/icons/github';

export default function Share () {

  return (
    <section id="share" className="px-8 lg:px-0 mt-10">
      <div className="max-w-5xl mx-auto my-10 flex justify-center md:justify-start gap-8">
        <div className="flex-initial w-30 text-center h-6">
          <a href="https://twitter.com/eduardochiaro" title="Twitter">
            <TwitterIcon
              className={`inline-block h-full transition duration-500 ease-out hover:text-gray-600 dark:hover:text-gray-400 hover:scale-125`}
            />
          </a>
        </div>
        <div className="flex-initial w-30 text-center h-6">
          <a href="https://linkedin.com/in/eduardochiaro" title="LinkedIn">
            <LinkedInIcon
              className={`inline-block h-full transition duration-500 ease-out hover:text-gray-600 dark:hover:text-gray-400 hover:scale-125`}
            />
          </a>
        </div>
        <div className="flex-initial w-30 text-center h-6">
        <a href="https://github.com/eduardochiaro" title="GitHub">
            <GitHubIcon
              className={`inline-block h-full transition duration-500 ease-out hover:text-gray-600 dark:hover:text-gray-400 hover:scale-125`}
            />
          </a>
        </div>
      </div>
    </section>
  )
}