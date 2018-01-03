import React from 'react'
import { render as r } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'

import Routes from './routes'

const rootElement = document.getElementById('root')
const render = (rootElement, Routes) => r((
  <AppContainer>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </AppContainer>
), rootElement)

render(rootElement, Routes)

module.hot && module.hot.accept('./routes', () => {
  const { default: Routes } = require('./routes')

  render(rootElement, Routes)
})
