[semafy - v1.0.6](../README.md) / RawSemaphore

# Class: RawSemaphore

Related to an [unnamed POSIX semaphore](https://man7.org/linux/man-pages/man7/sem_overview.7.html)

## Table of contents

### Constructors

- [constructor](rawsemaphore.md#constructor)

### Properties

- [count](rawsemaphore.md#count)
- [queue](rawsemaphore.md#queue)

### Accessors

- [value](rawsemaphore.md#value)

### Methods

- [clear](rawsemaphore.md#clear)
- [post](rawsemaphore.md#post)
- [tryWait](rawsemaphore.md#trywait)
- [update](rawsemaphore.md#update)
- [wait](rawsemaphore.md#wait)
- [waitFor](rawsemaphore.md#waitfor)

## Constructors

### constructor

\+ **new RawSemaphore**(`value`: *number*, `queue?`: [*Queue*](../interfaces/queue.md)<[*RawSemaphoreCallback*](../interfaces/rawsemaphorecallback.md)\>): [*RawSemaphore*](rawsemaphore.md)

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | *number* | The initial number of calls allowed to acquire the semaphore concurrently |
| `queue` | [*Queue*](../interfaces/queue.md)<[*RawSemaphoreCallback*](../interfaces/rawsemaphorecallback.md)\> | The underlying queue to keep track of pending calls |

**Returns:** [*RawSemaphore*](rawsemaphore.md)

Defined in: [src/rawSemaphore.ts:25](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L25)

## Properties

### count

• `Protected` **count**: *number*

The number of calls allowed to acquire the semaphore concurrently

Defined in: [src/rawSemaphore.ts:21](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L21)

___

### queue

• `Protected` **queue**: [*Queue*](../interfaces/queue.md)<[*RawSemaphoreCallback*](../interfaces/rawsemaphorecallback.md)\>

The underlying queue to keep track of pending calls

Defined in: [src/rawSemaphore.ts:25](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L25)

## Accessors

### value

• get **value**(): *number*

The number of calls allowed to acquire the semaphore concurrently

**Returns:** *number*

Defined in: [src/rawSemaphore.ts:71](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L71)

## Methods

### clear

▸ **clear**(): *void*

Rejects all calls waiting for the semaphore. Rejected calls receive a [SemaphoreError](semaphoreerror.md)

**Returns:** *void*

Defined in: [src/rawSemaphore.ts:39](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L39)

___

### post

▸ **post**(): *void*

Increment the semaphore's [value](rawsemaphore.md#value) by 1

**Returns:** *void*

Defined in: [src/rawSemaphore.ts:48](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L48)

___

### tryWait

▸ **tryWait**(): *boolean*

Try to acquire the semaphore if immediately available.

**Returns:** *boolean*

`true` and decrements the semaphore's [value](rawsemaphore.md#value) if the semaphore could be acquired.

Otherwise, returns `false`

Defined in: [src/rawSemaphore.ts:60](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L60)

___

### update

▸ `Protected`**update**(): *void*

If the semaphore's value is above 0 and there
are calls waiting, remove and unblock the head.

**Returns:** *void*

Defined in: [src/rawSemaphore.ts:156](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L156)

___

### wait

▸ **wait**(`callback?`: ``null``): *Promise*<[*RawSemaphore*](rawsemaphore.md)\>

Acquire (lock) the semaphore.

If the semaphore's [value](rawsemaphore.md#value) is greater than zero, then the semaphore is acquired
and its [value](rawsemaphore.md#value) is decremented. Otherwise, the call blocks until the semaphore
can be acquired or the call is rejected.

#### Parameters:

| Name | Type |
| :------ | :------ |
| `callback?` | ``null`` |

**Returns:** *Promise*<[*RawSemaphore*](rawsemaphore.md)\>

Defined in: [src/rawSemaphore.ts:82](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L82)

▸ **wait**(`callback`: [*RawSemaphoreCallback*](../interfaces/rawsemaphorecallback.md)): *void*

Acquire (lock) the semaphore.

If the semaphore's [value](rawsemaphore.md#value) is greater than zero, then the semaphore is acquired
and its [value](rawsemaphore.md#value) is decremented. Otherwise, the call blocks until the semaphore
can be acquired or the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | [*RawSemaphoreCallback*](../interfaces/rawsemaphorecallback.md) | A function to call acquisition is successful or rejected |

**Returns:** *void*

Defined in: [src/rawSemaphore.ts:92](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L92)

___

### waitFor

▸ **waitFor**(`ms?`: ``null`` \| *number*, `callback?`: ``null``): *Promise*<[*RawSemaphore*](rawsemaphore.md)\>

Acquire (lock) the semaphore within a time limit.

It's the same as [wait()](rawsemaphore.md#wait) except that there's a limit on the amount of time a call
can block to acquire the semaphore. If the timeout expires before the semaphore is
acquired, then the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms?` | ``null`` \| *number* | The maximum time (in milliseconds) to wait to acquire the semaphore. Defaults to 0 |
| `callback?` | ``null`` | - |

**Returns:** *Promise*<[*RawSemaphore*](rawsemaphore.md)\>

Defined in: [src/rawSemaphore.ts:115](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L115)

▸ **waitFor**(`ms`: *undefined* \| ``null`` \| *number*, `callback`: [*RawSemaphoreCallback*](../interfaces/rawsemaphorecallback.md)): *void*

Acquire (lock) the semaphore within a time limit.

It's the same as [wait()](rawsemaphore.md#wait) except that there's a limit on the amount of time a call
can block to acquire the semaphore. If the timeout expires before the semaphore is
acquired, then the call is rejected.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `ms` | *undefined* \| ``null`` \| *number* | The maximum time (in milliseconds) to wait to acquire the semaphore. Defaults to 0 |
| `callback` | [*RawSemaphoreCallback*](../interfaces/rawsemaphorecallback.md) | A function to call once acquisition is successful or rejected |

**Returns:** *void*

Defined in: [src/rawSemaphore.ts:126](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/rawSemaphore.ts#L126)
