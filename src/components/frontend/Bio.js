import moment from 'moment';
import * as React from 'react';
import CoffeeIcon from '../icons/coffee';

export default function Bio () {
  return (
    <section id="bio" className="px-4 lg:px-0 mt-8 md:mt-10">
      <span className="anchor" name="top"/>
      <div className="max-w-5xl mx-auto">
        <h1 className="font-header md:leading-loose tracking-wide text-3xl lg:text-5xl xl:text-6xl font-bold">
          I&apos;m <span className="text-accent-500">Eduardo</span>,
        </h1>
        <h2 className="font-header md:leading-loose tracking-wide text-3xl lg:text-5xl xl:text-6xl font-bold pb-5 md:pb-8">
          a <CoffeeIcon className={`inline-block w-8 lg:w-16 text-primary-700 dark:text-primary-600`}/> coffee-driven
          Software Developer based in Washington State.
        </h2>
        <p className="mt-5 md:text-lg font-normal text-zinc-600 dark:text-zinc-400">
          With {moment().diff('2005-09-01', 'years')} years of experience working on full-stack applications like e-commerce, APIs, web apps, and more,
          I have extensive experience designing and developing tailoerd web applications.
        </p>
        <p className="mt-5 md:text-lg font-normal text-zinc-600 dark:text-zinc-400">
          After many years of working with PHP, i switched to Node.js and have been using it ever since. 
          I'm passionate about learning new technologies and never stop learning.
        </p>
      </div>
    </section>
  );
}