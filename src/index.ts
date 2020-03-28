/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as uuid from 'uuid'
import { grpc } from '@improbable-eng/grpc-web'
import { API } from '@textile/threads-client-grpc/api_pb_service'
import {
  NewDBRequest,
  NewDBReply,
  NewDBFromAddrRequest,
  NewCollectionReply,
  NewCollectionRequest,
  CollectionConfig,
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
  GetDBInfoRequest,
  GetDBInfoReply,
} from '@textile/threads-client-grpc/api_pb'
import { ThreadID } from '@textile/threads-core'
import { encode, decode } from 'bs58'
import * as pack from '../package.json'
import { ReadTransaction } from './ReadTransaction'
import { WriteTransaction } from './WriteTransaction'
import { Config, BaseConfig } from './config'
import { JSONQuery, Instance, Creds, InstanceList } from './models'

export { ThreadID }
export { BaseConfig, Config, Instance, JSONQuery }
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
   * @param creds an instance of Creds
   */
  public async newDB(creds: Creds) {
    const req = new NewDBRequest()
    req.setCredentials(creds.grpcObject())
    await this.unary(API.NewDB, req)
    return
  }

  /**
   * newCollection registers a new model schema under the given name on the remote node.
   * The schema must be a valid json-schema.org schema, and can be a JSON string or Javascript object.
   * @param creds an instance of Creds
   * @param name The human-readable name for the model.
   * @param schema The actual json-schema.org compatible schema object.
   */
  public async newCollection(creds: Creds, name: string, schema: any) {
    const req = new NewCollectionRequest()
    const config = new CollectionConfig()
    config.setName(name)
    config.setSchema(Buffer.from(JSON.stringify(schema)))
    req.setCredentials(creds.grpcObject())
    req.setConfig(config)
    await this.unary(API.NewCollection, req)
    return
  }

  /**
   * startFromAddress initializes the client with the given store, connecting to the given
   * thread address (database). It should be called before any operation on the store, and is an
   * alternative to start, which creates a local store. startFromAddress should also include the
   * read and follow keys, which should be Buffer, Uint8Array or base58-encoded strings.
   * See `getDBInfo` for a possible source of the address and keys.
   * @param creds an instance of Creds
   * @param address The address for the thread with which to connect.
   * Should be of the form /ip4/<url/ip-address>/tcp/<port>/p2p/<peer-id>/thread/<thread-id>
   * @param DBKey The DBKey provided through an invite or from getDBInfo.
   * @param collections An array of Name and JSON Schemas for collections in the DB.
   */
  public async newDBFromAddr(
    creds: Creds,
    address: string,
    key: string | Uint8Array,
    collections: Array<{ name: string; schema: any }>,
  ) {
    const req = new NewDBFromAddrRequest()
    req.setCredentials(creds.grpcObject())
    req.setAddr(address)
    req.setKey(typeof key === 'string' ? decode(key) : key)
    req.setCollectionsList(
      collections.map(c => {
        const config = new CollectionConfig()
        config.setName(c.name)
        config.setSchema(JSON.stringify(c.schema))
        return config
      }),
    )
    await this.unary(API.NewDBFromAddr, req)
    return
  }

  /**
   * getDBInfo returns invite 'links' unseful for inviting other peers to join a given store/thread.
   * @param creds an instance of Creds
   */
  public async getDBInfo(creds: Creds) {
    const req = new GetDBInfoRequest()
    req.setCredentials(creds.grpcObject())
    const res = (await this.unary(API.GetDBInfo, req)) as GetDBInfoReply.AsObject
    const invites: Array<{ address: string; key: string }> = []
    for (const addr of res.addressesList) {
      const dk = Buffer.from(res.key as string, 'base64')
      invites.push({
        address: addr,
        key: encode(dk),
      })
    }
    return invites
  }

  /**
   * create creates a new model instance in the given store.
   * @param creds an instance of Creds
   * @param collectionName The human-readable name of the model to use.
   * @param values An array of model instances as JSON/JS objects.
   */
  public async create<T = any>(creds: Creds, collectionName: string, values: any[]) {
    const req = new CreateRequest()
    req.setCredentials(creds.grpcObject())
    req.setCollectionname(collectionName)
    const list: any[] = []
    values.forEach(v => {
      v['ID'] = uuid.v4()
      list.push(Buffer.from(JSON.stringify(v)))
    })
    req.setInstancesList(list)
    const res = (await this.unary(API.Create, req)) as CreateReply.AsObject
    return res.instanceidsList
  }

  /**
   * save saves changes to an existing model instance in the given store.
   * @param creds an instance of Creds
   * @param collectionName The human-readable name of the model to use.
   * @param values An array of model instances as JSON/JS objects. Each model instance must have a valid existing `ID` property.
   */
  public async save(creds: Creds, collectionName: string, values: any[]) {
    const req = new SaveRequest()
    req.setCredentials(creds.grpcObject())
    req.setCollectionname(collectionName)
    const list: any[] = []
    values.forEach(v => {
      if (!v.hasOwnProperty('ID')) {
        v['ID'] = '' // The server will add an ID if empty.
      }
      list.push(Buffer.from(JSON.stringify(v)))
    })
    req.setInstancesList(list)
    await this.unary(API.Save, req)
    return
  }

  /**
   * delete deletes an existing model instance from the given store.
   * @param creds an instance of Creds
   * @param collectionName The human-readable name of the model to use.
   * @param IDs An array of instance ids to delete.
   */
  public async delete(creds: Creds, collectionName: string, IDs: string[]) {
    const req = new DeleteRequest()
    req.setCredentials(creds.grpcObject())
    req.setCollectionname(collectionName)
    req.setInstanceidsList(IDs)
    await this.unary(API.Delete, req)
    return
  }

  /**
   * has checks whether a given instance exists in the given store.
   * @param creds an instance of Creds
   * @param collectionName The human-readable name of the model to use.
   * @param IDs An array of instance ids to check for.
   */
  public async has(creds: Creds, collectionName: string, IDs: string[]) {
    const req = new HasRequest()
    req.setCredentials(creds.grpcObject())
    req.setCollectionname(collectionName)
    req.setInstanceidsList(IDs)
    const res = (await this.unary(API.Has, req)) as HasReply.AsObject
    return res.exists
  }

  /**
   * find queries the store for entities matching the given query parameters. See Query for options.
   * @param creds an instance of Creds
   * @param collectionName The human-readable name of the model to use.
   * @param query The object that describes the query. See Query for options. Alternatively, see JSONQuery for the basic interface.
   */
  public async find<T = any>(creds: Creds, collectionName: string, query: JSONQuery) {
    const req = new FindRequest()
    req.setCredentials(creds.grpcObject())
    req.setCollectionname(collectionName)
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
   * findByID queries the store for the id of an instance.
   * @param creds an instance of Creds
   * @param collectionName The human-readable name of the model to use.
   * @param ID The id of the instance to search for.
   */
  public async findByID<T = any>(creds: Creds, collectionName: string, ID: string) {
    const req = new FindByIDRequest()
    req.setCredentials(creds.grpcObject())
    req.setCollectionname(collectionName)
    req.setInstanceid(ID)
    const res = (await this.unary(API.FindByID, req)) as FindByIDReply.AsObject
    const ret: Instance<T> = {
      instance: JSON.parse(Buffer.from(res.instance as string, 'base64').toString()),
    }
    return ret
  }

  /**
   * readTransaction creates a new read-only transaction object. See ReadTransaction for details.
   * @param creds an instance of Creds
   * @param collectionName The human-readable name of the model to use.
   */
  public readTransaction(creds: Creds, collectionName: string): ReadTransaction {
    const client = grpc.client(API.ReadTransaction, {
      host: this.config.host,
    }) as grpc.Client<ReadTransactionRequest, ReadTransactionReply>
    return new ReadTransaction(this.config, client, creds, collectionName)
  }

  /**
   * writeTransaction creates a new writeable transaction object. See WriteTransaction for details.
   * @param creds an instance of Creds
   * @param collectionName The human-readable name of the model to use.
   */
  public writeTransaction(creds: Creds, collectionName: string): WriteTransaction {
    const client = grpc.client(API.WriteTransaction, {
      host: this.config.host,
    }) as grpc.Client<WriteTransactionRequest, WriteTransactionReply>
    return new WriteTransaction(this.config, client, creds, collectionName)
  }

  /**
   * listen opens a long-lived connection with a remote node, running the given callback on each new update to the given instance.
   * The return value is a `close` function, which cleanly closes the connection with the remote node.
   * @param creds an instance of Creds
   * @param collectionName The human-readable name of the model to use.
   * @param ID The id of the instance to monitor.
   * @param callback The callback to call on each update to the given instance.
   */
  public listen<T = any>(
    creds: Creds,
    collectionName: string,
    ID: string,
    callback: (reply?: Instance<T>, err?: Error) => void,
  ) {
    const req = new ListenRequest()
    req.setCredentials(creds.grpcObject())
    if (collectionName && collectionName !== '') {
      const filter = new ListenRequest.Filter()
      filter.setCollectionname(collectionName)
      req.addFilters(filter)
    }
    if (ID && ID !== '') {
      const filter = new ListenRequest.Filter()
      filter.setInstanceid(ID)
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
