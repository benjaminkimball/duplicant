import { createServer } from 'http'

import app from './server'

const { HOST, PORT } = process.env
const server = createServer(app)
server.listen(PORT, HOST, () => {
  console.log(`Listening at http://${HOST}:${PORT}`)
})

let current = app

module.hot && module.hot.accept('./server', () => {
  const next = require('./server').default

  server.removeListener('request', current)
  server.on('request', next)

  current = next
})
