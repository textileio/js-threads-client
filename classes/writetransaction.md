[@textile/threads-client](../README.md) › [Globals](../globals.md) › [WriteTransaction](writetransaction.md)

# Class: WriteTransaction

WriteTransaction performs a mutating bulk transaction on the underlying store.

## Hierarchy

* [Transaction](transaction.md)‹WriteTransactionRequest, WriteTransactionReply›

  ↳ **WriteTransaction**

## Index

### Constructors

* [constructor](writetransaction.md#constructor)

### Methods

* [end](writetransaction.md#end)
* [has](writetransaction.md#has)
* [modelCreate](writetransaction.md#modelcreate)
* [modelDelete](writetransaction.md#modeldelete)
* [modelFind](writetransaction.md#modelfind)
* [modelFindByID](writetransaction.md#modelfindbyid)
* [modelSave](writetransaction.md#modelsave)
* [start](writetransaction.md#start)

## Constructors

###  constructor

\+ **new WriteTransaction**(`config`: [Config](config.md), `client`: Client‹WriteTransactionRequest, WriteTransactionReply›, `storeID`: string, `modelName`: string): *[WriteTransaction](writetransaction.md)*

*Overrides [Transaction](transaction.md).[constructor](transaction.md#constructor)*

*Defined in [src/WriteTransaction.ts:22](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Config](config.md) |
`client` | Client‹WriteTransactionRequest, WriteTransactionReply› |
`storeID` | string |
`modelName` | string |

**Returns:** *[WriteTransaction](writetransaction.md)*

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

*Defined in [src/WriteTransaction.ts:121](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L121)*

has checks whether a given entity exists in the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`entityIDs` | string[] | An array of entity ids to check for.  |

**Returns:** *Promise‹boolean›*

___

###  modelCreate

▸ **modelCreate**<**T**>(`values`: any[]): *Promise‹undefined | [EntityList](../interfaces/entitylist.md)‹T››*

*Defined in [src/WriteTransaction.ts:48](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L48)*

modelCreate creates a new model instance in the given store.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`values` | any[] | An array of model instances as JSON/JS objects.  |

**Returns:** *Promise‹undefined | [EntityList](../interfaces/entitylist.md)‹T››*

___

###  modelDelete

▸ **modelDelete**(`entityIDs`: string[]): *Promise‹void›*

*Defined in [src/WriteTransaction.ts:104](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L104)*

modelDelete deletes an existing model instance from the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`entityIDs` | string[] | An array of entity ids to delete.  |

**Returns:** *Promise‹void›*

___

###  modelFind

▸ **modelFind**<**T**>(`query`: [JSONQuery](../interfaces/jsonquery.md)): *Promise‹[EntityList](../interfaces/entitylist.md)‹T››*

*Defined in [src/WriteTransaction.ts:139](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L139)*

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

▸ **modelFindByID**<**T**>(`entityID`: string): *Promise‹undefined | [Entity](../interfaces/entity.md)‹T››*

*Defined in [src/WriteTransaction.ts:165](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L165)*

modelFindByID queries the store for the id of an entity.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`entityID` | string | The id of the entity to search for.  |

**Returns:** *Promise‹undefined | [Entity](../interfaces/entity.md)‹T››*

___

###  modelSave

▸ **modelSave**(`values`: any[]): *Promise‹void›*

*Defined in [src/WriteTransaction.ts:79](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L79)*

modelSave saves changes to an existing model instance in the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`values` | any[] | An array of model instances as JSON/JS objects. Each model instance must have a valid existing `ID` property.  |

**Returns:** *Promise‹void›*

___

###  start

▸ **start**(): *Promise‹void›*

*Defined in [src/WriteTransaction.ts:34](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L34)*

start begins the transaction. All operations between start and end will be applied as a single transaction upon a call to end.

**Returns:** *Promise‹void›*
