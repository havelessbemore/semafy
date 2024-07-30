[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / MultiUnlockError

# Class: MultiUnlockError

Represents an error that occurs when attempting to unlock multiple [BasicLockable](../interfaces/BasicLockable.md) objects simultaneously.

This error provides detailed information about the failure of unlocking operations, including specifics
about any errors that occurred. It ensures that any partial state due to errors can be adequately handled.

## Extends

- [`LockError`](LockError.md)

## Constructors

### new MultiUnlockError()

> **new MultiUnlockError**(`locks`, `numUnlocked`, `unlockErrors`, `message`?): [`MultiUnlockError`](MultiUnlockError.md)

#### Parameters

• **locks**: [`BasicLockable`](../interfaces/BasicLockable.md)[]

The array of all lockable objects that were part of the operation.

• **numUnlocked**: `number`

The number of unlocks successfully updated before failure.

• **unlockErrors**: [`number`, `unknown`][] = `[]`

An array of [index, error] pairs that contain the index of the lock in
the `locks` array and the error that occurred while attempting to unlock it. Useful for
debugging unexpected issues during unlocking.

• **message?**: `string`

An optional custom error message that describes the error.

#### Returns

[`MultiUnlockError`](MultiUnlockError.md)

#### Overrides

[`LockError`](LockError.md).[`constructor`](LockError.md#constructors)

#### Defined in

[src/errors/multiUnlockError.ts:21](https://github.com/havelessbemore/semafy/blob/ed2c4022daf1bce6090ddce7f0fb37904e05ad7c/src/errors/multiUnlockError.ts#L21)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

[`LockError`](LockError.md).[`cause`](LockError.md#cause)

#### Defined in

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### locks

> **locks**: [`BasicLockable`](../interfaces/BasicLockable.md)[]

The array of all lockable objects that were part of the operation.

#### Defined in

[src/errors/multiUnlockError.ts:22](https://github.com/havelessbemore/semafy/blob/ed2c4022daf1bce6090ddce7f0fb37904e05ad7c/src/errors/multiUnlockError.ts#L22)

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

### numUnlocked

> **numUnlocked**: `number`

The number of unlocks successfully updated before failure.

#### Defined in

[src/errors/multiUnlockError.ts:23](https://github.com/havelessbemore/semafy/blob/ed2c4022daf1bce6090ddce7f0fb37904e05ad7c/src/errors/multiUnlockError.ts#L23)

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
the `locks` array and the error that occurred while attempting to unlock it. Useful for
debugging unexpected issues during unlocking.

#### Defined in

[src/errors/multiUnlockError.ts:24](https://github.com/havelessbemore/semafy/blob/ed2c4022daf1bce6090ddce7f0fb37904e05ad7c/src/errors/multiUnlockError.ts#L24)

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

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

[`LockError`](LockError.md).[`stackTraceLimit`](LockError.md#stacktracelimit)

#### Defined in

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

#### Defined in

node\_modules/@types/node/globals.d.ts:21
