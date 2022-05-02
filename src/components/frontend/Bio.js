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
        <p className="mt-5 md:text-lg font-normal text-zinc-600 dark:text-zinc-400 md:leading-loose">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisl lacus, auctor condimentum mi vitae, bibendum pretium lacus. 
          Morbi molestie diam eget eros iaculis, vel pellentesque sapien tempus. Sed tempor risus dui, non euismod eros semper sit amet. 
          Praesent mollis, elit non finibus porttitor, orci leo hendrerit orci, volutpat tincidunt libero urna vitae quam.</p>
        <p className="mt-5 md:text-lg font-normal text-zinc-600 dark:text-zinc-400 md:leading-loose">Pellentesque tortor purus, ornare ac laoreet pellentesque, tincidunt non erat. Curabitur pellentesque velit nec mi rutrum, ac viverra nulla egestas. 
          Sed sit amet urna pretium, maximus lacus eu, scelerisque lacus.</p>
      </div>
    </section>
  );
}