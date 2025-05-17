import ThemeIcon from '@/components/ThemeIcon';
import WireContainer from '@/components/frontend/WireContainer';
import SVG from '@/utils/svg';
import moment from 'moment';
import Link from 'next/link';
import { cache } from 'react';
import prisma from '@/utils/prisma';
import Logo from '@/components/icons/Logo';
import Card from '@/components/frontend/Card';
import { BookmarkCheckIcon, FileUserIcon, FlaskConicalIcon, LibraryBigIcon, RssIcon } from 'lucide-react';
import SiteLogo from '@/components/frontend/SiteLogo';
import { unstable_ViewTransition as ViewTransition } from 'react';

export default async function Home() {
  const works = await getFeatureWork();

  const menu = [
    {
      name: 'Resume',
      href: '/resume',
      icon: FileUserIcon,
    },
    {
      name: 'Books',
      href: '/books',
      icon: LibraryBigIcon,
    },
    {
      name: 'Bookmarks',
      href: '/bookmarks',
      icon: BookmarkCheckIcon,
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: FlaskConicalIcon,
    },
    {
      name: (
        <>
          <span className="text-accent-600 dark:text-accent-500">.</span>dev
        </>
      ),
      href: 'https://blog.eduardochiaro.com',
      icon: RssIcon,
    },
  ];
  return (
    <div className="relative flex h-screen flex-col items-center md:flex-row">
      <header className="top-6 left-6 md:absolute">
        <ViewTransition name="header-logo">
          <SiteLogo />
        </ViewTransition>
      </header>
      <div className="top-6 right-6 md:absolute">
        <ViewTransition name="theme-switch">
          <WireContainer>
            <ThemeIcon orientation="bottom left" size="h-6" />
          </WireContainer>
        </ViewTransition>
      </div>
      <main className="mx-auto">
        <WireContainer type="large">
          <Card className="max-w-screen-sm md:min-w-96">
            <div className="px-3">
              <div className="flex items-center justify-between text-lg">
                <h2>
                  <span className="font-semibold">Eduardo</span> is a{' '}
                  <span className="decoration-accent-500 underline decoration-double decoration-2">software engineer</span>.
                </h2>
                <ViewTransition name="logo">
                  <Logo className="w-20" />
                </ViewTransition>
              </div>
              <p className="mt-10">
                With {moment().diff('2005-09-01', 'years')} years of experience, Eduardo has been tinkering with Node.js for the last few years, building SaaS
                applications that are scalable and flexible. He&apos;s a big believer in using the latest technologies and best practices to stay on the cutting
                edge of development.
              </p>
              <ul cy-data="menu" className="text-primary-600 dark:text-primary-200 mt-10 flex flex-col gap-3 font-semibold">
                {menu.map((item, index) => (
                  <li key={`menu-item-${index}`}>
                    <Link href={item.href} prefetch={false} className="group dark:hover:text-primary-400 inline-flex items-center gap-2 hover:underline">
                      <item.icon className={'group-hover:text-accent-600 group-hover:dark:text-accent-500 w-5'} absoluteStrokeWidth />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-primary-400 dark:text-primary-500 mt-10 text-xs font-semibold">I worked for...</p>
              <div className="flex flex-row flex-wrap items-center gap-5 md:justify-between">
                {works.map((job, index) => (
                  <div className={'relative text-center align-middle'} key={`job-image-${index}`}>
                    <SVG
                      title={job.name}
                      className={'fill-primary-950 dark:fill-primary-50 opacity-90 grayscale transition-all hover:opacity-100 hover:grayscale-0'}
                      src={`${process.env.NEXT_PUBLIC_CDN_URL}/${job.logo}`}
                      height={20}
                    />
                    <span className="hidden">{job.name}</span>
                    {job.special && <span className="text-accent-600 dark:text-accent-500 absolute -top-2 -right-2 text-xs">•</span>}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </WireContainer>
      </main>

      <footer className="bottom-5 flex w-full items-center justify-between px-5 md:absolute">
        <p className="text-xs">
          <span className="text-accent-600 dark:text-accent-500">•</span> project under contract
        </p>
      </footer>
    </div>
  );
}

const getFeatureWork = cache(async () => {
  const jobs = await prisma.resume.findMany({
    where: {
      featured: true,
    },
    include: {
      file: true,
    },
    orderBy: {
      startDate: 'desc',
    },
  });
  const projects = await prisma.resumeProject.findMany({
    where: {
      featured: true,
    },
    include: {
      file: true,
    },
    orderBy: {
      id: 'asc',
    },
  });

  const returnArray: any[] = [];

  jobs.forEach((job) => {
    returnArray.push({
      name: job.name,
      logo: job.file?.path,
      special: false,
    });
  });

  projects.forEach((project) => {
    returnArray.push({
      name: project.name,
      logo: project.file?.path,
      special: true,
    });
  });

  return returnArray;
});
