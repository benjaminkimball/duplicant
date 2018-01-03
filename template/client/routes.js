import React from 'react'
import { Route, Switch } from 'react-router-dom'

import * as chunks from './chunks'

export default () => (
  <Switch>
    <Route component={chunks.NotFoundPage} />
  </Switch>
)
