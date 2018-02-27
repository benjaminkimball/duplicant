import test from 'ava'

import app from './server'

// NOTE: This is just to make sure tests are wired up correctly!
test('smells like an Express app', async (t) => {
  t.true(typeof app.use === 'function')
})
