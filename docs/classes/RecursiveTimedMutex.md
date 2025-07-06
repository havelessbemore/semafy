[**semafy**](../README.md)

***

[semafy](../globals.md) / RecursiveTimedMutex

# Class: RecursiveTimedMutex

Defined in: [src/mutexes/recursiveTimedMutex.ts:36](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveTimedMutex.ts#L36)

Provides synchronization across agents (main thread and workers)
to allow exclusive recursive access to shared resources / blocks of code.

A mutex is owned once an agent successfully locks it.
During ownership, the agent may acquire additional locks from the
mutex. Ownership ends when the agent releases all aquired locks.

While owned, any other agents attempting to lock the mutex will
block (or receive `false` from `tryLock` methods). When unlocked,
any blocked agent will have the chance to acquire owernship.

The maximum number of times a mutex can be locked recursively
is defined by [RecursiveTimedMutex.Max](RecursiveMutex.md#max). Once reached, attempts
for additional locks will throw an error, and calls to `tryLock` methods
will return `false`.

Behavior is undefined if:
   - The mutex is destroyed while being owned.
   - The agent is terminated while owning the mutex.
   - The mutex's shared memory location is modified externally.

Timeout precision for time-based methods may vary due to system load
and inherent limitations of JavaScript timing. Developers should
consider this possible variability in their applications.

## Extends

- [`RecursiveMutex`](RecursiveMutex.md)

## Implements

- [`TimedLockable`](../interfaces/TimedLockable.md)
- [`SyncTimedLockable`](../interfaces/SyncTimedLockable.md)

## Constructors

### Constructor

> **new RecursiveTimedMutex**(): `RecursiveTimedMutex`

Defined in: [src/mutexes/recursiveMutex.ts:60](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L60)

#### Returns

`RecursiveTimedMutex`

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`constructor`](RecursiveMutex.md#constructor)

### Constructor

> **new RecursiveTimedMutex**(`sharedBuffer`, `byteOffset?`): `RecursiveTimedMutex`

Defined in: [src/mutexes/recursiveMutex.ts:70](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L70)

#### Parameters

##### sharedBuffer

`SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

##### byteOffset?

`number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

`RecursiveTimedMutex`

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](RecursiveMutex.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](RecursiveMutex.md#bytelength).

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`constructor`](RecursiveMutex.md#constructor)

## Properties

### \_depth

> `protected` **\_depth**: `number`

Defined in: [src/mutexes/recursiveMutex.ts:53](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L53)

The number of locks acquired by the agent.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`_depth`](RecursiveMutex.md#_depth)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

Defined in: [src/mutexes/recursiveMutex.ts:58](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L58)

The shared atomic memory for the mutex.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`_mem`](RecursiveMutex.md#_mem)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number` = `Int32Array.BYTES_PER_ELEMENT`

Defined in: [src/mutexes/recursiveMutex.ts:43](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L43)

The size in bytes of the mutex.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`ByteLength`](RecursiveMutex.md#bytelength)

***

### Max

> `readonly` `static` **Max**: `2147483647` = `MAX_INT32_VALUE`

Defined in: [src/mutexes/recursiveMutex.ts:48](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L48)

The maximum levels of recursive ownership.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`Max`](RecursiveMutex.md#max)

## Accessors

### buffer

#### Get Signature

> **get** **buffer**(): `SharedArrayBuffer`

Defined in: [src/mutexes/recursiveMutex.ts:83](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L83)

The underlying SharedArrayBuffer
and primary storage for shared data.

##### Returns

`SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`buffer`](RecursiveMutex.md#buffer)

***

### byteLength

#### Get Signature

> **get** **byteLength**(): `number`

Defined in: [src/mutexes/recursiveMutex.ts:87](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L87)

The total length in bytes being used from the SharedArrayBuffer.

##### Returns

`number`

The total length in bytes being used from the SharedArrayBuffer.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`byteLength`](RecursiveMutex.md#bytelength-1)

***

### byteOffset

#### Get Signature

> **get** **byteOffset**(): `number`

Defined in: [src/mutexes/recursiveMutex.ts:91](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L91)

The byte offset within the SharedArrayBuffer where data begins.

##### Returns

`number`

The byte offset within the SharedArrayBuffer where data begins.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`byteOffset`](RecursiveMutex.md#byteoffset)

***

### ownsLock

#### Get Signature

> **get** **ownsLock**(): `boolean`

Defined in: [src/mutexes/recursiveMutex.ts:95](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L95)

Indicates whether the current agent owns the lock.

##### Returns

`boolean`

Indicates whether the current agent owns the lock.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`ownsLock`](../interfaces/SyncTimedLockable.md#ownslock)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`ownsLock`](RecursiveMutex.md#ownslock)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/mutexes/recursiveMutex.ts:102](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L102)

#### Returns

`Promise`\<`void`\>

#### Throws

A RangeError If the mutex is already locked the maximum amount of times.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`lock`](RecursiveMutex.md#lock)

***

### lockSync()

> **lockSync**(): `void`

Defined in: [src/mutexes/recursiveMutex.ts:122](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L122)

#### Returns

`void`

#### Throws

A RangeError If the mutex is already locked the maximum amount of times.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`lockSync`](../interfaces/SyncTimedLockable.md#locksync)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`lockSync`](RecursiveMutex.md#locksync)

***

### tryLock()

> **tryLock**(): `boolean`

Defined in: [src/mutexes/recursiveMutex.ts:139](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L139)

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLock`](../interfaces/TimedLockable.md#trylock)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`tryLock`](RecursiveMutex.md#trylock)

***

### tryLockFor()

> **tryLockFor**(`timeout`): `Promise`\<`boolean`\>

Defined in: [src/mutexes/recursiveTimedMutex.ts:40](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveTimedMutex.ts#L40)

Blocks for the provided duration or until a lock is acquired.

#### Parameters

##### timeout

`number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLockFor`](../interfaces/TimedLockable.md#trylockfor)

***

### tryLockForSync()

> **tryLockForSync**(`timeout`): `boolean`

Defined in: [src/mutexes/recursiveTimedMutex.ts:44](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveTimedMutex.ts#L44)

Blocks for the provided duration or until a lock is acquired.

#### Parameters

##### timeout

`number`

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`tryLockForSync`](../interfaces/SyncTimedLockable.md#trylockforsync)

***

### tryLockSync()

> **tryLockSync**(): `boolean`

Defined in: [src/mutexes/recursiveMutex.ts:143](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L143)

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`tryLockSync`](../interfaces/SyncTimedLockable.md#trylocksync)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`tryLockSync`](RecursiveMutex.md#trylocksync)

***

### tryLockUntil()

> **tryLockUntil**(`timestamp`): `Promise`\<`boolean`\>

Defined in: [src/mutexes/recursiveTimedMutex.ts:48](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveTimedMutex.ts#L48)

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

##### timestamp

`number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLockUntil`](../interfaces/TimedLockable.md#trylockuntil)

***

### tryLockUntilSync()

> **tryLockUntilSync**(`timestamp`): `boolean`

Defined in: [src/mutexes/recursiveTimedMutex.ts:72](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveTimedMutex.ts#L72)

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

##### timestamp

`number`

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`tryLockUntilSync`](../interfaces/SyncTimedLockable.md#trylockuntilsync)

***

### unlock()

> **unlock**(): `void`

Defined in: [src/mutexes/recursiveMutex.ts:162](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L162)

#### Returns

`void`

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`unlock`](RecursiveMutex.md#unlock)

***

### unlockSync()

> **unlockSync**(): `void`

Defined in: [src/mutexes/recursiveMutex.ts:169](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/recursiveMutex.ts#L169)

#### Returns

`void`

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`unlockSync`](../interfaces/SyncTimedLockable.md#unlocksync)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`unlockSync`](RecursiveMutex.md#unlocksync)
