import * as React from 'react';
import Image from 'next/image';
import SVG from 'react-inlinesvg'
import TwitterIcon from '../elements/icons/twitter';
import LinkedInIcon from '../elements/icons/linkedin';
import GitHubIcon from '../elements/icons/github';
import styles from '../styles/Share.module.scss'

export default function Share () {

  return (
    <section className={`${styles.share} mt-10 bg-green-sheen-900 text-white`}>
      <div className="container mx-auto py-8 flex justify-center">
        <div className="flex-initial w-36 text-center h-10 lg:h-16">
          <a href="https://twitter.com/eduardochiaro">
            <TwitterIcon
              className={`inline-block h-full transition duration-150  ease-out ${styles.shareIcon}`}
            />
          </a>
        </div>
        <div className="flex-initial w-36 text-center h-10 lg:h-16">
          <a href="https://linkedin.com/in/eduardochiaro">
            <LinkedInIcon
              className={`inline-block h-full transition duration-150  ease-out ${styles.shareIcon}`}
            />
          </a>
        </div>
        <div className="flex-initial w-36 text-center h-10 lg:h-16">
        <a href="https://github.com/eduardochiaro">
            <GitHubIcon
              className={`inline-block h-full transition duration-150  ease-out ${styles.shareIcon}`}
            />
          </a>
        </div>
      </div>
    </section>
  )
}