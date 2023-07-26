"use client";

import moment from 'moment';
import * as React from 'react';
import { CodeBracketIcon } from '@heroicons/react/24/solid';
import Coffee from '../icons/Coffee';

// pull bio from contentful api endpoint

export default function Bio() {
  return (
    <section id="bio-component" className="px-4 lg:px-0 mt-8 md:mt-10">
      <div className="max-w-5xl mx-auto tracking-wide">
        <h1 className="font-header md:leading-loose tracking-wide text-5xl xl:text-8xl font-bold">
          Hi! I&apos;m <span className="overlay-color">Eduardo</span>,
        </h1>
        <h2 className="font-header md:leading-loose tracking-wide text-xl lg:text-5xl xl:text-6xl font-bold pt-4 pb-5 md:pb-6 flex items-center gap-4">
          an application developer with over {moment().diff('2005-09-01', 'years')} years of experience.
        </h2>
        <p className="mt-5 md:text-xl md:leading-relaxed font-normal text-primary-600 dark:text-primary-400">
          I&lsquo;ve been tinkering with Node.js for the last few years, building SaaS applications that are scalable and flexible. I&lsquo;m a big believer in
          using the latest technologies and best practices to stay on the cutting edge of development.
        </p>
        <p className="mt-5 md:text-xl md:leading-relaxed font-normal text-primary-600 dark:text-primary-400">
          You&lsquo;ve stumbled onto my personal website, where you can learn more about me and check out some of my latest projects. So grab a{' '}
          <Coffee className="h-6 inline align-text-bottom overlay-color" /> coffee, take a seat, and let&lsquo;s scroll down...
        </p>
      </div>
    </section>
  );
}
