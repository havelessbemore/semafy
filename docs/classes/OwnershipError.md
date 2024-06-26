[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / OwnershipError

# Class: OwnershipError

Represents an ownership error originating from a lock.

## Extends

- [`LockError`](LockError.md)

## Constructors

### new OwnershipError()

> **new OwnershipError**(`message`?): [`OwnershipError`](OwnershipError.md)

#### Parameters

• **message?**: `string`

An optional custom error message.

#### Returns

[`OwnershipError`](OwnershipError.md)

#### Overrides

[`LockError`](LockError.md).[`constructor`](LockError.md#constructors)

#### Source

[src/errors/ownershipError.ts:11](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/errors/ownershipError.ts#L11)

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
