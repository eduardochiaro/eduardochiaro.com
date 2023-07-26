import ProjectsComponent from '@/components/frontend/Projects';
import FrontendLayout from '@/components/layouts/Frontend';
import prisma from '@/utils/prisma';
import { Metadata } from 'next';

export default async function Projects() {
	const apps = await getApps();
  return (
    <FrontendLayout>
      <ProjectsComponent data={apps} />
    </FrontendLayout>
  );
}

export const metadata: Metadata = {
  title: 'Projects | Eduardo Chiaro'
}

async function getApps() {
	return prisma.app.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
