import FrontendLayout from '@/components/layouts/Frontend';
import Bio from '@/components/frontend/Bio';
import Jobs from '@/components/frontend/Jobs';
import Skills from '@/components/frontend/Skills';
import GitHub from '@/components/frontend/GitHub';
import LatestPosts from '@/components/frontend/LatestPosts';
import prisma from '@/utils/prisma';

export default async function Home() {
  const skills = await getSkills();
  return (
    <FrontendLayout>
      <div className="mx-auto max-w-5xl grow">
        <div className="relative">
          <span id="bio" className="anchor" />
        </div>
        <Bio />
        <hr className="mx-auto mt-10 max-w-5xl border-t border-solid opacity-30" />
        <Jobs />
        <div className="relative">
          <span id="skills" className="anchor" />
        </div>
        <Skills data={skills} />
        <div className="relative">
          <span id="articles" className="anchor" />
        </div>
        <LatestPosts />
        <div className="relative">
          <span id="github" className="anchor" />
        </div>
        <GitHub />
      </div>
    </FrontendLayout>
  );
}

async function getSkills() {
  return prisma.skill.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}
