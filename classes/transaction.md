[@textile/threads-client](../README.md) › [Globals](../globals.md) › [Transaction](transaction.md)

# Class: Transaction <**TRequest, TResponse**>

Transaction represents a bulk transaction on a store.

## Type parameters

▪ **TRequest**: *ProtobufMessage*

▪ **TResponse**: *ProtobufMessage*

## Hierarchy

* **Transaction**

  ↳ [ReadTransaction](readtransaction.md)

  ↳ [WriteTransaction](writetransaction.md)

## Index

### Constructors

* [constructor](transaction.md#constructor)

### Methods

* [end](transaction.md#end)

## Constructors

###  constructor

\+ **new Transaction**(`client`: Client‹TRequest, TResponse›, `dbID`: Buffer, `modelName`: string): *[Transaction](transaction.md)*

*Defined in [src/Transaction.ts:6](https://github.com/textileio/js-threads-client/blob/master/src/Transaction.ts#L6)*

Transaction creates a new transaction for the given store using the given model.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`client` | Client‹TRequest, TResponse› | The gRPC client to use for the transaction. |
`dbID` | Buffer | the ID of the database |
`modelName` | string | The human-readable name for the model.  |

**Returns:** *[Transaction](transaction.md)*

## Methods

###  end

▸ **end**(): *Promise‹void›*

*Defined in [src/Transaction.ts:22](https://github.com/textileio/js-threads-client/blob/master/src/Transaction.ts#L22)*

end completes (flushes) the transaction. All operations between start and end will be applied as a single transaction upon a call to end.

**Returns:** *Promise‹void›*
