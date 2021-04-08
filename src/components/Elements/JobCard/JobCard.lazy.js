import React, { lazy, Suspense } from 'react'

const LazyJobCard = lazy(() => import('./JobCard'))

const JobCard = (props) => (
  <Suspense fallback={null}>
    <LazyJobCard {...props} />
  </Suspense>
)

export default JobCard
