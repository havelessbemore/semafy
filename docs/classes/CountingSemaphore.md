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

[src/semaphores/countingSemaphore.ts:44](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L44)

### new CountingSemaphore()

> **new CountingSemaphore**(`sharedBuffer`, `byteOffset`?): [`CountingSemaphore`](CountingSemaphore.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the semaphore.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`CountingSemaphore`](CountingSemaphore.md)

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](CountingSemaphore.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](CountingSemaphore.md#bytelength).

#### Source

[src/semaphores/countingSemaphore.ts:54](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L54)

## Properties

### \_gate

> `private` **\_gate**: [`ConditionVariable`](ConditionVariable.md)

#### Source

[src/semaphores/countingSemaphore.ts:34](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L34)

***

### \_mem

> `private` **\_mem**: `Int32Array`

#### Source

[src/semaphores/countingSemaphore.ts:35](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L35)

***

### \_mutex

> `private` **\_mutex**: [`TimedLockable`](../interfaces/TimedLockable.md)

#### Source

[src/semaphores/countingSemaphore.ts:36](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L36)

***

### ByteLength

> `static` `readonly` **ByteLength**: `number`

The size in bytes of the semaphore.

#### Source

[src/semaphores/countingSemaphore.ts:27](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L27)

***

### Max

> `static` `readonly` **Max**: `2147483647` = `MAX_INT32_VALUE`

The maximum possible value of the internal counter

#### Source

[src/semaphores/countingSemaphore.ts:32](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L32)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Source

[src/semaphores/countingSemaphore.ts:91](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L91)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Source

[src/semaphores/countingSemaphore.ts:95](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L95)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Source

[src/semaphores/countingSemaphore.ts:99](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L99)

## Methods

### acquire()

> **acquire**(): `Promise`\<`void`\>

Acquires the semaphore, blocking until it is available.

#### Returns

`Promise`\<`void`\>

A promise that resolves when acquisition is successful.

#### Source

[src/semaphores/countingSemaphore.ts:108](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L108)

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

[src/semaphores/countingSemaphore.ts:194](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L194)

***

### tryAcquire()

> **tryAcquire**(): `Promise`\<`boolean`\>

Attempts to acquire the semaphore.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if successful, otherwise `false`.

#### Source

[src/semaphores/countingSemaphore.ts:125](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L125)

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

[src/semaphores/countingSemaphore.ts:147](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L147)

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

[src/semaphores/countingSemaphore.ts:159](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/semaphores/countingSemaphore.ts#L159)
