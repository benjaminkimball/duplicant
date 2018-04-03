import React from 'react'
import { withRouter } from 'react-router-dom'

export default (chunkName, mod) => withRouter((props) => {
  const Component = mod.default
  const { staticContext = {} } = props

  staticContext.splitPoints && staticContext.splitPoints.add(chunkName)

  return <Component {...props} />
})
