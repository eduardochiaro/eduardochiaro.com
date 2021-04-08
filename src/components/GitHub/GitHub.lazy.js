import React, { lazy, Suspense } from 'react'

const LazyGitHub = lazy(() => import('./GitHub'))

const GitHub = (props) => (
  <Suspense fallback={null}>
    <LazyGitHub {...props} />
  </Suspense>
)

export default GitHub
