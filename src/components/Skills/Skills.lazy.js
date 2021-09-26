import React, { lazy, Suspense } from 'react';

const LazySkills = lazy(() => import('./Skills'));

const Skills = props => (
  <Suspense fallback={null}>
    <LazySkills {...props} />
  </Suspense>
);

export default Skills;
