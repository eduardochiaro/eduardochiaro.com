import React, { lazy, Suspense } from 'react'

const LazyJobs = lazy(() => import('./Jobs'))

const Jobs = (props) => (
  <Suspense fallback={null}>
    <LazyJobs {...props} />
  </Suspense>
)

export default Jobs
