import * as React from 'react';
import FrontendLayout from '@/components/layouts/Frontend';
import Bio from '@/components/frontend/Bio';
import Jobs from '@/components/frontend/Jobs';
import Skills from '@/components/frontend/Skills';
import GitHub from '@/components/frontend/GitHub';
import LatestPosts from '@/components/frontend/LatestPosts';

export default function Home() {
  return (
    <FrontendLayout>
      <div className="grow max-w-5xl mx-auto">
        <div className="relative">
          <span id="bio" className="anchor" />
        </div>
        <Bio />
        <hr className="mt-10 max-w-5xl mx-auto border-t border-solid opacity-30" />
        <Jobs />
        <div className="relative">
          <span id="skills" className="anchor" />
        </div>
        <Skills />
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
