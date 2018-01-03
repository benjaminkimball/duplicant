import { createServer } from 'http'

import app from './server'

const server = createServer(app)
server.listen(process.env.PORT, () => {
  console.info(`Listening on port ${process.env.PORT}`)
})

let current = app

module.hot && module.hot.accept('./server', () => {
  const { default: next } = require('./server')

  server.removeListener('request', current)
  server.on('request', next)

  current = next
})
