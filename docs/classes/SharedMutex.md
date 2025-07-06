[**semafy**](../README.md)

***

[semafy](../globals.md) / SharedMutex

# Class: SharedMutex

Defined in: [src/mutexes/sharedMutex.ts:37](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L37)

Provides synchronization across agents (main thread and workers)
to allow exclusive and shared access to resources / blocks of code.

If one agent has acquired an exclusive lock, no other agents can acquire
the mutex. If one agent has acquired a shared lock, other agents can still
acquire the shared lock, but cannot acquire an exclusive lock. Within one
agent, only one lock (shared or exclusive) can be acquired at the same time.

Shared mutexes are useful when shared data can be safely read by any number
of agents simultaneously, but should be written to by only one agent at a
time, and not readable by other agents during writing.

Behavior is undefined if:
   - The mutex is destroyed while being owned.
   - The agent is terminated while owning the mutex.
   - The mutex's shared memory location is modified externally.

## Extended by

- [`SharedTimedMutex`](SharedTimedMutex.md)

## Implements

- [`Lockable`](../interfaces/Lockable.md)
- [`SharedLockable`](../interfaces/SharedLockable.md)
- [`SharedResource`](../interfaces/SharedResource.md)

## Constructors

### Constructor

> **new SharedMutex**(): `SharedMutex`

Defined in: [src/mutexes/sharedMutex.ts:50](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L50)

#### Returns

`SharedMutex`

### Constructor

> **new SharedMutex**(`sharedBuffer`, `byteOffset?`): `SharedMutex`

Defined in: [src/mutexes/sharedMutex.ts:60](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L60)

#### Parameters

##### sharedBuffer

`SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

##### byteOffset?

`number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

`SharedMutex`

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](#bytelength).

## Properties

### \_gate1

> `protected` **\_gate1**: [`ConditionVariable`](ConditionVariable.md)

Defined in: [src/mutexes/sharedMutex.ts:43](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L43)

***

### \_gate2

> `protected` **\_gate2**: [`ConditionVariable`](ConditionVariable.md)

Defined in: [src/mutexes/sharedMutex.ts:44](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L44)

***

### \_isReader

> `protected` **\_isReader**: `boolean`

Defined in: [src/mutexes/sharedMutex.ts:45](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L45)

***

### \_isWriter

> `protected` **\_isWriter**: `boolean`

Defined in: [src/mutexes/sharedMutex.ts:46](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L46)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

Defined in: [src/mutexes/sharedMutex.ts:47](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L47)

***

### \_mutex

> `protected` **\_mutex**: [`TimedMutex`](TimedMutex.md)

Defined in: [src/mutexes/sharedMutex.ts:48](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L48)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number`

Defined in: [src/mutexes/sharedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L41)

The size in bytes of the mutex.

## Accessors

### buffer

#### Get Signature

> **get** **buffer**(): `SharedArrayBuffer`

Defined in: [src/mutexes/sharedMutex.ts:79](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L79)

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

Defined in: [src/mutexes/sharedMutex.ts:83](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L83)

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

Defined in: [src/mutexes/sharedMutex.ts:87](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L87)

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

Defined in: [src/mutexes/sharedMutex.ts:91](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L91)

Indicates whether the current agent owns the lock.

##### Returns

`boolean`

Indicates whether the current agent owns the lock.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`ownsLock`](../interfaces/Lockable.md#ownslock)

***

### ownsSharedLock

#### Get Signature

> **get** **ownsSharedLock**(): `boolean`

Defined in: [src/mutexes/sharedMutex.ts:95](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L95)

Indicates whether the current agent owns a shared lock.

##### Returns

`boolean`

Indicates whether the current agent owns a shared lock.

#### Implementation of

[`SharedLockable`](../interfaces/SharedLockable.md).[`ownsSharedLock`](../interfaces/SharedLockable.md#ownssharedlock)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/mutexes/sharedMutex.ts:104](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L104)

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the mutex is already locked by the caller.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`lock`](../interfaces/Lockable.md#lock)

***

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

Defined in: [src/mutexes/sharedMutex.ts:172](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L172)

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`SharedLockable`](../interfaces/SharedLockable.md).[`lockShared`](../interfaces/SharedLockable.md#lockshared)

***

### tryLock()

> **tryLock**(): `boolean`

Defined in: [src/mutexes/sharedMutex.ts:125](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L125)

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`tryLock`](../interfaces/Lockable.md#trylock)

***

### tryLockShared()

> **tryLockShared**(): `boolean`

Defined in: [src/mutexes/sharedMutex.ts:193](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L193)

Attempts to acquire a shared lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SharedLockable`](../interfaces/SharedLockable.md).[`tryLockShared`](../interfaces/SharedLockable.md#trylockshared)

***

### unlock()

> **unlock**(): `Promise`\<`void`\>

Defined in: [src/mutexes/sharedMutex.ts:150](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L150)

#### Returns

`Promise`\<`void`\>

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`unlock`](../interfaces/Lockable.md#unlock)

***

### unlockShared()

> **unlockShared**(): `Promise`\<`void`\>

Defined in: [src/mutexes/sharedMutex.ts:224](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L224)

#### Returns

`Promise`\<`void`\>

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SharedLockable`](../interfaces/SharedLockable.md).[`unlockShared`](../interfaces/SharedLockable.md#unlockshared)
