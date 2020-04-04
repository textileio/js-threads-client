[@textile/threads-client](../README.md) › [Globals](../globals.md) › [Client](client.md)

# Class: Client

Client is a web-gRPC wrapper client for communicating with a webgRPC-enabled Textile server.
This client library can be used to interact with a local or remote Textile gRPC-service
 It is a wrapper around Textile's 'DB' API, which is defined here: https://github.com/textileio/go-threads/blob/master/api/pb/api.proto.

## Hierarchy

* **Client**

## Index

### Constructors

* [constructor](client.md#constructor)

### Properties

* [config](client.md#config)

### Methods

* [create](client.md#create)
* [delete](client.md#delete)
* [find](client.md#find)
* [findByID](client.md#findbyid)
* [getDBInfo](client.md#getdbinfo)
* [has](client.md#has)
* [listen](client.md#listen)
* [newCollection](client.md#newcollection)
* [newDB](client.md#newdb)
* [newDBFromAddr](client.md#newdbfromaddr)
* [readTransaction](client.md#readtransaction)
* [save](client.md#save)
* [writeTransaction](client.md#writetransaction)
* [version](client.md#static-version)

## Constructors

###  constructor

\+ **new Client**(`config`: [Config](config.md) | [BaseConfig](../interfaces/baseconfig.md)): *[Client](client.md)*

*Defined in [src/index.ts:57](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L57)*

Client creates a new gRPC client instance.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`config` | [Config](config.md) &#124; [BaseConfig](../interfaces/baseconfig.md) | {} |

**Returns:** *[Client](client.md)*

## Properties

###  config

• **config**: *[Config](config.md)*

*Defined in [src/index.ts:57](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L57)*

config is the (public) threads config.

## Methods

###  create

▸ **create**<**T**>(`dbID`: Buffer, `collectionName`: string, `values`: any[]): *Promise‹string[]›*

*Defined in [src/index.ts:159](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L159)*

create creates a new model instance in the given store.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database |
`collectionName` | string | The human-readable name of the model to use. |
`values` | any[] | An array of model instances as JSON/JS objects.  |

**Returns:** *Promise‹string[]›*

___

###  delete

▸ **delete**(`dbID`: Buffer, `collectionName`: string, `IDs`: string[]): *Promise‹void›*

*Defined in [src/index.ts:201](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L201)*

delete deletes an existing model instance from the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database |
`collectionName` | string | The human-readable name of the model to use. |
`IDs` | string[] | An array of instance ids to delete.  |

**Returns:** *Promise‹void›*

___

###  find

▸ **find**<**T**>(`dbID`: Buffer, `collectionName`: string, `query`: [JSONQuery](../interfaces/jsonquery.md)): *Promise‹[InstanceList](../interfaces/instancelist.md)‹T››*

*Defined in [src/index.ts:231](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L231)*

find queries the store for entities matching the given query parameters. See Query for options.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database |
`collectionName` | string | The human-readable name of the model to use. |
`query` | [JSONQuery](../interfaces/jsonquery.md) | The object that describes the query. See Query for options. Alternatively, see JSONQuery for the basic interface.  |

**Returns:** *Promise‹[InstanceList](../interfaces/instancelist.md)‹T››*

___

###  findByID

▸ **findByID**<**T**>(`dbID`: Buffer, `collectionName`: string, `ID`: string): *Promise‹[Instance](../interfaces/instance.md)‹T››*

*Defined in [src/index.ts:252](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L252)*

findByID queries the store for the id of an instance.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database |
`collectionName` | string | The human-readable name of the model to use. |
`ID` | string | The id of the instance to search for.  |

**Returns:** *Promise‹[Instance](../interfaces/instance.md)‹T››*

___

###  getDBInfo

▸ **getDBInfo**(`dbID`: Buffer): *Promise‹object[]›*

*Defined in [src/index.ts:137](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L137)*

getDBInfo returns invite 'links' unseful for inviting other peers to join a given store/thread.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database  |

**Returns:** *Promise‹object[]›*

___

###  has

▸ **has**(`dbID`: Buffer, `collectionName`: string, `IDs`: string[]): *Promise‹boolean›*

*Defined in [src/index.ts:216](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L216)*

has checks whether a given instance exists in the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database |
`collectionName` | string | The human-readable name of the model to use. |
`IDs` | string[] | An array of instance ids to check for.  |

**Returns:** *Promise‹boolean›*

___

###  listen

▸ **listen**<**T**>(`dbID`: Buffer, `filters`: [Filter](../interfaces/filter.md)[], `callback`: function): *function*

*Defined in [src/index.ts:298](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L298)*

listen opens a long-lived connection with a remote node, running the given callback on each new update to the given instance.
The return value is a `close` function, which cleanly closes the connection with the remote node.

**Type parameters:**

▪ **T**

**Parameters:**

▪ **dbID**: *Buffer*

the ID of the database

▪ **filters**: *[Filter](../interfaces/filter.md)[]*

contains an array of Filters

▪ **callback**: *function*

The callback to call on each update to the given instance.

▸ (`reply?`: [Instance](../interfaces/instance.md)‹T›, `err?`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`reply?` | [Instance](../interfaces/instance.md)‹T› |
`err?` | Error |

**Returns:** *function*

▸ (): *void*

___

###  newCollection

▸ **newCollection**(`dbID`: Buffer, `name`: string, `schema`: any): *Promise‹void›*

*Defined in [src/index.ts:91](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L91)*

newCollection registers a new model schema under the given name on the remote node.
The schema must be a valid json-schema.org schema, and can be a JSON string or Javascript object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database |
`name` | string | The human-readable name for the model. |
`schema` | any | The actual json-schema.org compatible schema object.  |

**Returns:** *Promise‹void›*

___

###  newDB

▸ **newDB**(`dbID`: Buffer): *Promise‹void›*

*Defined in [src/index.ts:77](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L77)*

newDB creates a new store on the remote node.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database  |

**Returns:** *Promise‹void›*

___

###  newDBFromAddr

▸ **newDBFromAddr**(`address`: string, `key`: string | Uint8Array, `collections`: Array‹object›): *Promise‹unknown›*

*Defined in [src/index.ts:114](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L114)*

startFromAddress initializes the client with the given store, connecting to the given
thread address (database). It should be called before any operation on the store, and is an
alternative to start, which creates a local store. startFromAddress should also include the
read and follow keys, which should be Buffer, Uint8Array or base58-encoded strings.
See `getDBInfo` for a possible source of the address and keys.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | string | The address for the thread with which to connect. Should be of the form /ip4/<url/ip-address>/tcp/<port>/p2p/<peer-id>/thread/<thread-id> |
`key` | string &#124; Uint8Array | - |
`collections` | Array‹object› | An array of Name and JSON Schemas for collections in the DB.  |

**Returns:** *Promise‹unknown›*

___

###  readTransaction

▸ **readTransaction**(`dbID`: Buffer, `collectionName`: string): *[ReadTransaction](readtransaction.md)*

*Defined in [src/index.ts:269](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L269)*

readTransaction creates a new read-only transaction object. See ReadTransaction for details.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database |
`collectionName` | string | The human-readable name of the model to use.  |

**Returns:** *[ReadTransaction](readtransaction.md)*

___

###  save

▸ **save**(`dbID`: Buffer, `collectionName`: string, `values`: any[]): *Promise‹void›*

*Defined in [src/index.ts:179](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L179)*

save saves changes to an existing model instance in the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database |
`collectionName` | string | The human-readable name of the model to use. |
`values` | any[] | An array of model instances as JSON/JS objects. Each model instance must have a valid existing `ID` property.  |

**Returns:** *Promise‹void›*

___

###  writeTransaction

▸ **writeTransaction**(`dbID`: Buffer, `collectionName`: string): *[WriteTransaction](writetransaction.md)*

*Defined in [src/index.ts:281](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L281)*

writeTransaction creates a new writeable transaction object. See WriteTransaction for details.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`dbID` | Buffer | the ID of the database |
`collectionName` | string | The human-readable name of the model to use.  |

**Returns:** *[WriteTransaction](writetransaction.md)*

___

### `Static` version

▸ **version**(): *string*

*Defined in [src/index.ts:50](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L50)*

version is the release version.

**Returns:** *string*
