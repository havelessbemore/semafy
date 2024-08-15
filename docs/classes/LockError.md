[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / LockError

# Class: LockError

Represents a generic error originating from a lock.

## Extends

- `Error`

## Extended by

- [`MultiLockError`](MultiLockError.md)
- [`MultiUnlockError`](MultiUnlockError.md)
- [`OwnershipError`](OwnershipError.md)
- [`RelockError`](RelockError.md)

## Constructors

### new LockError()

> **new LockError**(`message`?): [`LockError`](LockError.md)

#### Parameters

• **message?**: `string`

An optional custom error message.

#### Returns

[`LockError`](LockError.md)

#### Overrides

`Error.constructor`

#### Defined in

[src/errors/lockError.ts:10](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/errors/lockError.ts#L10)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Defined in

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

#### Defined in

node\_modules/@types/node/globals.d.ts:31

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Defined in

node\_modules/@types/node/globals.d.ts:33

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Defined in

node\_modules/@types/node/globals.d.ts:24
