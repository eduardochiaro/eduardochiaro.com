import * as React from 'react';
import TwitterIcon from '../elements/icons/twitter';
import LinkedInIcon from '../elements/icons/linkedin';
import GitHubIcon from '../elements/icons/github';

export default function Share () {

  return (
    <section className={`mt-10 bg-green-sheen-500 text-white px-0 sm:px-2 md:px-4 shadow-xl`}>
      <div className="container mx-auto py-8 flex justify-center md:justify-start gap-8">
        <div className="flex-inital lg:mx-2 hidden md:block">
          <h3 className="font-header leading-tight text-2xl lg:text-4xl font-light">
            Connect <span className="text-gray-900">more</span> with me...
          </h3>
        </div>
        <div className="flex-initial w-30 text-center h-10">
          <a href="https://twitter.com/eduardochiaro" title="Twitter">
            <TwitterIcon
              className={`inline-block h-full transition duration-150 ease-out text-white hover:text-gray-600 hover:scale-110`}
            />
          </a>
        </div>
        <div className="flex-initial w-30 text-center h-10">
          <a href="https://linkedin.com/in/eduardochiaro" title="LinkedIn">
            <LinkedInIcon
              className={`inline-block h-full transition duration-150 ease-out text-white hover:text-gray-600 hover:scale-110`}
            />
          </a>
        </div>
        <div className="flex-initial w-30 text-center h-10">
        <a href="https://github.com/eduardochiaro" title="GitHub">
            <GitHubIcon
              className={`inline-block h-full transition duration-150 ease-out text-white hover:text-gray-600 hover:scale-110`}
            />
          </a>
        </div>
      </div>
    </section>
  )
}