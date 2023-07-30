import ResumeComponent from '@/components/frontend/Resume';
import FrontendLayout from '@/components/layouts/Frontend';
import { Metadata } from 'next';

export default async function Resume() {
  const resume = await getResume();
  return (
    <FrontendLayout>
      <ResumeComponent data={resume} />
    </FrontendLayout>
  );
}

export const metadata: Metadata = {
  title: 'Resume | Eduardo Chiaro',
};

async function getResume() {
  return prisma.resume.findMany({
    orderBy: {
      startDate: 'desc',
    },
    include: {
      tags: true,
      projects: true,
    },
  });
}
