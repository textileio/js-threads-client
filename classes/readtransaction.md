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
* [find](readtransaction.md#find)
* [findByID](readtransaction.md#findbyid)
* [has](readtransaction.md#has)
* [start](readtransaction.md#start)

## Constructors

###  constructor

\+ **new ReadTransaction**(`config`: [Config](config.md), `client`: Client‹ReadTransactionRequest, ReadTransactionReply›, `dbID`: Buffer, `modelName`: string): *[ReadTransaction](readtransaction.md)*

*Overrides [Transaction](transaction.md).[constructor](transaction.md#constructor)*

*Defined in [src/ReadTransaction.ts:18](https://github.com/textileio/js-threads-client/blob/master/src/ReadTransaction.ts#L18)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | [Config](config.md) |
`client` | Client‹ReadTransactionRequest, ReadTransactionReply› |
`dbID` | Buffer |
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

###  find

▸ **find**<**T**>(`query`: [JSONQuery](../interfaces/jsonquery.md)): *Promise‹[InstanceList](../interfaces/instancelist.md)‹T››*

*Defined in [src/ReadTransaction.ts:64](https://github.com/textileio/js-threads-client/blob/master/src/ReadTransaction.ts#L64)*

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

▸ **findByID**<**T**>(`ID`: string): *Promise‹[Instance](../interfaces/instance.md)‹T››*

*Defined in [src/ReadTransaction.ts:92](https://github.com/textileio/js-threads-client/blob/master/src/ReadTransaction.ts#L92)*

findByID queries the store for the id of an instance.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`ID` | string | The id of the instance to search for.  |

**Returns:** *Promise‹[Instance](../interfaces/instance.md)‹T››*

___

###  has

▸ **has**(`IDs`: string[]): *Promise‹boolean›*

*Defined in [src/ReadTransaction.ts:45](https://github.com/textileio/js-threads-client/blob/master/src/ReadTransaction.ts#L45)*

has checks whether a given instance exists in the given store.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`IDs` | string[] | An array of instance ids to check for.  |

**Returns:** *Promise‹boolean›*

___

###  start

▸ **start**(): *Promise‹void›*

*Defined in [src/ReadTransaction.ts:30](https://github.com/textileio/js-threads-client/blob/master/src/ReadTransaction.ts#L30)*

start begins the transaction. All operations between start and end will be applied as a single transaction upon a call to end.

**Returns:** *Promise‹void›*
