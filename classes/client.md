[@textile/threads-client](../README.md) › [Globals](../globals.md) › [Client](client.md)

# Class: Client

Client is a web-gRPC wrapper client for communicating with a webgRPC-enabled Textile server.
This client library can be used to interact with a local or remote Textile gRPC-service
 It is a wrapper around Textile's 'Store' API, which is defined here: https://github.com/textileio/go-threads/blob/master/api/pb/api.proto.

## Hierarchy

* **Client**

## Index

### Constructors

* [constructor](client.md#constructor)

### Properties

* [config](client.md#config)

### Methods

* [getStoreLink](client.md#getstorelink)
* [listen](client.md#listen)
* [modelCreate](client.md#modelcreate)
* [modelDelete](client.md#modeldelete)
* [modelFind](client.md#modelfind)
* [modelFindByID](client.md#modelfindbyid)
* [modelHas](client.md#modelhas)
* [modelSave](client.md#modelsave)
* [newStore](client.md#newstore)
* [readTransaction](client.md#readtransaction)
* [registerSchema](client.md#registerschema)
* [start](client.md#start)
* [startFromAddress](client.md#startfromaddress)
* [writeTransaction](client.md#writetransaction)
* [version](client.md#static-version)

## Constructors

###  constructor

\+ **new Client**(`config`: [Config](config.md) | [BaseConfig](../interfaces/baseconfig.md)): *[Client](client.md)*

*Defined in [src/index.ts:56](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L56)*

Client creates a new gRPC client instance.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`config` | [Config](config.md) &#124; [BaseConfig](../interfaces/baseconfig.md) | {} |

**Returns:** *[Client](client.md)*

## Properties

###  config

• **config**: *[Config](config.md)*

*Defined in [src/index.ts:56](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L56)*

config is the (public) threads config.

## Methods

###  getStoreLink

▸ **getStoreLink**(`storeID`: string): *Promise‹object[]›*

*Defined in [src/index.ts:139](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L139)*

getStoreLink returns invite 'links' unseful for inviting other peers to join a given store/thread.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store for which to create the invite.  |

**Returns:** *Promise‹object[]›*

___

###  listen

▸ **listen**<**T**>(`storeID`: string, `modelName`: string, `entityID`: string, `callback`: function): *function*

*Defined in [src/index.ts:300](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L300)*

listen opens a long-lived connection with a remote node, running the given callback on each new update to the given entity.
The return value is a `close` function, which cleanly closes the connection with the remote node.

**Type parameters:**

▪ **T**

**Parameters:**

▪ **storeID**: *string*

The id of the store on which to open the connection.

▪ **modelName**: *string*

The human-readable name of the model to use.

▪ **entityID**: *string*

The id of the entity to monitor.

▪ **callback**: *function*

The callback to call on each update to the given entity.

▸ (`reply?`: [Entity](../interfaces/entity.md)‹T›, `err?`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`reply?` | [Entity](../interfaces/entity.md)‹T› |
`err?` | Error |

**Returns:** *function*

▸ (): *void*

___

###  modelCreate

▸ **modelCreate**<**T**>(`storeID`: string, `modelName`: string, `values`: any[]): *Promise‹[EntityList](../interfaces/entitylist.md)‹T››*

*Defined in [src/index.ts:162](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L162)*

modelCreate creates a new model instance in the given store.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store in which create the new instance. |
`modelName` | string | The human-readable name of the model to use. |
`values` | any[] | An array of model instances as JSON/JS objects.  |

**Returns:** *Promise‹[EntityList](../interfaces/entitylist.md)‹T››*

___

###  modelDelete

▸ **modelDelete**(`storeID`: string, `modelName`: string, `entityIDs`: string[]): *Promise‹void›*

*Defined in [src/index.ts:207](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L207)*

modelDelete deletes an existing model instance from the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store from which to remove the given instances. |
`modelName` | string | The human-readable name of the model to use. |
`entityIDs` | string[] | An array of entity ids to delete.  |

**Returns:** *Promise‹void›*

___

###  modelFind

▸ **modelFind**<**T**>(`storeID`: string, `modelName`: string, `query`: [JSONQuery](../interfaces/jsonquery.md)): *Promise‹[EntityList](../interfaces/entitylist.md)‹T››*

*Defined in [src/index.ts:237](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L237)*

modelFind queries the store for entities matching the given query parameters. See Query for options.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store on which to perform the query. |
`modelName` | string | The human-readable name of the model to use. |
`query` | [JSONQuery](../interfaces/jsonquery.md) | The object that describes the query. See Query for options. Alternatively, see JSONQuery for the basic interface.  |

**Returns:** *Promise‹[EntityList](../interfaces/entitylist.md)‹T››*

___

###  modelFindByID

▸ **modelFindByID**<**T**>(`storeID`: string, `modelName`: string, `entityID`: string): *Promise‹[Entity](../interfaces/entity.md)‹T››*

*Defined in [src/index.ts:256](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L256)*

modelFindByID queries the store for the id of an entity.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store on which to perform the query. |
`modelName` | string | The human-readable name of the model to use. |
`entityID` | string | The id of the entity to search for.  |

**Returns:** *Promise‹[Entity](../interfaces/entity.md)‹T››*

___

###  modelHas

▸ **modelHas**(`storeID`: string, `modelName`: string, `entityIDs`: string[]): *Promise‹boolean›*

*Defined in [src/index.ts:222](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L222)*

modelHas checks whether a given entity exists in the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store in which to check inclusion. |
`modelName` | string | The human-readable name of the model to use. |
`entityIDs` | string[] | An array of entity ids to check for.  |

**Returns:** *Promise‹boolean›*

___

###  modelSave

▸ **modelSave**(`storeID`: string, `modelName`: string, `values`: any[]): *Promise‹void›*

*Defined in [src/index.ts:185](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L185)*

modelSave saves changes to an existing model instance in the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store in which the existing instance will be saved. |
`modelName` | string | The human-readable name of the model to use. |
`values` | any[] | An array of model instances as JSON/JS objects. Each model instance must have a valid existing `ID` property.  |

**Returns:** *Promise‹void›*

___

###  newStore

▸ **newStore**(): *Promise‹object›*

*Defined in [src/index.ts:75](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L75)*

newStore creates a new store on the remote node.

**Returns:** *Promise‹object›*

___

###  readTransaction

▸ **readTransaction**(`storeID`: string, `modelName`: string): *[ReadTransaction](readtransaction.md)*

*Defined in [src/index.ts:273](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L273)*

readTransaction creates a new read-only transaction object. See ReadTransaction for details.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store on which to perform the transaction. |
`modelName` | string | The human-readable name of the model to use.  |

**Returns:** *[ReadTransaction](readtransaction.md)*

___

###  registerSchema

▸ **registerSchema**(`storeID`: string, `name`: string, `schema`: any): *Promise‹void›*

*Defined in [src/index.ts:86](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L86)*

registerSchema registers a new model schema under the given name on the remote node.
The schema must be a valid json-schema.org schema, and can be a JSON string or Javascript object.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store with which to register the new model. |
`name` | string | The human-readable name for the model. |
`schema` | any | The actual json-schema.org compatible schema object.  |

**Returns:** *Promise‹void›*

___

###  start

▸ **start**(`storeID`: string): *Promise‹void›*

*Defined in [src/index.ts:101](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L101)*

start initializes the client with the given store.
It should be called immediatelly after registering all schemas and before any operation on
the store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store with which to register.  |

**Returns:** *Promise‹void›*

___

###  startFromAddress

▸ **startFromAddress**(`storeID`: string, `address`: string, `followKey`: string | Uint8Array, `readKey`: string | Uint8Array): *Promise‹void›*

*Defined in [src/index.ts:120](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L120)*

startFromAddress initializes the client with the given store, connecting to the given
thread address (database). It should be called before any operation on the store, and is an
alternative to start, which creates a local store. startFromAddress should also include the
read and follow keys, which should be Buffer, Uint8Array or base58-encoded strings.
See `getStoreLink` for a possible source of the address and keys.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store with which to register. |
`address` | string | The address for the thread with which to connect. Should be of the form /ip4/<url/ip-address>/tcp/<port>/p2p/<peer-id>/thread/<thread-id> |
`followKey` | string &#124; Uint8Array | Symmetric key. Uint8Array or base58-encoded string of length 44 bytes. |
`readKey` | string &#124; Uint8Array | Symmetric key. Uint8Array or base58-encoded string of length 44 bytes.  |

**Returns:** *Promise‹void›*

___

###  writeTransaction

▸ **writeTransaction**(`storeID`: string, `modelName`: string): *[WriteTransaction](writetransaction.md)*

*Defined in [src/index.ts:285](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L285)*

writeTransaction creates a new writeable transaction object. See WriteTransaction for details.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`storeID` | string | The id of the store on which to perform the transaction. |
`modelName` | string | The human-readable name of the model to use.  |

**Returns:** *[WriteTransaction](writetransaction.md)*

___

### `Static` version

▸ **version**(): *string*

*Defined in [src/index.ts:49](https://github.com/textileio/js-threads-client/blob/master/src/index.ts#L49)*

version is the release version.

**Returns:** *string*
