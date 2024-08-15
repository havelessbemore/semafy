[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / RecursiveMutex

# Class: RecursiveMutex

Provides synchronization across agents (main thread and workers)
to allow exclusive recursive access to shared resources / blocks of code.

A mutex is owned once an agent successfully locks it.
During ownership, the agent may acquire additional locks from the
mutex. Ownership ends when the agent releases all aquired locks.

While owned, any other agents attempting to lock the mutex will
block (or receive `false` from `tryLock` methods). When unlocked,
any blocked agent will have the chance to acquire owernship.

The maximum number of times a mutex can be locked recursively
is defined by [RecursiveMutex.Max](RecursiveMutex.md#max). Once reached, attempts
for additional locks will throw an error, and calls to `tryLock` methods
will return `false`.

Behavior is undefined if:
   - The mutex is destroyed while being owned.
   - The agent is terminated while owning the mutex.
   - The mutex's shared memory location is modified externally.

## Extended by

- [`RecursiveTimedMutex`](RecursiveTimedMutex.md)

## Implements

- [`Lockable`](../interfaces/Lockable.md)
- [`SyncLockable`](../interfaces/SyncLockable.md)
- [`SharedResource`](../interfaces/SharedResource.md)

## Constructors

### new RecursiveMutex()

> **new RecursiveMutex**(): [`RecursiveMutex`](RecursiveMutex.md)

#### Returns

[`RecursiveMutex`](RecursiveMutex.md)

#### Defined in

[src/mutexes/recursiveMutex.ts:60](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L60)

### new RecursiveMutex()

> **new RecursiveMutex**(`sharedBuffer`, `byteOffset`?): [`RecursiveMutex`](RecursiveMutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`RecursiveMutex`](RecursiveMutex.md)

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](RecursiveMutex.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](RecursiveMutex.md#bytelength).

#### Defined in

[src/mutexes/recursiveMutex.ts:70](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L70)

## Properties

### \_depth

> `protected` **\_depth**: `number`

The number of locks acquired by the agent.

#### Defined in

[src/mutexes/recursiveMutex.ts:53](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L53)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared atomic memory for the mutex.

#### Defined in

[src/mutexes/recursiveMutex.ts:58](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L58)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number` = `Int32Array.BYTES_PER_ELEMENT`

The size in bytes of the mutex.

#### Defined in

[src/mutexes/recursiveMutex.ts:43](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L43)

***

### Max

> `readonly` `static` **Max**: `2147483647` = `MAX_INT32_VALUE`

The maximum levels of recursive ownership.

#### Defined in

[src/mutexes/recursiveMutex.ts:48](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L48)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`buffer`](../interfaces/SharedResource.md#buffer)

#### Defined in

[src/mutexes/recursiveMutex.ts:83](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L83)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteLength`](../interfaces/SharedResource.md#bytelength)

#### Defined in

[src/mutexes/recursiveMutex.ts:87](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L87)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteOffset`](../interfaces/SharedResource.md#byteoffset)

#### Defined in

[src/mutexes/recursiveMutex.ts:91](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L91)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`ownsLock`](../interfaces/SyncLockable.md#ownslock)

#### Defined in

[src/mutexes/recursiveMutex.ts:95](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L95)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

A RangeError If the mutex is already locked the maximum amount of times.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`lock`](../interfaces/Lockable.md#lock)

#### Defined in

[src/mutexes/recursiveMutex.ts:102](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L102)

***

### lockSync()

> **lockSync**(): `void`

#### Returns

`void`

#### Throws

A RangeError If the mutex is already locked the maximum amount of times.

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`lockSync`](../interfaces/SyncLockable.md#locksync)

#### Defined in

[src/mutexes/recursiveMutex.ts:122](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L122)

***

### tryLock()

> **tryLock**(): `boolean`

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`tryLock`](../interfaces/Lockable.md#trylock)

#### Defined in

[src/mutexes/recursiveMutex.ts:139](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L139)

***

### tryLockSync()

> **tryLockSync**(): `boolean`

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`tryLockSync`](../interfaces/SyncLockable.md#trylocksync)

#### Defined in

[src/mutexes/recursiveMutex.ts:143](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L143)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`unlock`](../interfaces/Lockable.md#unlock)

#### Defined in

[src/mutexes/recursiveMutex.ts:162](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L162)

***

### unlockSync()

> **unlockSync**(): `void`

#### Returns

`void`

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`unlockSync`](../interfaces/SyncLockable.md#unlocksync)

#### Defined in

[src/mutexes/recursiveMutex.ts:169](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/mutexes/recursiveMutex.ts#L169)
