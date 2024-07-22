[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / SharedTimedMutex

# Class: SharedTimedMutex

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

### new SharedTimedMutex()

> **new SharedTimedMutex**(): [`SharedTimedMutex`](SharedTimedMutex.md)

#### Returns

[`SharedTimedMutex`](SharedTimedMutex.md)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`constructor`](SharedMutex.md#constructors)

#### Defined in

[src/mutexes/sharedMutex.ts:50](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L50)

### new SharedTimedMutex()

> **new SharedTimedMutex**(`sharedBuffer`, `byteOffset`?): [`SharedTimedMutex`](SharedTimedMutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`SharedTimedMutex`](SharedTimedMutex.md)

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](SharedMutex.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](SharedMutex.md#bytelength).

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`constructor`](SharedMutex.md#constructors)

#### Defined in

[src/mutexes/sharedMutex.ts:60](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L60)

## Properties

### \_gate1

> `protected` **\_gate1**: [`ConditionVariable`](ConditionVariable.md)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_gate1`](SharedMutex.md#_gate1)

#### Defined in

[src/mutexes/sharedMutex.ts:43](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L43)

***

### \_gate2

> `protected` **\_gate2**: [`ConditionVariable`](ConditionVariable.md)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_gate2`](SharedMutex.md#_gate2)

#### Defined in

[src/mutexes/sharedMutex.ts:44](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L44)

***

### \_isReader

> `protected` **\_isReader**: `boolean`

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_isReader`](SharedMutex.md#_isreader)

#### Defined in

[src/mutexes/sharedMutex.ts:45](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L45)

***

### \_isWriter

> `protected` **\_isWriter**: `boolean`

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_isWriter`](SharedMutex.md#_iswriter)

#### Defined in

[src/mutexes/sharedMutex.ts:46](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L46)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_mem`](SharedMutex.md#_mem)

#### Defined in

[src/mutexes/sharedMutex.ts:47](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L47)

***

### \_mutex

> `protected` **\_mutex**: [`TimedMutex`](TimedMutex.md)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_mutex`](SharedMutex.md#_mutex)

#### Defined in

[src/mutexes/sharedMutex.ts:48](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L48)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number`

The size in bytes of the mutex.

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`ByteLength`](SharedMutex.md#bytelength)

#### Defined in

[src/mutexes/sharedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L41)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`buffer`](SharedMutex.md#buffer)

#### Defined in

[src/mutexes/sharedMutex.ts:79](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L79)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`byteLength`](SharedMutex.md#bytelength-1)

#### Defined in

[src/mutexes/sharedMutex.ts:83](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L83)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`byteOffset`](SharedMutex.md#byteoffset)

#### Defined in

[src/mutexes/sharedMutex.ts:87](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L87)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`ownsLock`](../interfaces/TimedLockable.md#ownslock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`ownsLock`](SharedMutex.md#ownslock)

#### Defined in

[src/mutexes/sharedMutex.ts:91](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L91)

***

### ownsSharedLock

> `get` **ownsSharedLock**(): `boolean`

Indicates whether the current agent owns a shared lock.

#### Returns

`boolean`

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`ownsSharedLock`](../interfaces/SharedTimedLockable.md#ownssharedlock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`ownsSharedLock`](SharedMutex.md#ownssharedlock)

#### Defined in

[src/mutexes/sharedMutex.ts:95](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L95)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the mutex is already locked by the caller.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`lock`](SharedMutex.md#lock)

#### Defined in

[src/mutexes/sharedMutex.ts:104](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L104)

***

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`lockShared`](../interfaces/SharedTimedLockable.md#lockshared)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`lockShared`](SharedMutex.md#lockshared)

#### Defined in

[src/mutexes/sharedMutex.ts:172](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L172)

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

[`SharedMutex`](SharedMutex.md).[`tryLock`](SharedMutex.md#trylock)

#### Defined in

[src/mutexes/sharedMutex.ts:125](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L125)

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

[src/mutexes/sharedTimedMutex.ts:37](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedTimedMutex.ts#L37)

***

### tryLockShared()

> **tryLockShared**(): `boolean`

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

#### Defined in

[src/mutexes/sharedMutex.ts:193](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L193)

***

### tryLockSharedFor()

> **tryLockSharedFor**(`timeout`): `Promise`\<`boolean`\>

Blocks for the provided duration or until a lock is acquired.

#### Parameters

• **timeout**: `number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`tryLockSharedFor`](../interfaces/SharedTimedLockable.md#trylocksharedfor)

#### Defined in

[src/mutexes/sharedTimedMutex.ts:92](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedTimedMutex.ts#L92)

***

### tryLockSharedUntil()

> **tryLockSharedUntil**(`timestamp`): `Promise`\<`boolean`\>

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

• **timestamp**: `number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`tryLockSharedUntil`](../interfaces/SharedTimedLockable.md#trylockshareduntil)

#### Defined in

[src/mutexes/sharedTimedMutex.ts:96](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedTimedMutex.ts#L96)

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

[src/mutexes/sharedTimedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedTimedMutex.ts#L41)

***

### unlock()

> **unlock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`unlock`](SharedMutex.md#unlock)

#### Defined in

[src/mutexes/sharedMutex.ts:150](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L150)

***

### unlockShared()

> **unlockShared**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`unlockShared`](../interfaces/SharedTimedLockable.md#unlockshared)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`unlockShared`](SharedMutex.md#unlockshared)

#### Defined in

[src/mutexes/sharedMutex.ts:224](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/mutexes/sharedMutex.ts#L224)
