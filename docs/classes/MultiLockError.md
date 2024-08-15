[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / MultiLockError

# Class: MultiLockError

Represents an error that occurs when attempting to lock multiple [BasicLockable](../interfaces/BasicLockable.md) objects simultaneously.

This error provides detailed information about the failure of locking operations, including specifics
about any errors that occurred. It ensures that any partial state due to errors can be adequately handled.

## Extends

- [`LockError`](LockError.md)

## Constructors

### new MultiLockError()

> **new MultiLockError**(`locks`, `numLocked`, `lockErrors`, `unlockErrors`, `message`?): [`MultiLockError`](MultiLockError.md)

#### Parameters

• **locks**: [`BasicLockable`](../interfaces/BasicLockable.md)[]

The array of all lockable objects that were part of the operation.

• **numLocked**: `number`

The number of locks successfully updated before failure.

• **lockErrors**: [`number`, `unknown`][] = `[]`

An array of [index, error] pairs that contain the index of the lock in
the `locks` array and the error that occurred while attempting to lock it. Useful for
understanding why lock acquisition failed.

• **unlockErrors**: [`number`, `unknown`][] = `[]`

An array of [index, error] pairs that contain the index of the lock in
the `locks` array and the error that occurred while attempting rollback. Useful for
debugging unexpected issues during unlocking.

• **message?**: `string`

An optional custom error message that describes the error.

#### Returns

[`MultiLockError`](MultiLockError.md)

#### Overrides

[`LockError`](LockError.md).[`constructor`](LockError.md#constructors)

#### Defined in

[src/errors/multiLockError.ts:24](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/errors/multiLockError.ts#L24)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`LockError`](LockError.md).[`cause`](LockError.md#cause)

#### Defined in

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### lockErrors

> **lockErrors**: [`number`, `unknown`][] = `[]`

An array of [index, error] pairs that contain the index of the lock in
the `locks` array and the error that occurred while attempting to lock it. Useful for
understanding why lock acquisition failed.

#### Defined in

[src/errors/multiLockError.ts:27](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/errors/multiLockError.ts#L27)

***

### locks

> **locks**: [`BasicLockable`](../interfaces/BasicLockable.md)[]

The array of all lockable objects that were part of the operation.

#### Defined in

[src/errors/multiLockError.ts:25](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/errors/multiLockError.ts#L25)

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

### numLocked

> **numLocked**: `number`

The number of locks successfully updated before failure.

#### Defined in

[src/errors/multiLockError.ts:26](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/errors/multiLockError.ts#L26)

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

[`LockError`](LockError.md).[`stack`](LockError.md#stack)

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### unlockErrors

> **unlockErrors**: [`number`, `unknown`][] = `[]`

An array of [index, error] pairs that contain the index of the lock in
the `locks` array and the error that occurred while attempting rollback. Useful for
debugging unexpected issues during unlocking.

#### Defined in

[src/errors/multiLockError.ts:28](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/errors/multiLockError.ts#L28)

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

node\_modules/@types/node/globals.d.ts:31

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`LockError`](LockError.md).[`stackTraceLimit`](LockError.md#stacktracelimit)

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

[`LockError`](LockError.md).[`captureStackTrace`](LockError.md#capturestacktrace)

#### Defined in

node\_modules/@types/node/globals.d.ts:24
