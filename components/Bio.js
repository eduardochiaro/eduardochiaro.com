import * as React from 'react';
import SVG from 'react-inlinesvg'
import CoffeeIcon from '../elements/icons/coffee';
import styles from '../styles/Bio.module.scss'

export default function Bio () {

  return (
    <section id="bio" className={styles.bio}>
      <div className="flex flex-row items-center justify-between container mx-auto">
        <div className="flex-1 basis-2/3 align-top mx-4 lg:mx-0">
          <h1 className="leading-tight text-3xl lg:text-7xl font-bold">
            I&apos;m <span className="text-terra-cotta-900">Eduardo</span>,
          </h1>
          <h2 className="leading-tight text-3xl lg:text-7xl font-bold">
            a <CoffeeIcon className={`inline-block w-8 lg:w-16 ${styles.coffeeIcon}`}/> coffee-driven
            Software Developer based in Washington State.
          </h2>
        </div>
        <div className={`flex-1 basis-1/3 hidden lg:block`}>
          <SVG src={`/images/bgs/integration.svg`} />
        </div>
      </div>
    </section>
  );
}