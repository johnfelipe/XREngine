import app from '../../server/app'

describe('\'seat-status\' service', () => {
  it('registered the service', () => {
    const service = app.service('seat-status')

    expect(service).toBeTruthy()
  })
})
