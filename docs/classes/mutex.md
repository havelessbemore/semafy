[semafy - v1.0.1](../README.md) / [Exports](../modules.md) / Mutex

# Class: Mutex

A convenience class for defining a binary [Semaphore](semaphore.md) (aka `new Semaphore(1);`).

Has the same methods as [Semaphore](semaphore.md)

## Hierarchy

* [*Semaphore*](semaphore.md)

  ↳ **Mutex**

## Table of contents

### Constructors

- [constructor](mutex.md#constructor)

### Properties

- [semaphore](mutex.md#semaphore)

### Accessors

- [value](mutex.md#value)

### Methods

- [clear](mutex.md#clear)
- [tryWait](mutex.md#trywait)
- [wait](mutex.md#wait)
- [waitFor](mutex.md#waitfor)

## Constructors

### constructor

\+ **new Mutex**(): [*Mutex*](mutex.md)

**Returns:** [*Mutex*](mutex.md)

Overrides: [Semaphore](semaphore.md)

Defined in: [src/mutex.ts:8](https://github.com/havelessbemore/semafy/blob/33d1ef9/src/mutex.ts#L8)

## Properties

### semaphore

• **semaphore**: [*RawSemaphore*](rawsemaphore.md)

The underlying raw semaphore

Inherited from: [Semaphore](semaphore.md).[semaphore](semaphore.md#semaphore)

Defined in: [src/semaphore.ts:19](https://github.com/havelessbemore/semafy/blob/33d1ef9/src/semaphore.ts#L19)

## Accessors

### value

• get **value**(): *number*

The number of calls allowed to acquire the semaphore concurrently

**Returns:** *number*

Defined in: [src/semaphore.ts:63](https://github.com/havelessbemore/semafy/blob/33d1ef9/src/semaphore.ts#L63)

## Methods

### clear

▸ **clear**(): *void*

Rejects all calls waiting for the semaphore. Rejected calls receive a [SemaphoreError](semaphoreerror.md)

**Returns:** *void*

Inherited from: [Semaphore](semaphore.md)

Defined in: [src/semaphore.ts:44](https://github.com/havelessbemore/semafy/blob/33d1ef9/src/semaphore.ts#L44)

___

### tryWait

▸ **tryWait**(): *undefined* \| [*SemaphoreLock*](semaphorelock.md)

Try to acquire the semaphore if immediately available.

**Returns:** *undefined* \| [*SemaphoreLock*](semaphorelock.md)

[SemaphoreLock](semaphorelock.md) and decrements the semaphore's [value](mutex.md#value) if the semaphore could be acquired.
Otherwise, returns `undefined`

Inherited from: [Semaphore](semaphore.md)

Defined in: [src/semaphore.ts:54](https://github.com/havelessbemore/semafy/blob/33d1ef9/src/semaphore.ts#L54)

___

### wait

▸ **wait**(`callback?`: ``null``): *Promise*<[*SemaphoreLock*](semaphorelock.md)\>

Acquire (lock) the semaphore.

If the semaphore's [value](mutex.md#value) is greater than zero, then the semaphore is acquired
and its [value](mutex.md#value) is decremented. Otherwise, the call blocks until the semaphore
can be acquired or the call is rejected.

#### Parameters:

| Name | Type |
| :------ | :------ |
| `callback?` | ``null`` |

**Returns:** *Promise*<[*SemaphoreLock*](semaphorelock.md)\>

Inherited from: [Semaphore](semaphore.md)

Defined in: [src/semaphore.ts:74](https://github.com/havelessbemore/semafy/blob/33d1ef9/src/semaphore.ts#L74)

▸ **wait**(`callback`: [*SemaphoreCallback*](../interfaces/semaphorecallback.md)): *void*

Acquire (lock) the semaphore.

If the semaphore's [value](mutex.md#value) is greater than zero, then the semaphore is acquired
and its [value](mutex.md#value) is decremented. Otherwise, the call blocks until the semaphore
can be acquired or the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [*SemaphoreCallback*](../interfaces/semaphorecallback.md) | A function to call once acquisition is successful or rejected |

**Returns:** *void*

Inherited from: [Semaphore](semaphore.md)

Defined in: [src/semaphore.ts:84](https://github.com/havelessbemore/semafy/blob/33d1ef9/src/semaphore.ts#L84)

___

### waitFor

▸ **waitFor**(`ms?`: ``null`` \| *number*, `callback?`: ``null``): *Promise*<[*SemaphoreLock*](semaphorelock.md)\>

Acquire (lock) the semaphore within a time limit.

It's the same as [wait()](mutex.md#wait) except that there's a limit on the amount of time a call
can block to acquire the semaphore. If the timeout expires before the semaphore is
acquired, then the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms?` | ``null`` \| *number* | The maximum time (in milliseconds) to wait to acquire the semaphore. Defaults to 0 |
| `callback?` | ``null`` | - |

**Returns:** *Promise*<[*SemaphoreLock*](semaphorelock.md)\>

Inherited from: [Semaphore](semaphore.md)

Defined in: [src/semaphore.ts:108](https://github.com/havelessbemore/semafy/blob/33d1ef9/src/semaphore.ts#L108)

▸ **waitFor**(`ms`: *undefined* \| ``null`` \| *number*, `callback`: [*SemaphoreCallback*](../interfaces/semaphorecallback.md)): *void*

Acquire (lock) the semaphore within a time limit.

It's the same as [wait()](mutex.md#wait) except that there's a limit on the amount of time a call
can block to acquire the semaphore. If the timeout expires before the semaphore is
acquired, then the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | *undefined* \| ``null`` \| *number* | The maximum time (in milliseconds) to wait to acquire the semaphore. Defaults to 0 |
| `callback` | [*SemaphoreCallback*](../interfaces/semaphorecallback.md) | A function to call once acquisition is successful or rejected |

**Returns:** *void*

Inherited from: [Semaphore](semaphore.md)

Defined in: [src/semaphore.ts:119](https://github.com/havelessbemore/semafy/blob/33d1ef9/src/semaphore.ts#L119)
