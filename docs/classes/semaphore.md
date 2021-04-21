[semafy - v1.0.1](../README.md) / [Exports](../modules.md) / Semaphore

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

Defined in: [src/semaphore.ts:47](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L47)

\+ **new Semaphore**(`semaphore`: [*RawSemaphore*](rawsemaphore.md)): [*Semaphore*](semaphore.md)

Creates a semaphore object

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `semaphore` | [*RawSemaphore*](rawsemaphore.md) | The underlying [RawSemaphore](rawsemaphore.md) |

**Returns:** [*Semaphore*](semaphore.md)

Defined in: [src/semaphore.ts:54](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L54)

## Properties

### semaphore

• **semaphore**: [*RawSemaphore*](rawsemaphore.md)

The underlying raw semaphore

Defined in: [src/semaphore.ts:47](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L47)

## Accessors

### value

• get **value**(): *number*

The number of calls allowed to acquire the semaphore concurrently

**Returns:** *number*

Defined in: [src/semaphore.ts:91](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L91)

## Methods

### clear

▸ **clear**(): *void*

Rejects all calls waiting for the semaphore. Rejected calls receive a [SemaphoreError](semaphoreerror.md)

**Returns:** *void*

Defined in: [src/semaphore.ts:72](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L72)

___

### tryWait

▸ **tryWait**(): *undefined* \| [*SemaphoreLock*](semaphorelock.md)

Try to acquire the semaphore if immediately available.

**Returns:** *undefined* \| [*SemaphoreLock*](semaphorelock.md)

[SemaphoreLock](semaphorelock.md) and decrements the semaphore's [value](semaphore.md#value) if the semaphore could be acquired.
Otherwise, returns `undefined`

Defined in: [src/semaphore.ts:82](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L82)

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

Defined in: [src/semaphore.ts:102](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L102)

▸ **wait**(`callback`: [*SafeSemaphoreCallback*](../interfaces/safesemaphorecallback.md)): *void*

Acquire (lock) the semaphore.

If the semaphore's [value](semaphore.md#value) is greater than zero, then the semaphore is acquired
and its [value](semaphore.md#value) is decremented. Otherwise, the call blocks until the semaphore
can be acquired or the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [*SafeSemaphoreCallback*](../interfaces/safesemaphorecallback.md) | A function to call once acquisition is successful or rejected |

**Returns:** *void*

Defined in: [src/semaphore.ts:112](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L112)

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

Defined in: [src/semaphore.ts:136](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L136)

▸ **waitFor**(`ms`: *undefined* \| ``null`` \| *number*, `callback`: [*SafeSemaphoreCallback*](../interfaces/safesemaphorecallback.md)): *void*

Acquire (lock) the semaphore within a time limit.

It's the same as [wait()](semaphore.md#wait) except that there's a limit on the amount of time a call
can block to acquire the semaphore. If the timeout expires before the semaphore is
acquired, then the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | *undefined* \| ``null`` \| *number* | The maximum time (in milliseconds) to wait to acquire the semaphore. Defaults to 0 |
| `callback` | [*SafeSemaphoreCallback*](../interfaces/safesemaphorecallback.md) | A function to call once acquisition is successful or rejected |

**Returns:** *void*

Defined in: [src/semaphore.ts:147](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L147)
