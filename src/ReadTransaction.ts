import { grpc } from '@improbable-eng/grpc-web'
import {
  HasRequest,
  FindRequest,
  FindByIDRequest,
  StartTransactionRequest,
  ReadTransactionRequest,
  ReadTransactionReply,
} from '@textile/threads-client-grpc/api_pb'
import { toBase64, fromBase64 } from 'b64-lite'
import { Transaction } from './Transaction'
import { Instance, InstanceList } from './models'
import { JSONQuery } from './models'
import { Config } from './config'

/**
 * ReadTransaction performs a read-only bulk transaction on the underlying store.
 */
export class ReadTransaction extends Transaction<ReadTransactionRequest, ReadTransactionReply> {
  constructor(
    protected readonly config: Config,
    protected readonly client: grpc.Client<ReadTransactionRequest, ReadTransactionReply>,
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
    const req = new ReadTransactionRequest()
    req.setStarttransactionrequest(startReq)
    const metadata = this.config._wrapBrowserHeaders(new grpc.Metadata())
    this.client.start(metadata)
    this.client.send(req)
  }

  /**
   * has checks whether a given instance exists in the given store.
   * @param instanceIDs An array of instance ids to check for.
   */
  public async has(instanceIDs: string[]) {
    return new Promise<boolean>((resolve, reject) => {
      const hasReq = new HasRequest()
      hasReq.setInstanceidsList(instanceIDs)
      const req = new ReadTransactionRequest()
      req.setHasrequest(hasReq)
      this.client.onMessage((message: ReadTransactionReply) => {
        const reply = message.getHasreply()
        resolve(reply ? reply.toObject().exists == true : false)
      })
      this.setReject(reject)
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
      const req = new ReadTransactionRequest()
      req.setFindrequest(findReq)
      this.client.onMessage((message: ReadTransactionReply) => {
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
      this.setReject(reject)
      this.client.send(req)
    })
  }

  /**
   * instanceFindByID queries the store for the id of an instance.
   * @param instanceID The id of the instance to search for.
   */
  public async instanceFindByID<T = any>(instanceID: string) {
    return new Promise<Instance<T>>((resolve, reject) => {
      const findReq = new FindByIDRequest()
      findReq.setInstanceid(instanceID)
      const req = new ReadTransactionRequest()
      req.setFindbyidrequest(findReq)
      this.client.onMessage((message: ReadTransactionReply) => {
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
      this.setReject(reject)
      this.client.send(req)
    })
  }
}
