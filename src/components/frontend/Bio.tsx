import moment from 'moment';
import * as React from 'react';
import Coffee from '../icons/Coffee';

// pull bio from contentful api endpoint

export default function Bio() {
  return (
    <section id="bio-component" className="mt-8 px-4 md:mt-10 lg:px-0">
      <div className="mx-auto max-w-5xl tracking-wide">
        <h1 className="font-header text-5xl font-bold tracking-wide md:leading-loose xl:text-8xl">
          Hi! I&apos;m <span className="overlay-color">Eduardo</span>,
        </h1>
        <h2 className="flex items-center gap-4 pb-5 pt-4 font-header text-xl font-bold tracking-wide md:pb-6 md:leading-loose lg:text-5xl xl:text-6xl">
          an application developer with over {moment().diff('2005-09-01', 'years')} years of experience.
        </h2>
        <p className="mt-5 font-normal text-primary-600 md:text-xl md:leading-relaxed dark:text-primary-400">
          I&lsquo;ve been tinkering with Node.js for the last few years, building SaaS applications that are scalable and flexible. I&lsquo;m a big believer in
          using the latest technologies and best practices to stay on the cutting edge of development.
        </p>
        <p className="mt-5 font-normal text-primary-600 md:text-xl md:leading-relaxed dark:text-primary-400">
          You&lsquo;ve stumbled onto my personal website, where you can learn more about me and check out some of my latest projects. So grab a{' '}
          <Coffee className="overlay-color inline h-6 align-text-bottom" /> coffee, take a seat, and let&lsquo;s scroll down...
        </p>
      </div>
    </section>
  );
}
