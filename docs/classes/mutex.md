[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / Mutex

# Class: Mutex

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

## Extended by

- [`TimedMutex`](TimedMutex.md)

## Implements

- [`Lockable`](../interfaces/Lockable.md)
- [`SyncLockable`](../interfaces/SyncLockable.md)
- [`SharedResource`](../interfaces/SharedResource.md)

## Constructors

### new Mutex()

> **new Mutex**(): [`Mutex`](Mutex.md)

#### Returns

[`Mutex`](Mutex.md)

#### Source

[src/mutexes/mutex.ts:46](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L46)

### new Mutex()

> **new Mutex**(`sharedBuffer`, `byteOffset`?): [`Mutex`](Mutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`Mutex`](Mutex.md)

#### Source

[src/mutexes/mutex.ts:51](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L51)

## Properties

### \_isOwner

> `protected` **\_isOwner**: `boolean`

Indicates whether the current agent owns the lock.

#### Source

[src/mutexes/mutex.ts:39](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L39)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared memory for the mutex.

#### Source

[src/mutexes/mutex.ts:44](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L44)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Source

[src/mutexes/mutex.ts:64](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L64)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Source

[src/mutexes/mutex.ts:68](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L68)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Source

[src/mutexes/mutex.ts:72](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L72)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Source

[src/mutexes/mutex.ts:76](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L76)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`lock`](../interfaces/Lockable.md#lock)

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Source

[src/mutexes/mutex.ts:83](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L83)

***

### lockSync()

> **lockSync**(): `void`

#### Returns

`void`

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`lockSync`](../interfaces/SyncLockable.md#locksync)

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Source

[src/mutexes/mutex.ts:102](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L102)

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

[src/mutexes/mutex.ts:115](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L115)

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

[src/mutexes/mutex.ts:119](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L119)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`unlock`](../interfaces/Lockable.md#unlock)

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Source

[src/mutexes/mutex.ts:131](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L131)

***

### unlockSync()

> **unlockSync**(): `void`

#### Returns

`void`

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`unlockSync`](../interfaces/SyncLockable.md#unlocksync)

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Source

[src/mutexes/mutex.ts:138](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/mutex.ts#L138)
