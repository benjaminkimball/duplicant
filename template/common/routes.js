import React from 'react'
import { Route, Switch } from 'react-router-dom'

import * as chunks from './chunks'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={chunks.HomePage} />
    <Route component={chunks.NotFoundPage} />
  </Switch>
)

export default Routes
