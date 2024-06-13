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

#### Source

[src/mutexes/recursiveMutex.ts:55](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L55)

### new RecursiveMutex()

> **new RecursiveMutex**(`sharedBuffer`, `byteOffset`?): [`RecursiveMutex`](RecursiveMutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`RecursiveMutex`](RecursiveMutex.md)

#### Source

[src/mutexes/recursiveMutex.ts:60](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L60)

## Properties

### \_depth

> `protected` **\_depth**: `number`

The number of locks acquired by the agent.

#### Source

[src/mutexes/recursiveMutex.ts:48](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L48)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared atomic memory for the mutex.

#### Source

[src/mutexes/recursiveMutex.ts:53](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L53)

***

### Max

> `static` `readonly` **Max**: `2147483647` = `MAX_INT32_VALUE`

The maximum levels of recursive ownership.

#### Source

[src/mutexes/recursiveMutex.ts:43](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L43)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Source

[src/mutexes/recursiveMutex.ts:73](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L73)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Source

[src/mutexes/recursiveMutex.ts:77](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L77)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Source

[src/mutexes/recursiveMutex.ts:81](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L81)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Source

[src/mutexes/recursiveMutex.ts:85](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L85)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`lock`](../interfaces/Lockable.md#lock)

#### Throws

A RangeError If the mutex is already locked the maximum amount of times.

#### Source

[src/mutexes/recursiveMutex.ts:92](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L92)

***

### lockSync()

> **lockSync**(): `void`

#### Returns

`void`

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`lockSync`](../interfaces/SyncLockable.md#locksync)

#### Throws

A RangeError If the mutex is already locked the maximum amount of times.

#### Source

[src/mutexes/recursiveMutex.ts:112](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L112)

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

#### Source

[src/mutexes/recursiveMutex.ts:129](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L129)

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

#### Source

[src/mutexes/recursiveMutex.ts:133](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L133)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`unlock`](../interfaces/Lockable.md#unlock)

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Source

[src/mutexes/recursiveMutex.ts:152](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L152)

***

### unlockSync()

> **unlockSync**(): `void`

#### Returns

`void`

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`unlockSync`](../interfaces/SyncLockable.md#unlocksync)

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Source

[src/mutexes/recursiveMutex.ts:159](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/recursiveMutex.ts#L159)