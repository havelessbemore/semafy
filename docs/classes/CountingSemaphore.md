[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / CountingSemaphore

# Class: CountingSemaphore

A counting semaphore based on shared memory and atomics, allowing for
cross-agent synchronization.

## Implements

- [`SharedResource`](../interfaces/SharedResource.md)

## Constructors

### new CountingSemaphore()

> **new CountingSemaphore**(`desired`): [`CountingSemaphore`](CountingSemaphore.md)

#### Parameters

• **desired**: `number`

The initial value of the internal counter. Must be non-negative and
not exceed [CountingSemaphore.Max](CountingSemaphore.md#max).

#### Returns

[`CountingSemaphore`](CountingSemaphore.md)

#### Throws

A RangeError if `desired` is negative or exceeds [CountingSemaphore.Max](CountingSemaphore.md#max).

#### Source

[src/semaphores/countingSemaphore.ts:39](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L39)

### new CountingSemaphore()

> **new CountingSemaphore**(`sharedBuffer`, `byteOffset`?): [`CountingSemaphore`](CountingSemaphore.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The shared buffer that backs the semaphore.

• **byteOffset?**: `number`

The byte offset within the shared buffer. Defaults to `0`.

#### Returns

[`CountingSemaphore`](CountingSemaphore.md)

#### Source

[src/semaphores/countingSemaphore.ts:44](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L44)

## Properties

### \_gate

> `private` **\_gate**: [`ConditionVariable`](ConditionVariable.md)

#### Source

[src/semaphores/countingSemaphore.ts:29](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L29)

***

### \_mem

> `private` **\_mem**: `Int32Array`

#### Source

[src/semaphores/countingSemaphore.ts:30](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L30)

***

### \_mutex

> `private` **\_mutex**: [`TimedLockable`](../interfaces/TimedLockable.md)

#### Source

[src/semaphores/countingSemaphore.ts:31](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L31)

***

### Max

> `static` `readonly` **Max**: `2147483647` = `MAX_INT32_VALUE`

The maximum possible value of the internal counter

#### Source

[src/semaphores/countingSemaphore.ts:27](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L27)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Source

[src/semaphores/countingSemaphore.ts:81](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L81)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Source

[src/semaphores/countingSemaphore.ts:85](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L85)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Source

[src/semaphores/countingSemaphore.ts:89](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L89)

## Methods

### acquire()

> **acquire**(): `Promise`\<`void`\>

Acquires the semaphore, blocking until it is available.

#### Returns

`Promise`\<`void`\>

A promise that resolves when acquisition is successful.

#### Source

[src/semaphores/countingSemaphore.ts:98](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L98)

***

### release()

> **release**(`count`): `Promise`\<`void`\>

Releases a specified number of units back to the semaphore.

#### Parameters

• **count**: `number`= `1`

The number of units to release. Defaults to 1.

#### Returns

`Promise`\<`void`\>

#### Throws

If `count` is negative or would cause the semaphore to overflow.

#### Source

[src/semaphores/countingSemaphore.ts:184](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L184)

***

### tryAcquire()

> **tryAcquire**(): `Promise`\<`boolean`\>

Attempts to acquire the semaphore.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if successful, otherwise `false`.

#### Source

[src/semaphores/countingSemaphore.ts:115](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L115)

***

### tryAcquireFor()

> **tryAcquireFor**(`timeout`): `Promise`\<`boolean`\>

Attempts to acquire the semaphore, blocking until either
success or the specified timeout elapses.

#### Parameters

• **timeout**: `number`

The maximum duration in milliseconds to wait.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if successful, otherwise `false`.

#### Source

[src/semaphores/countingSemaphore.ts:137](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L137)

***

### tryAcquireUntil()

> **tryAcquireUntil**(`timestamp`): `Promise`\<`boolean`\>

Attempts to acquire the lock, blocking until either
the lock is acquired or the specified point in time is reached.

#### Parameters

• **timestamp**: `number`

The absolute time in milliseconds to wait until.

#### Returns

`Promise`\<`boolean`\>

A promise resolved to `true` if succesful, otherwise `false`.

#### Source

[src/semaphores/countingSemaphore.ts:149](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/semaphores/countingSemaphore.ts#L149)
