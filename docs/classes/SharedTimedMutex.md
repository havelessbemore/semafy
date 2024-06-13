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

#### Source

[src/mutexes/sharedMutex.ts:45](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L45)

### new SharedTimedMutex()

> **new SharedTimedMutex**(`sharedBuffer`, `byteOffset`?): [`SharedTimedMutex`](SharedTimedMutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The shared buffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within the shared buffer. Defaults to `0`.

#### Returns

[`SharedTimedMutex`](SharedTimedMutex.md)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`constructor`](SharedMutex.md#constructors)

#### Source

[src/mutexes/sharedMutex.ts:50](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L50)

## Properties

### \_gate1

> `protected` **\_gate1**: [`ConditionVariable`](ConditionVariable.md)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_gate1`](SharedMutex.md#_gate1)

#### Source

[src/mutexes/sharedMutex.ts:38](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L38)

***

### \_gate2

> `protected` **\_gate2**: [`ConditionVariable`](ConditionVariable.md)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_gate2`](SharedMutex.md#_gate2)

#### Source

[src/mutexes/sharedMutex.ts:39](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L39)

***

### \_isReader

> `protected` **\_isReader**: `boolean`

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_isReader`](SharedMutex.md#_isreader)

#### Source

[src/mutexes/sharedMutex.ts:40](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L40)

***

### \_isWriter

> `protected` **\_isWriter**: `boolean`

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_isWriter`](SharedMutex.md#_iswriter)

#### Source

[src/mutexes/sharedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L41)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_mem`](SharedMutex.md#_mem)

#### Source

[src/mutexes/sharedMutex.ts:42](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L42)

***

### \_mutex

> `protected` **\_mutex**: [`TimedMutex`](TimedMutex.md)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`_mutex`](SharedMutex.md#_mutex)

#### Source

[src/mutexes/sharedMutex.ts:43](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L43)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Source

[src/mutexes/sharedMutex.ts:69](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L69)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Source

[src/mutexes/sharedMutex.ts:73](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L73)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Source

[src/mutexes/sharedMutex.ts:77](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L77)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Source

[src/mutexes/sharedMutex.ts:81](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L81)

***

### ownsSharedLock

> `get` **ownsSharedLock**(): `boolean`

Indicates whether the current agent owns a shared lock.

#### Returns

`boolean`

#### Source

[src/mutexes/sharedMutex.ts:85](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L85)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`lock`](SharedMutex.md#lock)

#### Throws

A [RelockError](RelockError.md) If the mutex is already locked by the caller.

#### Source

[src/mutexes/sharedMutex.ts:94](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L94)

***

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`lockShared`](../interfaces/SharedTimedLockable.md#lockshared)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`lockShared`](SharedMutex.md#lockshared)

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Source

[src/mutexes/sharedMutex.ts:162](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L162)

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

#### Source

[src/mutexes/sharedMutex.ts:115](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L115)

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

[src/mutexes/sharedTimedMutex.ts:37](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedTimedMutex.ts#L37)

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

#### Source

[src/mutexes/sharedMutex.ts:183](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L183)

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

#### Source

[src/mutexes/sharedTimedMutex.ts:92](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedTimedMutex.ts#L92)

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

#### Source

[src/mutexes/sharedTimedMutex.ts:96](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedTimedMutex.ts#L96)

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

[src/mutexes/sharedTimedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedTimedMutex.ts#L41)

***

### unlock()

> **unlock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`unlock`](SharedMutex.md#unlock)

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Source

[src/mutexes/sharedMutex.ts:140](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L140)

***

### unlockShared()

> **unlockShared**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SharedTimedLockable`](../interfaces/SharedTimedLockable.md).[`unlockShared`](../interfaces/SharedTimedLockable.md#unlockshared)

#### Inherited from

[`SharedMutex`](SharedMutex.md).[`unlockShared`](SharedMutex.md#unlockshared)

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Source

[src/mutexes/sharedMutex.ts:214](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/mutexes/sharedMutex.ts#L214)
