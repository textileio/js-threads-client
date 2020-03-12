import { grpc } from '@improbable-eng/grpc-web'
import * as uuid from 'uuid'
import {
  CreateRequest,
  SaveRequest,
  DeleteRequest,
  HasRequest,
  FindRequest,
  FindByIDRequest,
  StartTransactionRequest,
  WriteTransactionRequest,
  WriteTransactionReply,
} from '@textile/threads-client-grpc/api_pb'
import { toBase64, fromBase64 } from 'b64-lite'
import { Config } from './config'
import { Instance, InstanceList, JSONQuery } from './models'
import { Transaction } from './Transaction'

/**
 * WriteTransaction performs a mutating bulk transaction on the underlying store.
 */
export class WriteTransaction extends Transaction<WriteTransactionRequest, WriteTransactionReply> {
  constructor(
    protected readonly config: Config,
    protected readonly client: grpc.Client<WriteTransactionRequest, WriteTransactionReply>,
    protected readonly DBID: string,
    protected readonly modelName: string,
  ) {
    super(client, DBID, modelName)
  }
  /**
   * start begins the transaction. All operations between start and end will be applied as a single transaction upon a call to end.
   */
  public async start() {
    const startReq = new StartTransactionRequest()
    startReq.setDbid(this.DBID)
    startReq.setCollectionname(this.modelName)
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
    return new Promise<InstanceList<T> | undefined>((resolve, reject) => {
      const createReq = new CreateRequest()
      const list: any[] = []
      values.forEach(v => {
        v['ID'] = uuid.v4()
        list.push(JSON.stringify(v))
      })
      createReq.setValuesList(list)
      const req = new WriteTransactionRequest()
      req.setCreaterequest(createReq)
      this.client.onMessage((message: WriteTransactionReply) => {
        const reply = message.getCreatereply()
        if (reply === undefined) {
          resolve()
        } else {
          const ret: InstanceList<T> = {
            instancesList: reply.toObject().instancesList.map(instance => JSON.parse(instance as string)),
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
      const saveReq = new SaveRequest()
      const list: any[] = []
      values.forEach(v => {
        if (!v.hasOwnProperty('ID')) {
          v['ID'] = '' // The server will add an ID if empty.
        }
        list.push(JSON.stringify(v))
      })
      saveReq.setValuesList(list)
      const req = new WriteTransactionRequest()
      req.setSaverequest(saveReq)
      this.client.onMessage((_message: WriteTransactionReply) => {
        resolve()
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }

  /**
   * modelDelete deletes an existing model instance from the given store.
   * @param instanceIDs An array of instance ids to delete.
   */
  public async modelDelete(instanceIDs: string[]) {
    return new Promise<void>((resolve, reject) => {
      const deleteReq = new DeleteRequest()
      deleteReq.setInstanceidsList(instanceIDs)
      const req = new WriteTransactionRequest()
      req.setDeleterequest(deleteReq)
      this.client.onMessage((_message: WriteTransactionReply) => {
        resolve()
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }
  /**
   * has checks whether a given instance exists in the given store.
   * @param instanceIDs An array of instance ids to check for.
   */
  public async has(instanceIDs: string[]) {
    return new Promise<boolean>((resolve, reject) => {
      const hasReq = new HasRequest()
      hasReq.setInstanceidsList(instanceIDs)
      const req = new WriteTransactionRequest()
      req.setHasrequest(hasReq)
      this.client.onMessage((message: WriteTransactionReply) => {
        const reply = message.getHasreply()
        resolve(reply ? reply.toObject().exists == true : false)
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }
  /**
   * instanceFind queries the store for entities matching the given query parameters. See Query for options.
   * @param query The object that describes the query. See Query for options. Alternatively, see JSONQuery for the basic interface.
   */
  public async instanceFind<T = any>(query: JSONQuery) {
    return new Promise<InstanceList<T>>((resolve, reject) => {
      const findReq = new FindRequest()
      findReq.setQueryjson(toBase64(JSON.stringify(query)))
      const req = new WriteTransactionRequest()
      req.setFindrequest(findReq)
      this.client.onMessage((message: WriteTransactionReply) => {
        const reply = message.getFindreply()
        if (reply === undefined) {
          resolve()
        } else {
          const ret: InstanceList<T> = {
            instancesList: reply.toObject().instancesList.map(instance => JSON.parse(fromBase64(instance as string))),
          }
          resolve(ret)
        }
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }

  /**
   * instanceFindByID queries the store for the id of an instance.
   * @param instanceID The id of the instance to search for.
   */
  public async instanceFindByID<T = any>(instanceID: string) {
    return new Promise<Instance<T> | undefined>((resolve, reject) => {
      const findReq = new FindByIDRequest()
      findReq.setInstanceid(instanceID)
      const req = new WriteTransactionRequest()
      req.setFindbyidrequest(findReq)
      this.client.onMessage((message: WriteTransactionReply) => {
        const reply = message.getFindbyidreply()
        if (reply === undefined) {
          resolve()
        } else {
          const ret: Instance<T> = {
            instance: JSON.parse(reply.toObject().instance as string),
          }
          resolve(ret)
        }
      })
      super.setReject(reject)
      this.client.send(req)
    })
  }
}
