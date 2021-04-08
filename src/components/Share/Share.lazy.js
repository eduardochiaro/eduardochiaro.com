import React, { lazy, Suspense } from 'react'

const LazyShare = lazy(() => import('./Share'))

const Share = (props) => (
  <Suspense fallback={null}>
    <LazyShare {...props} />
  </Suspense>
)

export default Share
