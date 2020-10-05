import React, { lazy, Suspense } from 'react';

const LazyBody = lazy(() => import('./Body'));

const Body = props => (
  <Suspense fallback={null}>
    <LazyBody {...props} />
  </Suspense>
);

export default Body;
