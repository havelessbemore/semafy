[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / SharedMutex

# Class: SharedMutex

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

### new SharedMutex()

> **new SharedMutex**(): [`SharedMutex`](SharedMutex.md)

#### Returns

[`SharedMutex`](SharedMutex.md)

#### Source

[src/mutexes/sharedMutex.ts:45](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L45)

### new SharedMutex()

> **new SharedMutex**(`sharedBuffer`, `byteOffset`?): [`SharedMutex`](SharedMutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The shared buffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within the shared buffer. Defaults to `0`.

#### Returns

[`SharedMutex`](SharedMutex.md)

#### Source

[src/mutexes/sharedMutex.ts:50](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L50)

## Properties

### \_gate1

> `protected` **\_gate1**: [`ConditionVariable`](ConditionVariable.md)

#### Source

[src/mutexes/sharedMutex.ts:38](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L38)

***

### \_gate2

> `protected` **\_gate2**: [`ConditionVariable`](ConditionVariable.md)

#### Source

[src/mutexes/sharedMutex.ts:39](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L39)

***

### \_isReader

> `protected` **\_isReader**: `boolean`

#### Source

[src/mutexes/sharedMutex.ts:40](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L40)

***

### \_isWriter

> `protected` **\_isWriter**: `boolean`

#### Source

[src/mutexes/sharedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L41)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

#### Source

[src/mutexes/sharedMutex.ts:42](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L42)

***

### \_mutex

> `protected` **\_mutex**: [`TimedMutex`](TimedMutex.md)

#### Source

[src/mutexes/sharedMutex.ts:43](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L43)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Source

[src/mutexes/sharedMutex.ts:69](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L69)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Source

[src/mutexes/sharedMutex.ts:73](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L73)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Source

[src/mutexes/sharedMutex.ts:77](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L77)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Source

[src/mutexes/sharedMutex.ts:81](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L81)

***

### ownsSharedLock

> `get` **ownsSharedLock**(): `boolean`

Indicates whether the current agent owns a shared lock.

#### Returns

`boolean`

#### Source

[src/mutexes/sharedMutex.ts:85](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L85)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`lock`](../interfaces/Lockable.md#lock)

#### Throws

A [RelockError](RelockError.md) If the mutex is already locked by the caller.

#### Source

[src/mutexes/sharedMutex.ts:94](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L94)

***

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SharedLockable`](../interfaces/SharedLockable.md).[`lockShared`](../interfaces/SharedLockable.md#lockshared)

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Source

[src/mutexes/sharedMutex.ts:162](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L162)

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

[src/mutexes/sharedMutex.ts:115](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L115)

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

[`SharedLockable`](../interfaces/SharedLockable.md).[`tryLockShared`](../interfaces/SharedLockable.md#trylockshared)

#### Source

[src/mutexes/sharedMutex.ts:183](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L183)

***

### unlock()

> **unlock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`unlock`](../interfaces/Lockable.md#unlock)

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Source

[src/mutexes/sharedMutex.ts:140](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L140)

***

### unlockShared()

> **unlockShared**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SharedLockable`](../interfaces/SharedLockable.md).[`unlockShared`](../interfaces/SharedLockable.md#unlockshared)

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Source

[src/mutexes/sharedMutex.ts:214](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/mutexes/sharedMutex.ts#L214)
