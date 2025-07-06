[**semafy**](../README.md)

***

[semafy](../globals.md) / Mutex

# Class: Mutex

Defined in: [src/mutexes/mutex.ts:35](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L35)

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

### Constructor

> **new Mutex**(): `Mutex`

Defined in: [src/mutexes/mutex.ts:51](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L51)

#### Returns

`Mutex`

### Constructor

> **new Mutex**(`sharedBuffer`, `byteOffset?`): `Mutex`

Defined in: [src/mutexes/mutex.ts:61](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L61)

#### Parameters

##### sharedBuffer

`SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

##### byteOffset?

`number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

`Mutex`

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](#bytelength).

## Properties

### \_isOwner

> `protected` **\_isOwner**: `boolean`

Defined in: [src/mutexes/mutex.ts:44](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L44)

Indicates whether the current agent owns the lock.

***

### \_mem

> `protected` **\_mem**: `Int32Array`

Defined in: [src/mutexes/mutex.ts:49](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L49)

The shared memory for the mutex.

***

### ByteLength

> `readonly` `static` **ByteLength**: `number` = `Int32Array.BYTES_PER_ELEMENT`

Defined in: [src/mutexes/mutex.ts:39](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L39)

The size in bytes of the mutex.

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

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`buffer`](../interfaces/SharedResource.md#buffer)

***

### byteLength

#### Get Signature

> **get** **byteLength**(): `number`

Defined in: [src/mutexes/mutex.ts:78](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L78)

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

Defined in: [src/mutexes/mutex.ts:82](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L82)

The byte offset within the SharedArrayBuffer where data begins.

##### Returns

`number`

The byte offset within the SharedArrayBuffer where data begins.

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteOffset`](../interfaces/SharedResource.md#byteoffset)

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

[`SyncLockable`](../interfaces/SyncLockable.md).[`ownsLock`](../interfaces/SyncLockable.md#ownslock)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/mutexes/mutex.ts:93](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L93)

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`lock`](../interfaces/Lockable.md#lock)

***

### lockSync()

> **lockSync**(): `void`

Defined in: [src/mutexes/mutex.ts:112](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L112)

#### Returns

`void`

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`lockSync`](../interfaces/SyncLockable.md#locksync)

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

[`Lockable`](../interfaces/Lockable.md).[`tryLock`](../interfaces/Lockable.md#trylock)

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

[`SyncLockable`](../interfaces/SyncLockable.md).[`tryLockSync`](../interfaces/SyncLockable.md#trylocksync)

***

### unlock()

> **unlock**(): `void`

Defined in: [src/mutexes/mutex.ts:141](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L141)

#### Returns

`void`

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`unlock`](../interfaces/Lockable.md#unlock)

***

### unlockSync()

> **unlockSync**(): `void`

Defined in: [src/mutexes/mutex.ts:148](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/mutex.ts#L148)

#### Returns

`void`

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`unlockSync`](../interfaces/SyncLockable.md#unlocksync)
