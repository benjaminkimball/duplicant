import { createServer } from 'http'

import app from './server'

let current = app

const server = createServer(current)
server.listen(process.env.PORT, () => {
  console.info(`Listening on port ${process.env.PORT}`)
})

module.hot && module.hot.accept('./server', () => {
  const next = require('./server').default

  server.removeListener('request', current)
  server.on('request', next)

  current = next
})
