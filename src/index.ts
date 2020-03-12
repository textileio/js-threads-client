/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as uuid from 'uuid'
import { grpc } from '@improbable-eng/grpc-web'
import { API } from '@textile/threads-client-grpc/api_pb_service'
import {
  NewDBRequest,
  NewDBReply,
  NewCollectionReply,
  NewCollectionRequest,
  StartRequest,
  StartFromAddressRequest,
  CreateRequest,
  CreateReply,
  SaveRequest,
  DeleteRequest,
  HasRequest,
  HasReply,
  FindRequest,
  FindReply,
  FindByIDRequest,
  FindByIDReply,
  ReadTransactionRequest,
  ReadTransactionReply,
  WriteTransactionRequest,
  WriteTransactionReply,
  ListenRequest,
  ListenReply,
  GetDBLinkRequest,
  GetDBLinkReply,
} from '@textile/threads-client-grpc/api_pb'
import { encode, decode } from 'bs58'
import * as pack from '../package.json'
import { ReadTransaction } from './ReadTransaction'
import { WriteTransaction } from './WriteTransaction'
import { Config, BaseConfig } from './config'
import { JSONQuery, Instance, InstanceList } from './models'

export { BaseConfig, Config, Instance, InstanceList, JSONQuery }
export { Query, Where } from './query'

/**
 * Client is a web-gRPC wrapper client for communicating with a webgRPC-enabled Textile server.
 * This client library can be used to interact with a local or remote Textile gRPC-service
 *  It is a wrapper around Textile's 'DB' API, which is defined here: https://github.com/textileio/go-threads/blob/master/api/pb/api.proto.
 */
export class Client {
  /**
   * version is the release version.
   */
  public static version(): string {
    return pack.version
  }

  /**
   * config is the (public) threads config.
   */
  public readonly config: Config

  /**
   * Client creates a new gRPC client instance.
   * @param host The local/remote host url. Defaults to 'localhost:6007'.
   * @param defaultTransport The default transport to use when making webgRPC calls. Defaults to WebSockets.
   */
  constructor(config: Config | BaseConfig = {}) {
    if (config instanceof Config) {
      this.config = config
    } else {
      this.config = new Config(config.host, config.transport)
    }
    grpc.setDefaultTransport(this.config.transport)
  }

  /**
   * newDB creates a new store on the remote node.
   */
  public async newDB() {
    return this.unary(API.NewDB, new NewDBRequest()) as Promise<NewDBReply.AsObject>
  }

  /**
   * newCollection registers a new model schema under the given name on the remote node.
   * The schema must be a valid json-schema.org schema, and can be a JSON string or Javascript object.
   * @param DBID The id of the store with which to register the new model.
   * @param name The human-readable name for the model.
   * @param schema The actual json-schema.org compatible schema object.
   */
  public async newCollection(DBID: string, name: string, schema: any) {
    const req = new NewCollectionRequest()
    req.setDbid(DBID)
    req.setName(name)
    req.setSchema(JSON.stringify(schema))
    await this.unary(API.NewCollection, req)
    return
  }

  /**
   * start initializes the client with the given store.
   * It should be called immediatelly after registering all schemas and before any operation on
   * the store.
   * @param DBID The id of the store with which to register.
   */
  public async start(DBID: string) {
    const req = new StartRequest()
    req.setDbid(DBID)
    await this.unary(API.Start, req)
    return
  }

  /**
   * startFromAddress initializes the client with the given store, connecting to the given
   * thread address (database). It should be called before any operation on the store, and is an
   * alternative to start, which creates a local store. startFromAddress should also include the
   * read and follow keys, which should be Buffer, Uint8Array or base58-encoded strings.
   * See `getDBLink` for a possible source of the address and keys.
   * @param DBID The id of the store with which to register.
   * @param address The address for the thread with which to connect.
   * Should be of the form /ip4/<url/ip-address>/tcp/<port>/p2p/<peer-id>/thread/<thread-id>
   * @param followKey Symmetric key. Uint8Array or base58-encoded string of length 44 bytes.
   * @param readKey Symmetric key. Uint8Array or base58-encoded string of length 44 bytes.
   */
  public async startFromAddress(
    DBID: string,
    address: string,
    followKey: string | Uint8Array,
    readKey: string | Uint8Array,
  ) {
    const req = new StartFromAddressRequest()
    req.setDbid(DBID)
    req.setAddress(address)
    req.setFollowkey(typeof followKey === 'string' ? decode(followKey) : followKey)
    req.setReadkey(typeof readKey === 'string' ? decode(readKey) : readKey)
    await this.unary(API.StartFromAddress, req)
    return
  }

  /**
   * getDBLink returns invite 'links' unseful for inviting other peers to join a given store/thread.
   * @param DBID The id of the store for which to create the invite.
   */
  public async getDBLink(DBID: string) {
    const req = new GetDBLinkRequest()
    req.setDbid(DBID)
    const res = (await this.unary(API.GetDBLink, req)) as GetDBLinkReply.AsObject
    const invites: Array<{ address: string; followKey: string; readKey: string }> = []
    for (const addr of res.addressesList) {
      const fk = Buffer.from(res.followkey as string, 'base64')
      const rk = Buffer.from(res.readkey as string, 'base64')
      invites.push({
        address: addr,
        followKey: encode(fk),
        readKey: encode(rk),
      })
    }
    return invites
  }

  /**
   * modelCreate creates a new model instance in the given store.
   * @param DBID The id of the store in which create the new instance.
   * @param modelName The human-readable name of the model to use.
   * @param values An array of model instances as JSON/JS objects.
   */
  public async modelCreate<T = any>(DBID: string, modelName: string, values: any[]) {
    const req = new CreateRequest()
    req.setDbid(DBID)
    req.setCollectionname(modelName)
    const list: any[] = []
    values.forEach(v => {
      v['ID'] = uuid.v4()
      list.push(JSON.stringify(v))
    })
    req.setValuesList(list)
    const res = (await this.unary(API.Create, req)) as CreateReply.AsObject
    const ret: InstanceList<T> = {
      instancesList: res.instancesList.map(instance => JSON.parse(instance as string)),
    }
    return ret
  }

  /**
   * modelSave saves changes to an existing model instance in the given store.
   * @param DBID The id of the store in which the existing instance will be saved.
   * @param modelName The human-readable name of the model to use.
   * @param values An array of model instances as JSON/JS objects. Each model instance must have a valid existing `ID` property.
   */
  public async modelSave(DBID: string, modelName: string, values: any[]) {
    const req = new SaveRequest()
    req.setDbid(DBID)
    req.setCollectionname(modelName)
    const list: any[] = []
    values.forEach(v => {
      if (!v.hasOwnProperty('ID')) {
        v['ID'] = '' // The server will add an ID if empty.
      }
      list.push(JSON.stringify(v))
    })
    req.setValuesList(list)
    await this.unary(API.Save, req)
    return
  }

  /**
   * modelDelete deletes an existing model instance from the given store.
   * @param DBID The id of the store from which to remove the given instances.
   * @param modelName The human-readable name of the model to use.
   * @param instanceIDs An array of instance ids to delete.
   */
  public async modelDelete(DBID: string, modelName: string, instanceIDs: string[]) {
    const req = new DeleteRequest()
    req.setDbid(DBID)
    req.setCollectionname(modelName)
    req.setInstanceidsList(instanceIDs)
    await this.unary(API.Delete, req)
    return
  }

  /**
   * modelHas checks whether a given instance exists in the given store.
   * @param DBID The id of the store in which to check inclusion.
   * @param modelName The human-readable name of the model to use.
   * @param instanceIDs An array of instance ids to check for.
   */
  public async modelHas(DBID: string, modelName: string, instanceIDs: string[]) {
    const req = new HasRequest()
    req.setDbid(DBID)
    req.setCollectionname(modelName)
    req.setInstanceidsList(instanceIDs)
    const res = (await this.unary(API.Has, req)) as HasReply.AsObject
    return res.exists
  }

  /**
   * instanceFind queries the store for entities matching the given query parameters. See Query for options.
   * @param DBID The id of the store on which to perform the query.
   * @param modelName The human-readable name of the model to use.
   * @param query The object that describes the query. See Query for options. Alternatively, see JSONQuery for the basic interface.
   */
  public async instanceFind<T = any>(DBID: string, modelName: string, query: JSONQuery) {
    const req = new FindRequest()
    req.setDbid(DBID)
    req.setCollectionname(modelName)
    // @todo: Find a more isomorphic way to do this base64 round-trip
    req.setQueryjson(Buffer.from(JSON.stringify(query)).toString('base64'))
    const res = (await this.unary(API.Find, req)) as FindReply.AsObject
    const ret: InstanceList<T> = {
      instancesList: res.instancesList.map(instance =>
        JSON.parse(Buffer.from(instance as string, 'base64').toString()),
      ),
    }
    return ret
  }

  /**
   * instanceFindByID queries the store for the id of an instance.
   * @param DBID The id of the store on which to perform the query.
   * @param modelName The human-readable name of the model to use.
   * @param instanceID The id of the instance to search for.
   */
  public async instanceFindByID<T = any>(DBID: string, modelName: string, instanceID: string) {
    const req = new FindByIDRequest()
    req.setDbid(DBID)
    req.setCollectionname(modelName)
    req.setInstanceid(instanceID)
    const res = (await this.unary(API.FindByID, req)) as FindByIDReply.AsObject
    const ret: Instance<T> = {
      instance: JSON.parse(res.instance as string),
    }
    return ret
  }

  /**
   * readTransaction creates a new read-only transaction object. See ReadTransaction for details.
   * @param DBID The id of the store on which to perform the transaction.
   * @param modelName The human-readable name of the model to use.
   */
  public readTransaction(DBID: string, modelName: string): ReadTransaction {
    const client = grpc.client(API.ReadTransaction, {
      host: this.config.host,
    }) as grpc.Client<ReadTransactionRequest, ReadTransactionReply>
    return new ReadTransaction(this.config, client, DBID, modelName)
  }

  /**
   * writeTransaction creates a new writeable transaction object. See WriteTransaction for details.
   * @param DBID The id of the store on which to perform the transaction.
   * @param modelName The human-readable name of the model to use.
   */
  public writeTransaction(DBID: string, modelName: string): WriteTransaction {
    const client = grpc.client(API.WriteTransaction, {
      host: this.config.host,
    }) as grpc.Client<WriteTransactionRequest, WriteTransactionReply>
    return new WriteTransaction(this.config, client, DBID, modelName)
  }

  /**
   * listen opens a long-lived connection with a remote node, running the given callback on each new update to the given instance.
   * The return value is a `close` function, which cleanly closes the connection with the remote node.
   * @param DBID The id of the store on which to open the connection.
   * @param modelName The human-readable name of the model to use.
   * @param instanceID The id of the instance to monitor.
   * @param callback The callback to call on each update to the given instance.
   */
  public listen<T = any>(
    DBID: string,
    modelName: string,
    instanceID: string,
    callback: (reply?: Instance<T>, err?: Error) => void,
  ) {
    const req = new ListenRequest()
    req.setDbid(DBID)
    if (modelName && modelName !== '') {
      const filter = new ListenRequest.Filter()
      filter.setCollectionname(modelName)
      req.addFilters(filter)
    }
    if (instanceID && instanceID !== '') {
      const filter = new ListenRequest.Filter()
      filter.setInstanceid(instanceID)
      req.addFilters(filter)
    }
    const res = grpc.invoke(API.Listen, {
      host: this.config.host,
      request: req,
      metadata: this.config._wrapMetadata(),
      onMessage: (rec: ListenReply) => {
        const ret: Instance<T> = {
          instance: JSON.parse(Buffer.from(rec.getInstance_asU8()).toString()),
        }
        callback(ret)
      },
      onEnd: (status: grpc.Code, message: string, _trailers: grpc.Metadata) => {
        if (status !== grpc.Code.OK) {
          return callback(undefined, new Error(message))
        }
        callback()
      },
    })
    return res.close.bind(res)
  }

  private async unary<
    TRequest extends grpc.ProtobufMessage,
    TResponse extends grpc.ProtobufMessage,
    M extends grpc.UnaryMethodDefinition<TRequest, TResponse>
  >(methodDescriptor: M, req: TRequest) {
    return new Promise((resolve, reject) => {
      grpc.unary(methodDescriptor, {
        request: req,
        host: this.config.host,
        metadata: this.config._wrapMetadata(),
        onEnd: res => {
          const { status, statusMessage, message } = res
          if (status === grpc.Code.OK) {
            if (message) {
              resolve(message.toObject())
            } else {
              resolve()
            }
          } else {
            reject(new Error(statusMessage))
          }
        },
      })
    })
  }
}

// eslint-disable-next-line import/no-default-export
export default Client
