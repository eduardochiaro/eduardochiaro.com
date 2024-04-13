import ThemeIcon from '@/components/ThemeIcon';
import WireContainer from '@/components/WireContainer';
import SVG from '@/utils/svg';
import { BookOpenIcon, BriefcaseIcon, CpuChipIcon, RssIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Link from 'next/link';

export default async function Home() {
  const works = [
    {
      name: 'Verizon',
      logo: 'Verizon_logo.svg',
    },
    {
      name: 'Getty Images',
      logo: 'Getty_Images_logo.svg',
    },
    {
      name: 'HP',
      logo: 'HP_logo.svg',
    },
    {
      name: 'Samsung',
      logo: 'Samsung_logo.svg',
    },
    {
      name: 'Microsoft',
      logo: 'Microsoft_logo.svg',
    },
    {
      name: 'LG',
      logo: 'LG_logo.svg',
    },
  ];

  return (
    <div className="relative flex h-screen items-center">
      <div className="absolute left-5 top-5">
        <WireContainer>
          <h1 className="font-header text-3xl font-normal">
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
                <BriefcaseIcon title="Resume" className={'w-6'} />
                Resume
              </Link>
            </li>
            <li>
              <Link href="/books" prefetch={false} className="flex items-center gap-2 hover:text-primary-500">
                <BookOpenIcon title="Books" className={'w-6'} />
                Books
              </Link>
            </li>
            <li>
              <Link href="/projects" prefetch={false} className="flex items-center gap-2 hover:text-primary-500">
                <CpuChipIcon title="Projects" className={'w-6'} />
                Projects
              </Link>
            </li>
            <li>
              <Link href="https://blog.eduardochiaro.com" prefetch={false} className="flex items-center gap-2 hover:text-primary-500">
                <RssIcon title="blog" className={'w-6'} />
                <span>
                  <span className="text-accent-600 dark:text-accent-500">.</span>dev
                </span>
              </Link>
            </li>
          </ul>
          <div className="mt-10 flex flex-row flex-wrap items-center gap-5 md:justify-between">
            {works.map((job, index) => (
              <div className={'relative text-center align-middle'} key={`job-image-${index}`}>
                <SVG title={job.name} className={'fill-primary-400 grayscale hover:grayscale-0 dark:fill-primary-600'} src={`/works/${job.logo}`} height={20} />
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
