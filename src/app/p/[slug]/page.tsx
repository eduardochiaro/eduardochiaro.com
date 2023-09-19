import FrontendLayout from '@/components/layouts/Frontend';
import { Metadata } from 'next';

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getData(params.slug);
  return (
    <FrontendLayout>
      <section className={'mt-10 px-4 lg:px-0'}>
        <div className="mx-auto max-w-5xl">
          <h1 className="h-10 font-header text-3xl font-light leading-tight tracking-wide lg:text-4xl">{page.title}</h1>
          <div className="page mt-10" dangerouslySetInnerHTML={{ __html: page.content as string }}></div>
        </div>
      </section>
    </FrontendLayout>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getData(params.slug);
  return { title: page.title + ' | Eduardo Chiaro', description: page.description };
}

async function getData(slug: string) {
  const page = await prisma.page.findFirst({
    where: {
      slug,
    },
  });
  if (!page) {
    throw new Error('Failed to fetch data');
  }
  return page;
}
