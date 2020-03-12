[@textile/threads-client](../README.md) › [Globals](../globals.md) › [ReadTransaction](readtransaction.md)

# Class: ReadTransaction

ReadTransaction performs a read-only bulk transaction on the underlying store.

## Hierarchy

* [Transaction](transaction.md)‹ReadTransactionRequest, ReadTransactionReply›

  ↳ **ReadTransaction**

## Index

### Constructors

* [constructor](readtransaction.md#constructor)

### Methods

* [end](readtransaction.md#end)
* [has](readtransaction.md#has)
* [modelFind](readtransaction.md#modelfind)
* [modelFindByID](readtransaction.md#modelfindbyid)
* [start](readtransaction.md#start)

## Constructors

###  constructor

\+ **new ReadTransaction**(`config`: [Config](config.md), `client`: Client‹ReadTransactionRequest, ReadTransactionReply›, `storeID`: string, `modelName`: string): *[ReadTransaction](readtransaction.md)*

*Overrides [Transaction](transaction.md).[constructor](transaction.md#constructor)*

*Defined in [src/ReadTransaction.ts:19](https://github.com/textileio/js-threads-client/blob/master/src/ReadTransaction.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Config](config.md) |
`client` | Client‹ReadTransactionRequest, ReadTransactionReply› |
`storeID` | string |
`modelName` | string |

**Returns:** *[ReadTransaction](readtransaction.md)*

## Methods

###  end

▸ **end**(): *Promise‹void›*

*Inherited from [Transaction](transaction.md).[end](transaction.md#end)*

*Defined in [src/Transaction.ts:22](https://github.com/textileio/js-threads-client/blob/master/src/Transaction.ts#L22)*

end completes (flushes) the transaction. All operations between start and end will be applied as a single transaction upon a call to end.

**Returns:** *Promise‹void›*

___

###  has

▸ **has**(`entityIDs`: string[]): *Promise‹boolean›*

*Defined in [src/ReadTransaction.ts:46](https://github.com/textileio/js-threads-client/blob/master/src/ReadTransaction.ts#L46)*

has checks whether a given entity exists in the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`entityIDs` | string[] | An array of entity ids to check for.  |

**Returns:** *Promise‹boolean›*

___

###  modelFind

▸ **modelFind**<**T**>(`query`: [JSONQuery](../interfaces/jsonquery.md)): *Promise‹[EntityList](../interfaces/entitylist.md)‹T››*

*Defined in [src/ReadTransaction.ts:65](https://github.com/textileio/js-threads-client/blob/master/src/ReadTransaction.ts#L65)*

modelFind queries the store for entities matching the given query parameters. See Query for options.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`query` | [JSONQuery](../interfaces/jsonquery.md) | The object that describes the query. See Query for options. Alternatively, see JSONQuery for the basic interface.  |

**Returns:** *Promise‹[EntityList](../interfaces/entitylist.md)‹T››*

___

###  modelFindByID

▸ **modelFindByID**<**T**>(`entityID`: string): *Promise‹[Entity](../interfaces/entity.md)‹T››*

*Defined in [src/ReadTransaction.ts:91](https://github.com/textileio/js-threads-client/blob/master/src/ReadTransaction.ts#L91)*

modelFindByID queries the store for the id of an entity.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`entityID` | string | The id of the entity to search for.  |

**Returns:** *Promise‹[Entity](../interfaces/entity.md)‹T››*

___

###  start

▸ **start**(): *Promise‹void›*

*Defined in [src/ReadTransaction.ts:31](https://github.com/textileio/js-threads-client/blob/master/src/ReadTransaction.ts#L31)*

start begins the transaction. All operations between start and end will be applied as a single transaction upon a call to end.

**Returns:** *Promise‹void›*
