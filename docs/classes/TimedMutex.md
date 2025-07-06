[**semafy**](../README.md)

***

[semafy](../globals.md) / TimedMutex

# Class: TimedMutex

Defined in: [src/mutexes/timedMutex.ts:33](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/timedMutex.ts#L33)

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

### Constructor

> **new TimedMutex**(): `TimedMutex`

Defined in: [src/mutexes/mutex.ts:51](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L51)

#### Returns

`TimedMutex`

#### Inherited from

[`Mutex`](Mutex.md).[`constructor`](Mutex.md#constructor)

### Constructor

> **new TimedMutex**(`sharedBuffer`, `byteOffset?`): `TimedMutex`

Defined in: [src/mutexes/mutex.ts:61](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L61)

#### Parameters

##### sharedBuffer

`SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

##### byteOffset?

`number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

`TimedMutex`

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](Mutex.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](Mutex.md#bytelength).

#### Inherited from

[`Mutex`](Mutex.md).[`constructor`](Mutex.md#constructor)

## Properties

### \_isOwner

> `protected` **\_isOwner**: `boolean`

Defined in: [src/mutexes/mutex.ts:44](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L44)

Indicates whether the current agent owns the lock.

#### Inherited from

[`Mutex`](Mutex.md).[`_isOwner`](Mutex.md#_isowner)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

Defined in: [src/mutexes/mutex.ts:49](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L49)

The shared memory for the mutex.

#### Inherited from

[`Mutex`](Mutex.md).[`_mem`](Mutex.md#_mem)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number` = `Int32Array.BYTES_PER_ELEMENT`

Defined in: [src/mutexes/mutex.ts:39](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L39)

The size in bytes of the mutex.

#### Inherited from

[`Mutex`](Mutex.md).[`ByteLength`](Mutex.md#bytelength)

## Accessors

### buffer

#### Get Signature

> **get** **buffer**(): `SharedArrayBuffer`

Defined in: [src/mutexes/mutex.ts:74](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L74)

The underlying SharedArrayBuffer
and primary storage for shared data.

##### Returns

`SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Inherited from

[`Mutex`](Mutex.md).[`buffer`](Mutex.md#buffer)

***

### byteLength

#### Get Signature

> **get** **byteLength**(): `number`

Defined in: [src/mutexes/mutex.ts:78](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L78)

The total length in bytes being used from the SharedArrayBuffer.

##### Returns

`number`

The total length in bytes being used from the SharedArrayBuffer.

#### Inherited from

[`Mutex`](Mutex.md).[`byteLength`](Mutex.md#bytelength-1)

***

### byteOffset

#### Get Signature

> **get** **byteOffset**(): `number`

Defined in: [src/mutexes/mutex.ts:82](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L82)

The byte offset within the SharedArrayBuffer where data begins.

##### Returns

`number`

The byte offset within the SharedArrayBuffer where data begins.

#### Inherited from

[`Mutex`](Mutex.md).[`byteOffset`](Mutex.md#byteoffset)

***

### ownsLock

#### Get Signature

> **get** **ownsLock**(): `boolean`

Defined in: [src/mutexes/mutex.ts:86](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L86)

Indicates whether the current agent owns the lock.

##### Returns

`boolean`

Indicates whether the current agent owns the lock.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`ownsLock`](../interfaces/SyncTimedLockable.md#ownslock)

#### Inherited from

[`Mutex`](Mutex.md).[`ownsLock`](Mutex.md#ownslock)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/mutexes/mutex.ts:93](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L93)

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

#### Inherited from

[`Mutex`](Mutex.md).[`lock`](Mutex.md#lock)

***

### lockSync()

> **lockSync**(): `void`

Defined in: [src/mutexes/mutex.ts:112](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L112)

#### Returns

`void`

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`lockSync`](../interfaces/SyncTimedLockable.md#locksync)

#### Inherited from

[`Mutex`](Mutex.md).[`lockSync`](Mutex.md#locksync)

***

### tryLock()

> **tryLock**(): `boolean`

Defined in: [src/mutexes/mutex.ts:125](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L125)

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

***

### tryLockFor()

> **tryLockFor**(`timeout`): `Promise`\<`boolean`\>

Defined in: [src/mutexes/timedMutex.ts:37](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/timedMutex.ts#L37)

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

Defined in: [src/mutexes/timedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/timedMutex.ts#L41)

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

Defined in: [src/mutexes/mutex.ts:129](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L129)

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

***

### tryLockUntil()

> **tryLockUntil**(`timestamp`): `Promise`\<`boolean`\>

Defined in: [src/mutexes/timedMutex.ts:45](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/timedMutex.ts#L45)

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

Defined in: [src/mutexes/timedMutex.ts:63](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/timedMutex.ts#L63)

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

Defined in: [src/mutexes/mutex.ts:141](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L141)

#### Returns

`void`

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

#### Inherited from

[`Mutex`](Mutex.md).[`unlock`](Mutex.md#unlock)

***

### unlockSync()

> **unlockSync**(): `void`

Defined in: [src/mutexes/mutex.ts:148](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L148)

#### Returns

`void`

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`unlockSync`](../interfaces/SyncTimedLockable.md#unlocksync)

#### Inherited from

[`Mutex`](Mutex.md).[`unlockSync`](Mutex.md#unlocksync)
