import moment from 'moment';
import * as React from 'react';
import { CodeBracketIcon } from '@heroicons/react/24/solid';

// pull bio from contentful api endpoint

export default function Bio() {
  return (
    <section id="bio-component" className="px-4 lg:px-0 mt-8 md:mt-10">
      <div className="max-w-5xl mx-auto tracking-wide">
        <h1 className="font-header md:leading-loose tracking-wide text-5xl xl:text-8xl font-bold">
          Hi!
          <br />
          I&apos;m Eduardo
        </h1>
        <h2 className="font-header md:leading-loose tracking-wide text-xl lg:text-5xl xl:text-6xl font-bold pt-4 pb-5 md:pb-8 flex items-center gap-4">
            Software Developer since 2005
        </h2>
        <p className="mt-5 md:text-lg font-normal text-primary-600 dark:text-primary-400">
          I have extensive experience designing and developing bespoke web applications with {moment().diff('2005-09-01', 'years')} years experience working on
          full-stack applications like e-commerce, APIs, and web apps.
        </p>
        <p className="mt-5 md:text-lg font-normal text-primary-600 dark:text-primary-400">
          After many years of working with PHP, I switched to Node.js and have been using it ever since. It&rsquo;s my passion to learn new technologies and I
          never stop learning.
        </p>
      </div>
    </section>
  );
}
