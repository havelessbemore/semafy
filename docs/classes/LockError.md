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

#### Source

[src/errors/lockError.ts:10](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/errors/lockError.ts#L10)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### Inherited from

`Error.prepareStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Source

node\_modules/@types/node/globals.d.ts:30

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

#### Source

node\_modules/@types/node/globals.d.ts:21
