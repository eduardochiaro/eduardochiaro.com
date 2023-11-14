import ProjectsComponent from '@/components/frontend/Projects';
import FrontendLayout from '@/components/layouts/Frontend';
import prisma from '@/utils/prisma';
import { Metadata } from 'next';
import { cache } from 'react';

export default async function Projects() {
  const apps = await getApps();
  return (
    <FrontendLayout>
      <ProjectsComponent data={apps} />
    </FrontendLayout>
  );
}

export const metadata: Metadata = {
  title: 'Projects | Eduardo Chiaro',
};

const getApps = cache(async () => {
  return prisma.app.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
});
