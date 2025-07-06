[**semafy**](../README.md)

***

[semafy](../globals.md) / CountingSemaphore

# Class: CountingSemaphore

Defined in: [src/semaphores/countingSemaphore.ts:23](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L23)

A counting semaphore based on shared memory and atomics, allowing for
cross-agent synchronization.

## Implements

- [`SharedResource`](../interfaces/SharedResource.md)

## Constructors

### Constructor

> **new CountingSemaphore**(`desired`): `CountingSemaphore`

Defined in: [src/semaphores/countingSemaphore.ts:44](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L44)

#### Parameters

##### desired

`number`

The initial value of the internal counter. Must be non-negative and
not exceed [CountingSemaphore.Max](#max).

#### Returns

`CountingSemaphore`

#### Throws

A RangeError if `desired` is negative or exceeds [CountingSemaphore.Max](#max).

### Constructor

> **new CountingSemaphore**(`sharedBuffer`, `byteOffset?`): `CountingSemaphore`

Defined in: [src/semaphores/countingSemaphore.ts:54](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L54)

#### Parameters

##### sharedBuffer

`SharedArrayBuffer`

The SharedArrayBuffer that backs the semaphore.

##### byteOffset?

`number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

`CountingSemaphore`

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](#bytelength).

## Properties

### ByteLength

> `readonly` `static` **ByteLength**: `number`

Defined in: [src/semaphores/countingSemaphore.ts:27](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L27)

The size in bytes of the semaphore.

***

### Max

> `readonly` `static` **Max**: `2147483647` = `MAX_INT32_VALUE`

Defined in: [src/semaphores/countingSemaphore.ts:32](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L32)

The maximum possible value of the internal counter

## Accessors

### buffer

#### Get Signature

> **get** **buffer**(): `SharedArrayBuffer`

Defined in: [src/semaphores/countingSemaphore.ts:91](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L91)

The underlying SharedArrayBuffer
and primary storage for shared data.

##### Returns

`SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`buffer`](../interfaces/SharedResource.md#buffer)

***

### byteLength

#### Get Signature

> **get** **byteLength**(): `number`

Defined in: [src/semaphores/countingSemaphore.ts:95](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L95)

The total length in bytes being used from the SharedArrayBuffer.

##### Returns

`number`

The total length in bytes being used from the SharedArrayBuffer.

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteLength`](../interfaces/SharedResource.md#bytelength)

***

### byteOffset

#### Get Signature

> **get** **byteOffset**(): `number`

Defined in: [src/semaphores/countingSemaphore.ts:99](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L99)

The byte offset within the SharedArrayBuffer where data begins.

##### Returns

`number`

The byte offset within the SharedArrayBuffer where data begins.

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteOffset`](../interfaces/SharedResource.md#byteoffset)

## Methods

### acquire()

> **acquire**(): `Promise`\<`void`\>

Defined in: [src/semaphores/countingSemaphore.ts:108](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L108)

Acquires the semaphore, blocking until it is available.

#### Returns

`Promise`\<`void`\>

A promise that resolves when acquisition is successful.

***

### release()

> **release**(`count`): `Promise`\<`void`\>

Defined in: [src/semaphores/countingSemaphore.ts:194](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L194)

Releases a specified number of units back to the semaphore.

#### Parameters

##### count

`number` = `1`

The number of units to release. Defaults to 1.

#### Returns

`Promise`\<`void`\>

#### Throws

If `count` is negative or would cause the semaphore to overflow.

***

### tryAcquire()

> **tryAcquire**(): `Promise`\<`boolean`\>

Defined in: [src/semaphores/countingSemaphore.ts:125](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L125)

Attempts to acquire the semaphore.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if successful, otherwise `false`.

***

### tryAcquireFor()

> **tryAcquireFor**(`timeout`): `Promise`\<`boolean`\>

Defined in: [src/semaphores/countingSemaphore.ts:147](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L147)

Attempts to acquire the semaphore, blocking until either
success or the specified timeout elapses.

#### Parameters

##### timeout

`number`

The maximum duration in milliseconds to wait.

#### Returns

`Promise`\<`boolean`\>

A promise resolving to `true` if successful, otherwise `false`.

***

### tryAcquireUntil()

> **tryAcquireUntil**(`timestamp`): `Promise`\<`boolean`\>

Defined in: [src/semaphores/countingSemaphore.ts:159](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/semaphores/countingSemaphore.ts#L159)

Attempts to acquire the lock, blocking until either
the lock is acquired or the specified point in time is reached.

#### Parameters

##### timestamp

`number`

The absolute time in milliseconds to wait until.

#### Returns

`Promise`\<`boolean`\>

A promise resolved to `true` if succesful, otherwise `false`.
