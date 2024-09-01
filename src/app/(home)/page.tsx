import ThemeIcon from '@/components/ThemeIcon';
import WireContainer from '@/components/WireContainer';
import SVG from '@/utils/svg';
import { BookOpenIcon, BookmarkIcon, BriefcaseIcon, CpuChipIcon, RssIcon } from '@heroicons/react/20/solid';
import moment from 'moment';
import Link from 'next/link';
import { cache } from 'react';
import prisma from '@/utils/prisma';
import Logo from '@/components/icons/Logo';

export default async function Home() {
  const works = await getFeatureWork();

  const menu = [
    {
      name: 'Resume',
      href: '/resume',
      icon: BriefcaseIcon,
    },
    /*
      {
        name: 'Books',
        href: '/books',
        icon: BookOpenIcon,
      },
      */
    {
      name: 'Bookmarks',
      href: '/bookmarks',
      icon: BookmarkIcon,
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: CpuChipIcon,
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
      <div className="left-5 top-5 md:absolute">
        <WireContainer>
          <h1 className="flex items-center p-1 px-2 font-header text-3xl font-normal">
            <span className="overlay-color">eduardo</span>
            <span className="flex items-center font-semibold">
              <Logo className="size-6" alt="c" />
              hiaro
            </span>
          </h1>
        </WireContainer>
      </div>
      <WireContainer type="large" className="mx-auto">
        <div className="card max-w-screen-sm md:min-w-96">
          <div className="px-3">
            <div className="flex items-center justify-between">
              <h2>
                <span className="font-semibold">Eduardo</span> is a{' '}
                <span className="underline decoration-accent-500 decoration-double decoration-2">software engineer</span>.
              </h2>
              <Logo className="w-20" />
            </div>
            <p className="mt-10">
              With {moment().diff('2005-09-01', 'years')} years of experience, Eduardo has been tinkering with Node.js for the last few years, building SaaS
              applications that are scalable and flexible. He&apos;s a big believer in using the latest technologies and best practices to stay on the cutting
              edge of development.
            </p>
            <ul className="mt-10 flex flex-col gap-3 font-semibold text-primary-600 dark:text-primary-200">
              {menu.map((item, index) => (
                <li key={`menu-item-${index}`}>
                  <Link href={item.href} prefetch={false} className="group flex items-center gap-2 hover:underline dark:hover:text-primary-400">
                    <item.icon title={item.name.toString()} className={'w-5 group-hover:text-accent-600 group-hover:dark:text-accent-500'} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-xs font-semibold opacity-50">I worked for...</p>
            <div className="flex flex-row flex-wrap items-center gap-5 md:justify-between">
              {works.map((job, index) => (
                <div className={'relative text-center align-middle'} key={`job-image-${index}`}>
                  <SVG
                    title={job.name}
                    className={'fill-primary-950 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:fill-primary-50'}
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/${job.logo}`}
                    height={20}
                  />
                  {job.special && <span className="absolute -right-2 -top-2 text-xs text-accent-600 dark:text-accent-500">•</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </WireContainer>

      <div className="bottom-5 flex w-full items-center justify-between px-5 md:absolute">
        <p className="text-xs">
          <span className="text-accent-600 dark:text-accent-500">•</span> project under contracts
        </p>
        <WireContainer>
          <ThemeIcon orientation="top left" size="h-6" />
        </WireContainer>
      </div>
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
