import React, { lazy, Suspense } from 'react'

const LazyGitHubCard = lazy(() => import('./GitHubCard'))

const GitHubCard = (props) => (
  <Suspense fallback={null}>
    <LazyGitHubCard {...props} />
  </Suspense>
)

export default GitHubCard
