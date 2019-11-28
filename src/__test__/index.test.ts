import { expect } from 'chai'
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport'
import { NewStoreReply } from '@textile/threads-client-grpc/api_pb'
import { Client } from '../index'

const host = 'http://localhost:9091'
let client: Client

const personSchema = {
  $id: 'https://example.com/person.schema.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Person',
  type: 'object',
  required: ['ID'],
  properties: {
    ID: {
      type: 'string',
      description: "The entity's id.",
    },
    firstName: {
      type: 'string',
      description: "The person's first name.",
    },
    lastName: {
      type: 'string',
      description: "The person's last name.",
    },
    age: {
      description: 'Age in years which must be equal to or greater than zero.',
      type: 'integer',
      minimum: 0,
    },
  },
}

const createPerson = () => {
  return {
    ID: '',
    firstName: 'Adam',
    lastName: 'Doe',
    age: 21,
  }
}

describe('full store', function() {
  let store: NewStoreReply.AsObject
  before(() => {
    client = new Client(NodeHttpTransport()).setHost(host)
  })
  describe('.newStore', () => {
    it('response should be defined and have an id', async () => {
      store = await client.newStore()
      expect(store).to.not.be.undefined
      expect(store).to.haveOwnProperty('id')
      expect(store.id).to.not.be.undefined
    })
  })
  describe('.registerSchema', () => {
    it('response should be defined and be an empty object', async () => {
      const register = await client.registerSchema(store.id, 'Person', personSchema)
      expect(register).to.not.be.undefined
      // @todo: Is this really what we want this response to look like? Empty object?
      expect(register).to.be.empty
    })
  })
  describe('.start', () => {
    it('response should be defined and be an empty object', async () => {
      const start = await client.start(store.id)
      expect(start).to.not.be.undefined
      // @todo: Is this really what we want this response to look like? Empty object?
      expect(start).to.be.empty
    })
  })
  describe.skip('.startFromAddress', () => {
    it('response should be defined and be an empty object', async () => {
      const start = await client.startFromAddress(store.id, '', '', '')
      expect(start).to.not.be.undefined
      // @todo: Is this really what we want this response to look like? Empty object?
      expect(start).to.be.empty
    })
  })
  describe('.modelCreate', () => {
    it('response should contain a JSON parsable entitiesList', async () => {
      const create = await client.modelCreate(store.id, 'Person', [createPerson()])
      expect(create).to.not.be.undefined
      expect(create).to.haveOwnProperty('entitiesList')
      const entities = create.entitiesList.map(entity => JSON.parse(entity))
      expect(entities).to.have.nested.property('[0].firstName', 'Adam')
      expect(entities).to.have.nested.property('[0].lastName', 'Doe')
      expect(entities).to.have.nested.property('[0].age', 21)
      expect(entities).to.have.nested.property('[0].ID')
    })
  })
  describe('.modelSave', () => {
    it('response should be defined and be an empty object', async () => {
      const create = await client.modelCreate(store.id, 'Person', [createPerson()])
      const entities = create.entitiesList.map(entity => JSON.parse(entity))
      const person = entities.pop()
      person.age = 30
      const save = await client.modelSave(store.id, 'Person', [person])
      expect(save).to.not.be.undefined
      // @todo: Is this really what we want this response to look like? Empty object?
      expect(save).to.be.empty
    })
  })
  describe('.modelDelete', () => {
    it('response should be defined and be an empty object', async () => {
      const create = await client.modelCreate(store.id, 'Person', [createPerson()])
      const entities = create.entitiesList.map(entity => JSON.parse(entity))
      const person = entities.pop()
      const deleted = await client.modelDelete(store.id, 'Person', [person.id])
      expect(deleted).to.not.be.undefined
      // @todo: Is this really what we want this response to look like? Empty object?
      expect(deleted).to.be.empty
    })
  })
  describe('.modelHas', () => {
    it('response be an object with property "exists" equal to true', async () => {
      const create = await client.modelCreate(store.id, 'Person', [createPerson()])
      const entities = create.entitiesList.map(entity => JSON.parse(entity))
      const person = entities.pop()
      const has = await client.modelHas(store.id, 'Person', [person.id])
      expect(has).to.not.be.undefined
      expect(has).to.have.property('exists', true)
    })
  })
  describe('.modelFindById', () => {
    it('response should contain a JSON parsable entity property', async () => {
      const create = await client.modelCreate(store.id, 'Person', [createPerson()])
      const entities = create.entitiesList.map(entity => JSON.parse(entity))
      const person = entities.pop()
      const find = await client.modelFindByID(store.id, 'Person', person.ID)
      expect(find).to.not.be.undefined
      expect(find).to.haveOwnProperty('entity')
      const entity = JSON.parse(find.entity)
      expect(entity).to.not.be.undefined
      expect(entity).to.have.property('firstName', 'Adam')
      expect(entity).to.have.property('lastName', 'Doe')
      expect(entity).to.have.property('age', 21)
      expect(entity).to.have.property('ID')
    })
  })
  describe.skip('.readTransaction', () => {
    it('', async () => {
      const create = await client.modelCreate(store.id, 'Person', [createPerson()])
      const entities = create.entitiesList.map(entity => JSON.parse(entity))
      const person = entities.pop()
      const transaction = client.readTransaction(store.id, 'Person')
      if (transaction !== undefined) {
        await transaction.start()
        const has = await transaction.has([person.ID])
        expect(has).to.be.true

        const find = await client.modelFindByID(store.id, 'Person', person.ID)
        expect(find).to.not.be.undefined
        expect(find).to.haveOwnProperty('entity')
        const newPerson = JSON.parse(find.entity)
        expect(newPerson).to.not.be.undefined
        expect(newPerson).to.deep.equal(person)

        await transaction.end()
      } else {
        throw new Error('defined read transaction')
      }
    })
  })
})
