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

#### Defined in

[src/errors/relockError.ts:11](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/errors/relockError.ts#L11)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`LockError`](LockError.md).[`cause`](LockError.md#cause)

#### Defined in

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### message

> **message**: `string`

#### Inherited from

[`LockError`](LockError.md).[`message`](LockError.md#message)

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

[`LockError`](LockError.md).[`name`](LockError.md#name)

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`LockError`](LockError.md).[`stack`](LockError.md#stack)

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

[`LockError`](LockError.md).[`prepareStackTrace`](LockError.md#preparestacktrace)

#### Defined in

node\_modules/@types/node/globals.d.ts:29

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`LockError`](LockError.md).[`stackTraceLimit`](LockError.md#stacktracelimit)

#### Defined in

node\_modules/@types/node/globals.d.ts:31

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

#### Defined in

node\_modules/@types/node/globals.d.ts:22
