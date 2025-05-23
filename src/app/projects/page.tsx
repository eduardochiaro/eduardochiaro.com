import FrontendLayout from '@/components/layouts/Frontend';
import prisma from '@/utils/prisma';
import { Metadata } from 'next';
import { cache } from 'react';
import GitHubIcon from '@/components/icons/Github';
import Link from 'next/link';
import Image from 'next/image';
import { Prisma } from '@/utils/prismaClient';
import WireContainer from '@/components/frontend/WireContainer';
import { fetchGitHub } from '@/actions/github';
import GitHubComponent from '@/components/frontend/GitHub';
import Card from '@/components/frontend/Card';
type AppExpanded = Prisma.AppGetPayload<{ include: { file: true } }>;

export default async function Projects() {
  const apps = await getApps();
  const githubData = await fetchGitHub();

  const projects = [
    /*
    {
      name: 'Stream',
      url: '/projects/stream',
      description: 'Unified content stream from different feeds',
    },
    */
    {
      name: 'Terminal',
      url: '/projects/terminal',
      description: 'Fake terminal component with few commands',
    },
    {
      name: 'Timeline',
      url: '/projects/timeline',
      description: 'Example of a timeline component using Tailwind',
    },
  ];

  return (
    <FrontendLayout>
      <section className={'mt-10 px-4 lg:px-0'}>
        <div className="mx-auto flex max-w-5xl flex-wrap">
          <div className="mb-10 basis-full md:basis-3/4">
            <h1 className="font-header h-10 text-3xl leading-tight font-light tracking-wide lg:text-4xl">Projects</h1>
            <div className="my-5 grid grid-cols-1 gap-4">
              {apps?.map((app: AppExpanded, index: number) => (
                <WireContainer type="large" key={`app-${index}`}>
                  <Card className="group flex flex-wrap p-4">
                    {app.file?.path && (
                      <div className={'relative h-32 basis-full md:h-auto md:basis-1/3'}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_CDN_URL}/${app.file.path}`}
                          fill
                          sizes="30vw"
                          alt={app.name}
                          className="bg-transparent object-contain"
                          priority={false}
                        />
                      </div>
                    )}
                    <div className={'basis-full pt-4 md:basis-2/3 md:px-8 md:py-4'}>
                      <h3 className="font-header group-hover:text-secondary-600 dark:group-hover:text-secondary-600 text-2xl tracking-wide transition-colors duration-300 ease-out">
                        {app.name}
                      </h3>
                      <p className="text-normal mt-2">{app.description}</p>
                      <Link
                        href={app.url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="download-button mx-auto mt-6 inline-flex items-center gap-4 md:mx-0"
                      >
                        <GitHubIcon className="w-6" />
                        Check it on GitHub
                      </Link>
                    </div>
                  </Card>
                </WireContainer>
              ))}
            </div>
            <h2 className="font-header h-10 text-3xl leading-tight font-light tracking-wide lg:text-4xl">GitHub</h2>
            <GitHubComponent responseArray={githubData} />
          </div>

          <div className="mb-10 basis-full md:basis-1/4 md:text-right">
            <h2 className="font-header flex h-10 align-bottom text-xl leading-tight font-light tracking-wide md:flex-row-reverse">
              <span className="self-end">Lab</span>
            </h2>
            <ul className="mt-6 flex flex-col gap-2 pl-0 md:pl-2">
              {projects.map((project, index) => (
                <li key={`project-${index}`}>
                  <WireContainer type="medium" key={`app-${index}`}>
                    <Card className="small p-4 text-base">
                      <Link href={project.url} className="group">
                        <h3 className="group-hover:text-secondary-600 dark:group-hover:text-secondary-600 text-lg tracking-wide transition-colors duration-300 ease-out">
                          {project.name}
                        </h3>
                        <p className="text-primary-500 dark:text-primary-400 mt-2 font-sans text-xs">{project.description}</p>
                      </Link>
                    </Card>
                  </WireContainer>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}

export const metadata: Metadata = {
  title: 'Projects | Eduardo Chiaro',
};

const getApps = cache(async () => {
  return prisma.app.findMany({
    include: {
      file: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
});
