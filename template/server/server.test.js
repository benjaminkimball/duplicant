import { expect } from '../lib/chai'
import { describe, it } from 'mocha'

import server from './server'

describe('The server', () => {
  it('smells like an Express app', () => {
    expect(typeof server.use).to.equal('function')
  })
})
