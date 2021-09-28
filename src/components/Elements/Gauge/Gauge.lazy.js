import React, { lazy, Suspense } from 'react'

const LazyGauge = lazy(() => import('./Gauge'))

const Gauge = (props) => (
  <Suspense fallback={null}>
    <LazyGauge {...props} />
  </Suspense>
)

export default Gauge
