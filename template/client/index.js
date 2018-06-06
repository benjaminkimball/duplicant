import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import * as chunks from '../common/chunks'
import Routes from '../common/routes'

import Wrapper from './wrapper'

const render = (chunks, Routes) => {
  const splitPoints = window.__SPLIT_POINTS__ || []

  Promise
    .all(splitPoints.map((name) => chunks[name].loadComponent()))
    .then(() => hydrate((
      <Wrapper>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Wrapper>
    ), document.getElementById('root')))
}

module.hot && module.hot.accept([
  '../common/chunks',
  '../common/routes'
], () => {
  const chunks = require('../common/chunks')
  const Routes = require('../common/routes').default

  render(chunks, Routes)
})

render(chunks, Routes)
