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

#### Defined in

[src/mutexes/mutex.ts:51](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L51)

### new TimedMutex()

> **new TimedMutex**(`sharedBuffer`, `byteOffset`?): [`TimedMutex`](TimedMutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`TimedMutex`](TimedMutex.md)

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](Mutex.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](Mutex.md#bytelength).

#### Inherited from

[`Mutex`](Mutex.md).[`constructor`](Mutex.md#constructors)

#### Defined in

[src/mutexes/mutex.ts:61](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L61)

## Properties

### \_isOwner

> `protected` **\_isOwner**: `boolean`

Indicates whether the current agent owns the lock.

#### Inherited from

[`Mutex`](Mutex.md).[`_isOwner`](Mutex.md#_isowner)

#### Defined in

[src/mutexes/mutex.ts:44](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L44)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared memory for the mutex.

#### Inherited from

[`Mutex`](Mutex.md).[`_mem`](Mutex.md#_mem)

#### Defined in

[src/mutexes/mutex.ts:49](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L49)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number` = `Int32Array.BYTES_PER_ELEMENT`

The size in bytes of the mutex.

#### Inherited from

[`Mutex`](Mutex.md).[`ByteLength`](Mutex.md#bytelength)

#### Defined in

[src/mutexes/mutex.ts:39](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L39)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Inherited from

[`Mutex`](Mutex.md).[`buffer`](Mutex.md#buffer)

#### Defined in

[src/mutexes/mutex.ts:74](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L74)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

The total length in bytes being used from the SharedArrayBuffer.

#### Inherited from

[`Mutex`](Mutex.md).[`byteLength`](Mutex.md#bytelength-1)

#### Defined in

[src/mutexes/mutex.ts:78](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L78)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

The byte offset within the SharedArrayBuffer where data begins.

#### Inherited from

[`Mutex`](Mutex.md).[`byteOffset`](Mutex.md#byteoffset)

#### Defined in

[src/mutexes/mutex.ts:82](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L82)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

Indicates whether the current agent owns the lock.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`ownsLock`](../interfaces/SyncTimedLockable.md#ownslock)

#### Inherited from

[`Mutex`](Mutex.md).[`ownsLock`](Mutex.md#ownslock)

#### Defined in

[src/mutexes/mutex.ts:86](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L86)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

#### Inherited from

[`Mutex`](Mutex.md).[`lock`](Mutex.md#lock)

#### Defined in

[src/mutexes/mutex.ts:93](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L93)

***

### lockSync()

> **lockSync**(): `void`

#### Returns

`void`

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`lockSync`](../interfaces/SyncTimedLockable.md#locksync)

#### Inherited from

[`Mutex`](Mutex.md).[`lockSync`](Mutex.md#locksync)

#### Defined in

[src/mutexes/mutex.ts:112](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L112)

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

#### Defined in

[src/mutexes/mutex.ts:125](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L125)

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

#### Defined in

[src/mutexes/timedMutex.ts:37](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/timedMutex.ts#L37)

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

#### Defined in

[src/mutexes/timedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/timedMutex.ts#L41)

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

#### Defined in

[src/mutexes/mutex.ts:129](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L129)

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

#### Defined in

[src/mutexes/timedMutex.ts:45](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/timedMutex.ts#L45)

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

#### Defined in

[src/mutexes/timedMutex.ts:63](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/timedMutex.ts#L63)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

#### Inherited from

[`Mutex`](Mutex.md).[`unlock`](Mutex.md#unlock)

#### Defined in

[src/mutexes/mutex.ts:141](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L141)

***

### unlockSync()

> **unlockSync**(): `void`

#### Returns

`void`

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`unlockSync`](../interfaces/SyncTimedLockable.md#unlocksync)

#### Inherited from

[`Mutex`](Mutex.md).[`unlockSync`](Mutex.md#unlocksync)

#### Defined in

[src/mutexes/mutex.ts:148](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/mutexes/mutex.ts#L148)
