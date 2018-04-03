import React from 'react'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'

import htmlEnd from './html-end'
import htmlStart from './html-start'

import Routes from '../../../common/routes'

export default () => (req, res) => {
  const context = { splitPoints: new Set() }
  const location = req.url
  const sheet = new ServerStyleSheet()
  const jsx = sheet.collectStyles(
    <StaticRouter context={context} location={location}>
      <Routes />
    </StaticRouter>
  )

  res.type('text/html')
  res.write(htmlStart())

  // Cross React stream with styled-components stream, despite Egon's warning...
  const render = sheet.interleaveWithNodeStream(renderToNodeStream(jsx))
  render.pipe(res, { end: false })
  render.on('end', () => res.end(htmlEnd([...context.splitPoints])))
}
