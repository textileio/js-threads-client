[@textile/threads-client](../README.md) › [Globals](../globals.md) › [Query](query.md)

# Class: Query

Query allows to build queries to be used to fetch data from a model.

## Hierarchy

* **Query**

## Implements

* [JSONQuery](../interfaces/jsonquery.md)

## Index

### Constructors

* [constructor](query.md#constructor)

### Properties

* [ands](query.md#ands)
* [ors](query.md#ors)
* [sort](query.md#optional-sort)

### Methods

* [and](query.md#and)
* [or](query.md#or)
* [orderBy](query.md#orderby)
* [orderByDesc](query.md#orderbydesc)
* [where](query.md#static-where)

## Constructors

###  constructor

\+ **new Query**(`ands`: [JSONCriterion](../interfaces/jsoncriterion.md)[], `ors`: [JSONQuery](../interfaces/jsonquery.md)[], `sort?`: [JSONSort](../interfaces/jsonsort.md)): *[Query](query.md)*

*Defined in [src/query.ts:108](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L108)*

Query creates a new generic query object.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`ands` | [JSONCriterion](../interfaces/jsoncriterion.md)[] | [] | An array of top-level Criterions to be included in the query. |
`ors` | [JSONQuery](../interfaces/jsonquery.md)[] | [] | An array of internal queries. |
`sort?` | [JSONSort](../interfaces/jsonsort.md) | - | An object describing how to sort the query.  |

**Returns:** *[Query](query.md)*

## Properties

###  ands

• **ands**: *[JSONCriterion](../interfaces/jsoncriterion.md)[]*

*Implementation of [JSONQuery](../interfaces/jsonquery.md).[ands](../interfaces/jsonquery.md#optional-ands)*

*Defined in [src/query.ts:115](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L115)*

An array of top-level Criterions to be included in the query.

___

###  ors

• **ors**: *[JSONQuery](../interfaces/jsonquery.md)[]*

*Implementation of [JSONQuery](../interfaces/jsonquery.md).[ors](../interfaces/jsonquery.md#optional-ors)*

*Defined in [src/query.ts:115](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L115)*

An array of internal queries.

___

### `Optional` sort

• **sort**? : *[JSONSort](../interfaces/jsonsort.md)*

*Implementation of [JSONQuery](../interfaces/jsonquery.md).[sort](../interfaces/jsonquery.md#optional-sort)*

*Defined in [src/query.ts:115](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L115)*

An object describing how to sort the query.

## Methods

###  and

▸ **and**(`fieldPath`: string): *[Criterion](criterion.md)*

*Defined in [src/query.ts:129](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L129)*

and concatenates a new condition in an existing field.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fieldPath` | string | The field name to query on. Can be a hierarchical path.  |

**Returns:** *[Criterion](criterion.md)*

___

###  or

▸ **or**(`query`: [Query](query.md)): *[Query](query.md)*

*Defined in [src/query.ts:137](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L137)*

or concatenates a new condition that is sufficient for an instance to satisfy, independant of the current Query. Has left-associativity as: (a And b) Or c

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`query` | [Query](query.md) | The 'sub-query' to concat to the existing query.  |

**Returns:** *[Query](query.md)*

___

###  orderBy

▸ **orderBy**(`fieldPath`: string): *[Query](query.md)*

*Defined in [src/query.ts:146](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L146)*

orderBy specify ascending order for the query results. On multiple calls, only the last one is considered.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fieldPath` | string | The field name to query on. Can be a hierarchical path.  |

**Returns:** *[Query](query.md)*

___

###  orderByDesc

▸ **orderByDesc**(`fieldPath`: string): *[Query](query.md)*

*Defined in [src/query.ts:155](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L155)*

orderByDesc specify descending order for the query results. On multiple calls, only the last one is considered.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fieldPath` | string | The field name to query on. Can be a hierarchical path.  |

**Returns:** *[Query](query.md)*

___

### `Static` where

▸ **where**(`fieldPath`: string): *[Criterion](criterion.md)*

*Defined in [src/query.ts:121](https://github.com/textileio/js-threads-client/blob/master/src/query.ts#L121)*

where starts to create a query condition for a field

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fieldPath` | string | The field name to query on. Can be a hierarchical path.  |

**Returns:** *[Criterion](criterion.md)*
