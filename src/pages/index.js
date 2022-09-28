import * as React from 'react';
import { DocumentTextIcon, CommandLineIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Header from '@/components/frontend/Header';
import Bio from '@/components/frontend/Bio';
import Jobs from '@/components/frontend/Jobs';
import Share from '@/components/frontend/Share';
import Skills from '@/components/frontend/Skills';
import GitHub from '@/components/frontend/GitHub';
import Footer from '@/components/frontend/Footer';
import Sidemenu from '@/components/frontend/Sidemenu';
import LatestPosts from '@/components/frontend/LatestPosts';
import GitHubIcon from '@/components/icons/github';

export default function Home() {
  const skillsRef = React.useRef();
  const articlesRef = React.useRef();
  const githubRef = React.useRef();

  const menuData = [
    {
      text: 'Bio',
      link: '/',
      as: '/#top',
      current: true,
      pre: <UserCircleIcon className="h-4" />,
    },
    {
      text: 'Skills',
      link: '/#skills',
      current: false,
      onClick: () => skillsRef.current.scrollIntoView({ behavior: 'smooth' }),
      pre: <CommandLineIcon className="h-4" />,
    },
    {
      text: 'Articles',
      link: '/#articles',
      current: false,
      onClick: () => articlesRef.current.scrollIntoView({ behavior: 'smooth' }),
      pre: <DocumentTextIcon className="h-4" />,
    },
    {
      text: 'GitHub',
      link: '/#github',
      current: false,
      onClick: () => githubRef.current.scrollIntoView({ behavior: 'smooth' }),
      pre: <GitHubIcon className="h-4" />,
    },
  ];
  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="grow">
        <Header />
        <Share />
        <Bio />
        <hr className="mt-10 max-w-5xl mx-auto border-t border-solid border-primary-700 dark:border-primary-600" />
        <Jobs />
        <div className="relative">
          <span className="anchor" ref={skillsRef} />
        </div>
        <Skills />
        <hr className="mt-10 max-w-5xl mx-auto border-t border-solid border-primary-700 dark:border-primary-600" />
        <div className="relative">
          <span className="anchor" ref={articlesRef} />
        </div>
        <LatestPosts />
        <div className="relative">
          <span className="anchor" ref={githubRef} />
        </div>
        <GitHub />
      </div>
      <Sidemenu menuData={menuData} />
      <Footer />
    </div>
  );
}
