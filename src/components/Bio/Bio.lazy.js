import React, { lazy, Suspense } from 'react';

const LazyBio = lazy(() => import('./Bio'));

const Bio = props => (
  <Suspense fallback={null}>
    <LazyBio {...props} />
  </Suspense>
);

export default Bio;
