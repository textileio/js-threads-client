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

* [create](writetransaction.md#create)
* [delete](writetransaction.md#delete)
* [end](writetransaction.md#end)
* [find](writetransaction.md#find)
* [findByID](writetransaction.md#findbyid)
* [has](writetransaction.md#has)
* [save](writetransaction.md#save)
* [start](writetransaction.md#start)

## Constructors

###  constructor

\+ **new WriteTransaction**(`config`: [Config](config.md), `client`: Client‹WriteTransactionRequest, WriteTransactionReply›, `dbID`: Buffer, `modelName`: string): *[WriteTransaction](writetransaction.md)*

*Overrides [Transaction](transaction.md).[constructor](transaction.md#constructor)*

*Defined in [src/WriteTransaction.ts:21](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Config](config.md) |
`client` | Client‹WriteTransactionRequest, WriteTransactionReply› |
`dbID` | Buffer |
`modelName` | string |

**Returns:** *[WriteTransaction](writetransaction.md)*

## Methods

###  create

▸ **create**<**T**>(`values`: any[]): *Promise‹undefined | string[]›*

*Defined in [src/WriteTransaction.ts:47](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L47)*

create creates a new model instance in the given store.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`values` | any[] | An array of model instances as JSON/JS objects.  |

**Returns:** *Promise‹undefined | string[]›*

___

###  delete

▸ **delete**(`IDs`: string[]): *Promise‹void›*

*Defined in [src/WriteTransaction.ts:100](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L100)*

delete deletes an existing model instance from the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`IDs` | string[] | An array of instance ids to delete.  |

**Returns:** *Promise‹void›*

___

###  end

▸ **end**(): *Promise‹void›*

*Inherited from [Transaction](transaction.md).[end](transaction.md#end)*

*Defined in [src/Transaction.ts:22](https://github.com/textileio/js-threads-client/blob/master/src/Transaction.ts#L22)*

end completes (flushes) the transaction. All operations between start and end will be applied as a single transaction upon a call to end.

**Returns:** *Promise‹void›*

___

###  find

▸ **find**<**T**>(`query`: [JSONQuery](../interfaces/jsonquery.md)): *Promise‹[InstanceList](../interfaces/instancelist.md)‹T››*

*Defined in [src/WriteTransaction.ts:135](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L135)*

find queries the store for entities matching the given query parameters. See Query for options.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`query` | [JSONQuery](../interfaces/jsonquery.md) | The object that describes the query. See Query for options. Alternatively, see JSONQuery for the basic interface.  |

**Returns:** *Promise‹[InstanceList](../interfaces/instancelist.md)‹T››*

___

###  findByID

▸ **findByID**<**T**>(`ID`: string): *Promise‹undefined | [Instance](../interfaces/instance.md)‹T››*

*Defined in [src/WriteTransaction.ts:163](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L163)*

findByID queries the store for the id of an instance.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ID` | string | The id of the instance to search for.  |

**Returns:** *Promise‹undefined | [Instance](../interfaces/instance.md)‹T››*

___

###  has

▸ **has**(`IDs`: string[]): *Promise‹boolean›*

*Defined in [src/WriteTransaction.ts:117](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L117)*

has checks whether a given instance exists in the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`IDs` | string[] | An array of instance ids to check for.  |

**Returns:** *Promise‹boolean›*

___

###  save

▸ **save**(`values`: any[]): *Promise‹void›*

*Defined in [src/WriteTransaction.ts:75](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L75)*

save saves changes to an existing model instance in the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`values` | any[] | An array of model instances as JSON/JS objects. Each model instance must have a valid existing `ID` property.  |

**Returns:** *Promise‹void›*

___

###  start

▸ **start**(): *Promise‹void›*

*Defined in [src/WriteTransaction.ts:33](https://github.com/textileio/js-threads-client/blob/master/src/WriteTransaction.ts#L33)*

start begins the transaction. All operations between start and end will be applied as a single transaction upon a call to end.

**Returns:** *Promise‹void›*
