[@textile/threads-client](README.md) › [Globals](globals.md)

# @textile/threads-client

## Index

### Enumerations

* [JSONOperation](enums/jsonoperation.md)

### Classes

* [Client](classes/client.md)
* [Config](classes/config.md)
* [Criterion](classes/criterion.md)
* [Query](classes/query.md)
* [ReadTransaction](classes/readtransaction.md)
* [Transaction](classes/transaction.md)
* [WriteTransaction](classes/writetransaction.md)

### Interfaces

* [BaseConfig](interfaces/baseconfig.md)
* [Entity](interfaces/entity.md)
* [EntityList](interfaces/entitylist.md)
* [JSONCriterion](interfaces/jsoncriterion.md)
* [JSONQuery](interfaces/jsonquery.md)
* [JSONSort](interfaces/jsonsort.md)
* [JSONValue](interfaces/jsonvalue.md)

### Type aliases

* [Value](globals.md#value)

### Variables

* [Where](globals.md#const-where)

### Functions

* [valueToJSONValue](globals.md#const-valuetojsonvalue)

## Type aliases

###  Value

Ƭ **Value**: *string | boolean | number*

*Defined in [src/models.ts:18](https://github.com/textileio/js-threads-client/blob/master/src/models.ts#L18)*

Value represents a valid JSON data type.

## Variables

### `Const` Where

• **Where**: *[Criterion](classes/criterion.md)* = Criterion

*Defined in [src/query.ts:100](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L100)*

Alias Criterion to Where for a slightly nicer API (see example below)

## Functions

### `Const` valueToJSONValue

▸ **valueToJSONValue**(`value`: [Value](globals.md#value)): *[JSONValue](interfaces/jsonvalue.md)*

*Defined in [src/query.ts:3](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L3)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [Value](globals.md#value) |

**Returns:** *[JSONValue](interfaces/jsonvalue.md)*
