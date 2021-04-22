[semafy - v1.0.4](../README.md) / Semaphore

# Class: Semaphore

## Hierarchy

* **Semaphore**

  ↳ [*Mutex*](mutex.md)

## Table of contents

### Constructors

- [constructor](semaphore.md#constructor)

### Properties

- [semaphore](semaphore.md#semaphore)

### Accessors

- [value](semaphore.md#value)

### Methods

- [clear](semaphore.md#clear)
- [tryWait](semaphore.md#trywait)
- [wait](semaphore.md#wait)
- [waitFor](semaphore.md#waitfor)

## Constructors

### constructor

\+ **new Semaphore**(`value`: *number*): [*Semaphore*](semaphore.md)

Creates a semaphore object

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | *number* | The max number of calls allowed to acquire the semaphore concurrently |

**Returns:** [*Semaphore*](semaphore.md)

Defined in: [src/semaphore.ts:19](https://github.com/havelessbemore/semafy/blob/c0263a3/src/semaphore.ts#L19)

\+ **new Semaphore**(`semaphore`: [*RawSemaphore*](rawsemaphore.md)): [*Semaphore*](semaphore.md)

Creates a semaphore object

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `semaphore` | [*RawSemaphore*](rawsemaphore.md) | The underlying [RawSemaphore](rawsemaphore.md) |

**Returns:** [*Semaphore*](semaphore.md)

Defined in: [src/semaphore.ts:26](https://github.com/havelessbemore/semafy/blob/c0263a3/src/semaphore.ts#L26)

## Properties

### semaphore

• `Protected` **semaphore**: [*RawSemaphore*](rawsemaphore.md)

The underlying raw semaphore

Defined in: [src/semaphore.ts:19](https://github.com/havelessbemore/semafy/blob/c0263a3/src/semaphore.ts#L19)

## Accessors

### value

• get **value**(): *number*

The number of calls allowed to acquire the semaphore concurrently

**Returns:** *number*

Defined in: [src/semaphore.ts:63](https://github.com/havelessbemore/semafy/blob/c0263a3/src/semaphore.ts#L63)

## Methods

### clear

▸ **clear**(): *void*

Rejects all calls waiting for the semaphore. Rejected calls receive a [SemaphoreError](semaphoreerror.md)

**Returns:** *void*

Defined in: [src/semaphore.ts:44](https://github.com/havelessbemore/semafy/blob/c0263a3/src/semaphore.ts#L44)

___

### tryWait

▸ **tryWait**(): *undefined* \| [*SemaphoreLock*](semaphorelock.md)

Try to acquire the semaphore if immediately available.

**Returns:** *undefined* \| [*SemaphoreLock*](semaphorelock.md)

[SemaphoreLock](semaphorelock.md) and decrements the semaphore's [value](semaphore.md#value) if the semaphore could be acquired.
Otherwise, returns `undefined`

Defined in: [src/semaphore.ts:54](https://github.com/havelessbemore/semafy/blob/c0263a3/src/semaphore.ts#L54)

___

### wait

▸ **wait**(`callback?`: ``null``): *Promise*<[*SemaphoreLock*](semaphorelock.md)\>

Acquire (lock) the semaphore.

If the semaphore's [value](semaphore.md#value) is greater than zero, then the semaphore is acquired
and its [value](semaphore.md#value) is decremented. Otherwise, the call blocks until the semaphore
can be acquired or the call is rejected.

#### Parameters:

| Name | Type |
| :------ | :------ |
| `callback?` | ``null`` |

**Returns:** *Promise*<[*SemaphoreLock*](semaphorelock.md)\>

Defined in: [src/semaphore.ts:74](https://github.com/havelessbemore/semafy/blob/c0263a3/src/semaphore.ts#L74)

▸ **wait**(`callback`: [*SemaphoreCallback*](../interfaces/semaphorecallback.md)): *void*

Acquire (lock) the semaphore.

If the semaphore's [value](semaphore.md#value) is greater than zero, then the semaphore is acquired
and its [value](semaphore.md#value) is decremented. Otherwise, the call blocks until the semaphore
can be acquired or the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [*SemaphoreCallback*](../interfaces/semaphorecallback.md) | A function to call once acquisition is successful or rejected |

**Returns:** *void*

Defined in: [src/semaphore.ts:84](https://github.com/havelessbemore/semafy/blob/c0263a3/src/semaphore.ts#L84)

___

### waitFor

▸ **waitFor**(`ms?`: ``null`` \| *number*, `callback?`: ``null``): *Promise*<[*SemaphoreLock*](semaphorelock.md)\>

Acquire (lock) the semaphore within a time limit.

It's the same as [wait()](semaphore.md#wait) except that there's a limit on the amount of time a call
can block to acquire the semaphore. If the timeout expires before the semaphore is
acquired, then the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms?` | ``null`` \| *number* | The maximum time (in milliseconds) to wait to acquire the semaphore. Defaults to 0 |
| `callback?` | ``null`` | - |

**Returns:** *Promise*<[*SemaphoreLock*](semaphorelock.md)\>

Defined in: [src/semaphore.ts:108](https://github.com/havelessbemore/semafy/blob/c0263a3/src/semaphore.ts#L108)

▸ **waitFor**(`ms`: *undefined* \| ``null`` \| *number*, `callback`: [*SemaphoreCallback*](../interfaces/semaphorecallback.md)): *void*

Acquire (lock) the semaphore within a time limit.

It's the same as [wait()](semaphore.md#wait) except that there's a limit on the amount of time a call
can block to acquire the semaphore. If the timeout expires before the semaphore is
acquired, then the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | *undefined* \| ``null`` \| *number* | The maximum time (in milliseconds) to wait to acquire the semaphore. Defaults to 0 |
| `callback` | [*SemaphoreCallback*](../interfaces/semaphorecallback.md) | A function to call once acquisition is successful or rejected |

**Returns:** *void*

Defined in: [src/semaphore.ts:119](https://github.com/havelessbemore/semafy/blob/c0263a3/src/semaphore.ts#L119)
