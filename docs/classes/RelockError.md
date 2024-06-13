[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / RelockError

# Class: RelockError

Represents an error relocking a lock.

## Extends

- [`LockError`](LockError.md)

## Constructors

### new RelockError()

> **new RelockError**(`message`?): [`RelockError`](RelockError.md)

#### Parameters

• **message?**: `string`

An optional custom error message.

#### Returns

[`RelockError`](RelockError.md)

#### Overrides

[`LockError`](LockError.md).[`constructor`](LockError.md#constructors)

#### Source

[src/errors/relockError.ts:11](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/errors/relockError.ts#L11)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`LockError`](LockError.md).[`cause`](LockError.md#cause)

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

[`LockError`](LockError.md).[`message`](LockError.md#message)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`LockError`](LockError.md).[`name`](LockError.md#name)

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`LockError`](LockError.md).[`stack`](LockError.md#stack)

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

[`LockError`](LockError.md).[`prepareStackTrace`](LockError.md#preparestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`LockError`](LockError.md).[`stackTraceLimit`](LockError.md#stacktracelimit)

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

[`LockError`](LockError.md).[`captureStackTrace`](LockError.md#capturestacktrace)

#### Source

node\_modules/@types/node/globals.d.ts:21
