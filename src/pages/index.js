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
  const menuData = [
    {
      id: 'bio',
      text: 'Bio',
      link: '#bio',
      pre: <UserCircleIcon className="h-4" />,
    },
    {
      id: 'skills',
      text: 'Skills',
      link: '#skills',
      pre: <CommandLineIcon className="h-4" />,
    },
    {
      id: 'articles',
      text: 'Articles',
      link: '#articles',
      pre: <DocumentTextIcon className="h-4" />,
    },
    {
      id: 'github',
      text: 'GitHub',
      link: '#github',
      pre: <GitHubIcon className="h-4" />,
    },
  ];
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <Share />
      <div className="flex">
        <div className="grow"></div>
        <div className="grow max-w-5xl mx-auto">
          <div className="relative">
            <span id="bio" className="anchor" />
          </div>
          <Bio />
          <hr className="mt-10 max-w-5xl mx-auto border-t border-solid opacity-30" />
          <Jobs />
          <div className="relative">
            <span id="skills" className="anchor" />
          </div>
          <Skills />
          <hr className="mt-10 max-w-5xl mx-auto border-t border-solid opacity-30" />
          <div className="relative">
            <span id="articles" className="anchor" />
          </div>
          <LatestPosts />
          <div className="relative">
            <span id="github" className="anchor" />
          </div>
          <GitHub />
        </div>
        <Sidemenu menuData={menuData} />
      </div>
      <Footer />
    </div>
  );
}
