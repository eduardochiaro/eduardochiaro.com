import moment from 'moment';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import CoffeeIcon from '../icons/coffee';

export default function Bio () {
  return (
    <section id="bio" className="px-4 lg:px-0 mt-8 md:mt-10">
      <span className="anchor" name="top"/>
      <div className="max-w-5xl mx-auto tracking-wide">
        <h1 className="font-header md:leading-loose tracking-wide text-3xl lg:text-5xl xl:text-6xl font-bold">
          I&apos;m <span className="from-accent-500 bg-gradient-to-br to-red-500 bg-clip-text text-transparent">Eduardo</span>,
        </h1>
        <h2 className="font-header md:leading-loose tracking-wide text-3xl lg:text-5xl xl:text-6xl font-bold pb-5 md:pb-8">
          a <CoffeeIcon className={`inline-block w-8 lg:w-16 text-primary-700 dark:text-primary-600`}/> caffeine-fueled
          Software Developer who lives in Washington State.
        </h2>
        <p className="mt-5 md:text-lg font-normal text-zinc-600 dark:text-zinc-400">
          I have extensive experience designing and developing bespoke web applications with {moment().diff('2005-09-01', 'years')} 
          years&raquo; experience working on full-stack applications like e-commerce, APIs, and web apps.
        </p>
        <p className="mt-5 md:text-lg font-normal text-zinc-600 dark:text-zinc-400">
        After many years of working with PHP, I switched to Node.js and have been using it ever since. 
        It&rsquo;s my passion to learn new technologies and I never stop learning.
        </p>
      </div>
    </section>
  );
}