import server from './server'

describe('The server', () => {
  it('smells like an Express app', () => {
    expect(typeof server.use).toEqual('function')
  })
})
