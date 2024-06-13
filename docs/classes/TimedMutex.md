[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / TimedMutex

# Class: TimedMutex

Provides synchronization across agents (main thread and workers)
to allow exclusive access to shared resources / blocks of code.

A mutex is owned from the time an agent successfully locks it
and until the agent unlocks it. During ownership, any other agents
attempting to lock the mutex will block (or receive `false` from
`tryLock` methods). When unlocked, any blocked agent will have
the chance to acquire owernship.

A locked mutex should not be relocked by the owner. Attempts
for additional locks will throw an error, and calls to `tryLock`
methods will return `false`.

Behavior is undefined if:
   - The mutex is destroyed while being owned.
   - The agent is terminated while owning the mutex.
   - The mutex's shared memory location is modified externally.

Timeout precision for time-based methods may vary due to system load
and inherent limitations of JavaScript timing. Developers should
consider this possible variability in their applications.

## Extends

- [`Mutex`](Mutex.md)

## Implements

- [`TimedLockable`](../interfaces/TimedLockable.md)
- [`SyncTimedLockable`](../interfaces/SyncTimedLockable.md)

## Constructors

### new TimedMutex()

> **new TimedMutex**(): [`TimedMutex`](TimedMutex.md)

#### Returns

[`TimedMutex`](TimedMutex.md)

#### Inherited from

[`Mutex`](Mutex.md).[`constructor`](Mutex.md#constructors)

#### Source

[src/mutexes/mutex.ts:46](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L46)

### new TimedMutex()

> **new TimedMutex**(`sharedBuffer`, `byteOffset`?): [`TimedMutex`](TimedMutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`TimedMutex`](TimedMutex.md)

#### Inherited from

[`Mutex`](Mutex.md).[`constructor`](Mutex.md#constructors)

#### Source

[src/mutexes/mutex.ts:51](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L51)

## Properties

### \_isOwner

> `protected` **\_isOwner**: `boolean`

Indicates whether the current agent owns the lock.

#### Inherited from

[`Mutex`](Mutex.md).[`_isOwner`](Mutex.md#_isowner)

#### Source

[src/mutexes/mutex.ts:39](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L39)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared memory for the mutex.

#### Inherited from

[`Mutex`](Mutex.md).[`_mem`](Mutex.md#_mem)

#### Source

[src/mutexes/mutex.ts:44](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L44)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Source

[src/mutexes/mutex.ts:64](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L64)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Source

[src/mutexes/mutex.ts:68](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L68)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Source

[src/mutexes/mutex.ts:72](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L72)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Source

[src/mutexes/mutex.ts:76](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L76)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

#### Inherited from

[`Mutex`](Mutex.md).[`lock`](Mutex.md#lock)

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Source

[src/mutexes/mutex.ts:83](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L83)

***

### lockSync()

> **lockSync**(): `void`

#### Returns

`void`

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`lockSync`](../interfaces/SyncTimedLockable.md#locksync)

#### Inherited from

[`Mutex`](Mutex.md).[`lockSync`](Mutex.md#locksync)

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Source

[src/mutexes/mutex.ts:102](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L102)

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

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLock`](../interfaces/TimedLockable.md#trylock)

#### Inherited from

[`Mutex`](Mutex.md).[`tryLock`](Mutex.md#trylock)

#### Source

[src/mutexes/mutex.ts:115](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L115)

***

### tryLockFor()

> **tryLockFor**(`timeout`): `Promise`\<`boolean`\>

Blocks for the provided duration or until a lock is acquired.

#### Parameters

• **timeout**: `number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLockFor`](../interfaces/TimedLockable.md#trylockfor)

#### Source

[src/mutexes/timedMutex.ts:37](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/timedMutex.ts#L37)

***

### tryLockForSync()

> **tryLockForSync**(`timeout`): `boolean`

Blocks for the provided duration or until a lock is acquired.

#### Parameters

• **timeout**: `number`

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`tryLockForSync`](../interfaces/SyncTimedLockable.md#trylockforsync)

#### Source

[src/mutexes/timedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/timedMutex.ts#L41)

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

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`tryLockSync`](../interfaces/SyncTimedLockable.md#trylocksync)

#### Inherited from

[`Mutex`](Mutex.md).[`tryLockSync`](Mutex.md#trylocksync)

#### Source

[src/mutexes/mutex.ts:119](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L119)

***

### tryLockUntil()

> **tryLockUntil**(`timestamp`): `Promise`\<`boolean`\>

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

• **timestamp**: `number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLockUntil`](../interfaces/TimedLockable.md#trylockuntil)

#### Source

[src/mutexes/timedMutex.ts:45](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/timedMutex.ts#L45)

***

### tryLockUntilSync()

> **tryLockUntilSync**(`timestamp`): `boolean`

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

• **timestamp**: `number`

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`tryLockUntilSync`](../interfaces/SyncTimedLockable.md#trylockuntilsync)

#### Source

[src/mutexes/timedMutex.ts:63](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/timedMutex.ts#L63)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

#### Inherited from

[`Mutex`](Mutex.md).[`unlock`](Mutex.md#unlock)

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Source

[src/mutexes/mutex.ts:131](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L131)

***

### unlockSync()

> **unlockSync**(): `void`

#### Returns

`void`

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`unlockSync`](../interfaces/SyncTimedLockable.md#unlocksync)

#### Inherited from

[`Mutex`](Mutex.md).[`unlockSync`](Mutex.md#unlocksync)

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Source

[src/mutexes/mutex.ts:138](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/mutex.ts#L138)