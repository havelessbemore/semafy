[**semafy**](../README.md)

***

[semafy](../globals.md) / SharedTimedMutex

# Class: SharedTimedMutex

Defined in: [src/mutexes/sharedTimedMutex.ts:33](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedTimedMutex.ts#L33)

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

Timeout precision for time-based methods may vary due to system load
and inherent limitations of JavaScript timing. Developers should
consider this possible variability in their applications.

## Extends

- [`SharedMutex`](SharedMutex.md)

## Implements

- [`TimedLockable`](../interfaces/TimedLockable.md)
- [`SharedTimedLockable`](../interfaces/SharedTimedLockable.md)

## Constructors

### Constructor

> **new SharedTimedMutex**(): `SharedTimedMutex`

Defined in: [src/mutexes/sharedMutex.ts:50](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L50)

#### Returns

`SharedTimedMutex`

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`constructor`](SharedMutex.md#constructor)

### Constructor

> **new SharedTimedMutex**(`sharedBuffer`, `byteOffset?`): `SharedTimedMutex`

Defined in: [src/mutexes/sharedMutex.ts:60](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L60)

#### Parameters

##### sharedBuffer

`SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

##### byteOffset?

`number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

`SharedTimedMutex`

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](SharedMutex.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](SharedMutex.md#bytelength).

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`constructor`](SharedMutex.md#constructor)

## Properties

### \_gate1

> `protected` **\_gate1**: [`ConditionVariable`](ConditionVariable.md)

Defined in: [src/mutexes/sharedMutex.ts:43](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L43)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_gate1`](SharedMutex.md#_gate1)

***

### \_gate2

> `protected` **\_gate2**: [`ConditionVariable`](ConditionVariable.md)

Defined in: [src/mutexes/sharedMutex.ts:44](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L44)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_gate2`](SharedMutex.md#_gate2)

***

### \_isReader

> `protected` **\_isReader**: `boolean`

Defined in: [src/mutexes/sharedMutex.ts:45](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L45)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_isReader`](SharedMutex.md#_isreader)

***

### \_isWriter

> `protected` **\_isWriter**: `boolean`

Defined in: [src/mutexes/sharedMutex.ts:46](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L46)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_isWriter`](SharedMutex.md#_iswriter)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

Defined in: [src/mutexes/sharedMutex.ts:47](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L47)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_mem`](SharedMutex.md#_mem)

***

### \_mutex

> `protected` **\_mutex**: [`TimedMutex`](TimedMutex.md)

Defined in: [src/mutexes/sharedMutex.ts:48](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L48)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_mutex`](SharedMutex.md#_mutex)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number`

Defined in: [src/mutexes/sharedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L41)

The size in bytes of the mutex.

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`ByteLength`](SharedMutex.md#bytelength)

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

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`buffer`](SharedMutex.md#buffer)

***

### byteLength

#### Get Signature

> **get** **byteLength**(): `number`

Defined in: [src/mutexes/sharedMutex.ts:83](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L83)

The total length in bytes being used from the SharedArrayBuffer.

##### Returns

`number`

The total length in bytes being used from the SharedArrayBuffer.

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`byteLength`](SharedMutex.md#bytelength-1)

***

### byteOffset

#### Get Signature

> **get** **byteOffset**(): `number`

Defined in: [src/mutexes/sharedMutex.ts:87](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L87)

The byte offset within the SharedArrayBuffer where data begins.

##### Returns

`number`

The byte offset within the SharedArrayBuffer where data begins.

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`byteOffset`](SharedMutex.md#byteoffset)

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

[`TimedLockable`](../interfaces/TimedLockable.md).[`ownsLock`](../interfaces/TimedLockable.md#ownslock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`ownsLock`](SharedMutex.md#ownslock)

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

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`ownsSharedLock`](../interfaces/SharedTimedLockable.md#ownssharedlock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`ownsSharedLock`](SharedMutex.md#ownssharedlock)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/mutexes/sharedMutex.ts:104](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L104)

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the mutex is already locked by the caller.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`lock`](SharedMutex.md#lock)

***

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

Defined in: [src/mutexes/sharedMutex.ts:172](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L172)

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`lockShared`](../interfaces/SharedTimedLockable.md#lockshared)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`lockShared`](SharedMutex.md#lockshared)

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

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLock`](../interfaces/TimedLockable.md#trylock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`tryLock`](SharedMutex.md#trylock)

***

### tryLockFor()

> **tryLockFor**(`timeout`): `Promise`\<`boolean`\>

Defined in: [src/mutexes/sharedTimedMutex.ts:37](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedTimedMutex.ts#L37)

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

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`tryLockShared`](../interfaces/SharedTimedLockable.md#trylockshared)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`tryLockShared`](SharedMutex.md#trylockshared)

***

### tryLockSharedFor()

> **tryLockSharedFor**(`timeout`): `Promise`\<`boolean`\>

Defined in: [src/mutexes/sharedTimedMutex.ts:92](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedTimedMutex.ts#L92)

Blocks for the provided duration or until a lock is acquired.

#### Parameters

##### timeout

`number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`tryLockSharedFor`](../interfaces/SharedTimedLockable.md#trylocksharedfor)

***

### tryLockSharedUntil()

> **tryLockSharedUntil**(`timestamp`): `Promise`\<`boolean`\>

Defined in: [src/mutexes/sharedTimedMutex.ts:96](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedTimedMutex.ts#L96)

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

##### timestamp

`number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`tryLockSharedUntil`](../interfaces/SharedTimedLockable.md#trylockshareduntil)

***

### tryLockUntil()

> **tryLockUntil**(`timestamp`): `Promise`\<`boolean`\>

Defined in: [src/mutexes/sharedTimedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedTimedMutex.ts#L41)

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

### unlock()

> **unlock**(): `Promise`\<`void`\>

Defined in: [src/mutexes/sharedMutex.ts:150](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L150)

#### Returns

`Promise`\<`void`\>

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`unlock`](SharedMutex.md#unlock)

***

### unlockShared()

> **unlockShared**(): `Promise`\<`void`\>

Defined in: [src/mutexes/sharedMutex.ts:224](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/mutexes/sharedMutex.ts#L224)

#### Returns

`Promise`\<`void`\>

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`unlockShared`](../interfaces/SharedTimedLockable.md#unlockshared)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`unlockShared`](SharedMutex.md#unlockshared)
