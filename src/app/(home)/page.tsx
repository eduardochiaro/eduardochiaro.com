import ThemeIcon from '@/components/ThemeIcon';
import WireContainer from '@/components/WireContainer';
import SVG from '@/utils/svg';
import { BookOpenIcon, BookmarkIcon, BriefcaseIcon, CpuChipIcon, RssIcon } from '@heroicons/react/20/solid';
import moment from 'moment';
import Link from 'next/link';
import { cache } from 'react';
import prisma from '@/utils/prisma';

export default async function Home() {
  const works = await getFeatureWork();

  return (
    <div className="relative flex h-screen items-center">
      <div className="absolute left-5 top-5">
        <WireContainer>
          <h1 className="p-1 px-2 font-header text-3xl font-normal">
            eduardo<span className="overlay-color font-semibold">chiaro</span>
          </h1>
        </WireContainer>
      </div>
      <WireContainer type="large" className="mx-auto">
        <div className="card max-w-screen-sm md:min-w-96">
          <h2 className="font-semibold">
            Eduardo <span className="font-normal">is a software developer.</span>
          </h2>
          <p className="mt-10">
            With {moment().diff('2005-09-01', 'years')} years of experience, Eduardo has been tinkering with Node.js for the last few years, building SaaS
            applications that are scalable and flexible. He&apos;s a big believer in using the latest technologies and best practices to stay on the cutting
            edge of development.
          </p>
          <ul className="mt-10 flex flex-col gap-3 font-semibold text-primary-400 dark:text-primary-600">
            <li>
              <Link href="/resume" prefetch={false} className="flex items-center gap-2 hover:text-primary-500">
                <BriefcaseIcon title="Resume" className={'w-5'} />
                Resume
              </Link>
            </li>
            <li>
              <Link href="/books" prefetch={false} className="flex items-center gap-2 hover:text-primary-500">
                <BookOpenIcon title="Books" className={'w-5'} />
                Books
              </Link>
            </li>
            <li>
              <Link href="/bookmarks" prefetch={false} className="flex items-center gap-2 hover:text-primary-500">
                <BookmarkIcon title="Bookmarks" className={'w-5'} />
                Bookmarks
              </Link>
            </li>
            <li>
              <Link href="/projects" prefetch={false} className="flex items-center gap-2 hover:text-primary-500">
                <CpuChipIcon title="Projects" className={'w-5'} />
                Projects
              </Link>
            </li>
            <li>
              <Link href="https://blog.eduardochiaro.com" prefetch={false} className="flex items-center gap-1 hover:text-primary-500">
                <RssIcon title="blog" className={'w-5'} />
                <span>
                  <span className="text-accent-600 dark:text-accent-500">.</span>dev
                </span>
              </Link>
            </li>
          </ul>
          <div className="mt-10 flex flex-row flex-wrap items-center gap-5 md:justify-between">
            {works.map((job, index) => (
              <div className={'relative text-center align-middle'} key={`job-image-${index}`}>
                <SVG
                  title={job.name}
                  className={'fill-primary-950 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:fill-primary-50'}
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/${job.logo}`}
                  height={20}
                />
              </div>
            ))}
          </div>
        </div>
      </WireContainer>

      <div className="absolute bottom-5 right-5">
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

  return [...jobs, ...projects].map((job) => {
    return {
      name: job.name,
      logo: job.file?.path,
    };
  });
});
