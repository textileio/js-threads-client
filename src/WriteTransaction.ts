import { grpc } from '@improbable-eng/grpc-web'
import * as uuid from 'uuid'
import {
  ModelCreateRequest,
  ModelSaveRequest,
  ModelDeleteRequest,
  ModelHasRequest,
  ModelFindRequest,
  ModelFindByIDRequest,
  StartTransactionRequest,
  WriteTransactionRequest,
  WriteTransactionReply,
} from '@textile/threads-client-grpc/api_pb'
import { toBase64, fromBase64 } from 'b64-lite'
import { Config } from './config'
import { Entity, EntityList, JSONQuery } from './models'
import { Transaction } from './Transaction'

/**
 * WriteTransaction performs a mutating bulk transaction on the underlying store.
 */
export class WriteTransaction extends Transaction<WriteTransactionRequest, WriteTransactionReply> {
  constructor(
    protected readonly config: Config,
    protected readonly client: grpc.Client<WriteTransactionRequest, WriteTransactionReply>,
    protected readonly storeID: string,
    protected readonly modelName: string,
  ) {
    super(client, storeID, modelName)
  }
  /**
   * start begins the transaction. All operations between start and end will be applied as a single transaction upon a call to end.
   */
  public async start() {
    const startReq = new StartTransactionRequest()
    startReq.setStoreid(this.storeID)
    startReq.setModelname(this.modelName)
    const req = new WriteTransactionRequest()
    req.setStarttransactionrequest(startReq)
    const metadata = this.config._wrapBrowserHeaders(new grpc.Metadata())
    this.client.start(metadata)
    this.client.send(req)
  }
  /**
   * modelCreate creates a new model instance in the given store.
   * @param values An array of model instances as JSON/JS objects.
   */
  public async modelCreate<T = any>(values: any[]) {
    return new Promise<EntityList<T> | undefined>((resolve, reject) => {
      const createReq = new ModelCreateRequest()
      const list: any[] = []
      values.forEach(v => {
        v['ID'] = uuid.v4()
        list.push(JSON.stringify(v))
      })
      createReq.setValuesList(list)
      const req = new WriteTransactionRequest()
      req.setModelcreaterequest(createReq)
      this.client.onMessage((message: WriteTransactionReply) => {
        const reply = message.getModelcreatereply()
        if (reply === undefined) {
          resolve()
        } else {
          const ret: EntityList<T> = {
            entitiesList: reply.toObject().entitiesList.map(entity => JSON.parse(entity as string)),
          }
          resolve(ret)
        }
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }

  /**
   * modelSave saves changes to an existing model instance in the given store.
   * @param values An array of model instances as JSON/JS objects. Each model instance must have a valid existing `ID` property.
   */
  public async modelSave(values: any[]) {
    return new Promise<void>((resolve, reject) => {
      const saveReq = new ModelSaveRequest()
      const list: any[] = []
      values.forEach(v => {
        if (!v.hasOwnProperty('ID')) {
          v['ID'] = '' // The server will add an ID if empty.
        }
        list.push(JSON.stringify(v))
      })
      saveReq.setValuesList(list)
      const req = new WriteTransactionRequest()
      req.setModelsaverequest(saveReq)
      this.client.onMessage((_message: WriteTransactionReply) => {
        resolve()
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }

  /**
   * modelDelete deletes an existing model instance from the given store.
   * @param entityIDs An array of entity ids to delete.
   */
  public async modelDelete(entityIDs: string[]) {
    return new Promise<void>((resolve, reject) => {
      const deleteReq = new ModelDeleteRequest()
      deleteReq.setEntityidsList(entityIDs)
      const req = new WriteTransactionRequest()
      req.setModeldeleterequest(deleteReq)
      this.client.onMessage((_message: WriteTransactionReply) => {
        resolve()
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }
  /**
   * has checks whether a given entity exists in the given store.
   * @param entityIDs An array of entity ids to check for.
   */
  public async has(entityIDs: string[]) {
    return new Promise<boolean>((resolve, reject) => {
      const hasReq = new ModelHasRequest()
      hasReq.setEntityidsList(entityIDs)
      const req = new WriteTransactionRequest()
      req.setModelhasrequest(hasReq)
      this.client.onMessage((message: WriteTransactionReply) => {
        const reply = message.getModelhasreply()
        resolve(reply ? reply.toObject().exists == true : false)
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }
  /**
   * modelFind queries the store for entities matching the given query parameters. See Query for options.
   * @param query The object that describes the query. See Query for options. Alternatively, see JSONQuery for the basic interface.
   */
  public async modelFind<T = any>(query: JSONQuery) {
    return new Promise<EntityList<T>>((resolve, reject) => {
      const findReq = new ModelFindRequest()
      findReq.setQueryjson(toBase64(JSON.stringify(query)))
      const req = new WriteTransactionRequest()
      req.setModelfindrequest(findReq)
      this.client.onMessage((message: WriteTransactionReply) => {
        const reply = message.getModelfindreply()
        if (reply === undefined) {
          resolve()
        } else {
          const ret: EntityList<T> = {
            entitiesList: reply.toObject().entitiesList.map(entity => JSON.parse(fromBase64(entity as string))),
          }
          resolve(ret)
        }
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }

  /**
   * modelFindByID queries the store for the id of an entity.
   * @param entityID The id of the entity to search for.
   */
  public async modelFindByID<T = any>(entityID: string) {
    return new Promise<Entity<T> | undefined>((resolve, reject) => {
      const findReq = new ModelFindByIDRequest()
      findReq.setEntityid(entityID)
      const req = new WriteTransactionRequest()
      req.setModelfindbyidrequest(findReq)
      this.client.onMessage((message: WriteTransactionReply) => {
        const reply = message.getModelfindbyidreply()
        if (reply === undefined) {
          resolve()
        } else {
          const ret: Entity<T> = {
            entity: JSON.parse(reply.toObject().entity as string),
          }
          resolve(ret)
        }
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }
}
