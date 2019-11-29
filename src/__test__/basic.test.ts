import { expect } from 'chai'
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport/lib'
import { Client } from '../index'

const client = new Client('http://localhost:9091', NodeHttpTransport())

describe('basic client', function() {
  describe('.version', function() {
    it('result should be defined', async () => {
      expect(Client.version()).to.not.be.undefined
    })
  })
})
