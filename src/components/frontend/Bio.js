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
          I have rich experience designing and building tailored web applications based on user needs.
          With {moment().diff('2005-09-01', 'years')} years of experience working on full-stack applications like e-commerce, APIs, web apps, and more.
        </p>
        <p className="mt-5 md:text-lg font-normal text-zinc-600 dark:text-zinc-400">
          I started long ago working with PHP before moving on to Node.js as my primary programming language 
          and have since been working with it ever since. I have a passion for learning new technologies and constantly learning new things. 
        </p>
      </div>
    </section>
  );
}