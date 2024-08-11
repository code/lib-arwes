'use client'

import { AR } from '@/ui'

export default (): JSX.Element => (
  <>
    <AR.H1>Vanilla</AR.H1>

    <AR.HR />

    <AR.P>TODO.</AR.P>

    <AR.HR />

    <AR.Navigation
      prevHref="/docs/develop/fundamentals"
      prev="Fundamentals"
      nextHref="/docs/develop/react"
      next="React"
    />
  </>
)
