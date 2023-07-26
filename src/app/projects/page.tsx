import ProjectsComponent from '@/components/frontend/Projects';
import FrontendLayout from '@/components/layouts/Frontend';
import prisma from '@/utils/prisma';

export default async function Projects() {
	const apps = await getApps();
  return (
    <FrontendLayout title="Projects | Eduardo Chiaro">
      <ProjectsComponent data={apps} />
    </FrontendLayout>
  );
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
