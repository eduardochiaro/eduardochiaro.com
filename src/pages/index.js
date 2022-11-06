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

  const [activeLink, setActiveLink] = React.useState(null);

  React.useEffect(() => {
    let observer;
    if (skillsRef.current && articlesRef.current && githubRef.current) {
      const options = {
        threshold: 0.3,
      };
      observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (activeLink == null) {
              setActiveLink(entry.target.id);
            }
          } else {
            if (activeLink != null) {
              setActiveLink(null);
            }
          }
        });
      }, options);
      observer.observe(skillsRef.current);
      observer.observe(articlesRef.current);
      observer.observe(githubRef.current);
    }
    return () => observer.disconnect();
  }, [skillsRef, articlesRef, githubRef]);

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
    <div className="flex flex-col min-h-screen justify-between">
      <Header />
      <Share />
      <div className="flex">
        <div className="grow"></div>
        <div className="grow max-w-5xl mx-auto">
          <Bio />
          <hr className="mt-10 max-w-5xl mx-auto border-t border-solid border-secondary-700 dark:border-secondary-600" />
          <Jobs />
          <div className="relative">
            <span id="skills" className="anchor" ref={skillsRef} />
          </div>
          <Skills />
          <hr className="mt-10 max-w-5xl mx-auto border-t border-solid border-secondary-700 dark:border-secondary-600" />
          <div className="relative">
            <span id="articles" className="anchor" ref={articlesRef} />
          </div>
          <LatestPosts />
          <div className="relative">
            <span id="github" className="anchor" ref={githubRef} />
          </div>
          <GitHub />
        </div>
        <Sidemenu menuData={menuData} activeLink={activeLink} />
      </div>
      <Footer />
    </div>
  );
}
