[@textile/threads-client](../README.md) › [Globals](../globals.md) › [Criterion](criterion.md)

# Class: Criterion

Criterion is a partial condition that can specify comparison operator for a field.

## Hierarchy

* **Criterion**

## Implements

* [JSONCriterion](../interfaces/jsoncriterion.md)

## Index

### Constructors

* [constructor](criterion.md#constructor)

### Properties

* [fieldPath](criterion.md#fieldpath)
* [operation](criterion.md#optional-operation)
* [query](criterion.md#optional-query)
* [value](criterion.md#optional-value)

### Methods

* [eq](criterion.md#eq)
* [ge](criterion.md#ge)
* [gt](criterion.md#gt)
* [le](criterion.md#le)
* [lt](criterion.md#lt)
* [ne](criterion.md#ne)
* [toJSON](criterion.md#tojson)

## Constructors

###  constructor

\+ **new Criterion**(`fieldPath`: string, `operation?`: [JSONOperation](../enums/jsonoperation.md), `value?`: [JSONValue](../interfaces/jsonvalue.md), `query?`: [Query](query.md)): *[Criterion](criterion.md)*

*Defined in [src/query.ts:19](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`fieldPath` | string |
`operation?` | [JSONOperation](../enums/jsonoperation.md) |
`value?` | [JSONValue](../interfaces/jsonvalue.md) |
`query?` | [Query](query.md) |

**Returns:** *[Criterion](criterion.md)*

## Properties

###  fieldPath

• **fieldPath**: *string*

*Implementation of [JSONCriterion](../interfaces/jsoncriterion.md).[fieldPath](../interfaces/jsoncriterion.md#optional-fieldpath)*

*Defined in [src/query.ts:21](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L21)*

___

### `Optional` operation

• **operation**? : *[JSONOperation](../enums/jsonoperation.md)*

*Implementation of [JSONCriterion](../interfaces/jsoncriterion.md).[operation](../interfaces/jsoncriterion.md#optional-operation)*

*Defined in [src/query.ts:22](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L22)*

___

### `Optional` query

• **query**? : *[Query](query.md)*

*Implementation of [JSONCriterion](../interfaces/jsoncriterion.md).[query](../interfaces/jsoncriterion.md#optional-query)*

*Defined in [src/query.ts:24](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L24)*

___

### `Optional` value

• **value**? : *[JSONValue](../interfaces/jsonvalue.md)*

*Implementation of [JSONCriterion](../interfaces/jsoncriterion.md).[value](../interfaces/jsoncriterion.md#optional-value)*

*Defined in [src/query.ts:23](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L23)*

## Methods

###  eq

▸ **eq**(`value`: [Value](../globals.md#value)): *[Query](query.md)*

*Defined in [src/query.ts:31](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L31)*

eq is an equality operator against a field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [Value](../globals.md#value) | The value to query against. Must be a valid JSON data type.  |

**Returns:** *[Query](query.md)*

___

###  ge

▸ **ge**(`value`: [Value](../globals.md#value)): *[Query](query.md)*

*Defined in [src/query.ts:61](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L61)*

ge is a greater or equal operator against a field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [Value](../globals.md#value) | The value to query against. Must be a valid JSON data type.  |

**Returns:** *[Query](query.md)*

___

###  gt

▸ **gt**(`value`: [Value](../globals.md#value)): *[Query](query.md)*

*Defined in [src/query.ts:47](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L47)*

gt is a greater operator against a field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [Value](../globals.md#value) | The value to query against. Must be a valid JSON data type.  |

**Returns:** *[Query](query.md)*

___

###  le

▸ **le**(`value`: [Value](../globals.md#value)): *[Query](query.md)*

*Defined in [src/query.ts:68](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L68)*

le is a less or equal operator against a field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [Value](../globals.md#value) | The value to query against. Must be a valid JSON data type.  |

**Returns:** *[Query](query.md)*

___

###  lt

▸ **lt**(`value`: [Value](../globals.md#value)): *[Query](query.md)*

*Defined in [src/query.ts:54](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L54)*

lt is a less operation against a field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [Value](../globals.md#value) | The value to query against. Must be a valid JSON data type.  |

**Returns:** *[Query](query.md)*

___

###  ne

▸ **ne**(`value`: [Value](../globals.md#value)): *[Query](query.md)*

*Defined in [src/query.ts:39](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L39)*

ne is a not equal operator against a field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [Value](../globals.md#value) | The value to query against. Must be a valid JSON data type.  |

**Returns:** *[Query](query.md)*

___

###  toJSON

▸ **toJSON**(): *[JSONCriterion](../interfaces/jsoncriterion.md)*

*Defined in [src/query.ts:91](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L91)*

toJSON converts the Criterion to JSONCriterion, dropping circular references to internal Queries.

**Returns:** *[JSONCriterion](../interfaces/jsoncriterion.md)*
