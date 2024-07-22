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

#### Defined in

[src/mutexes/sharedMutex.ts:50](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L50)

### new SharedMutex()

> **new SharedMutex**(`sharedBuffer`, `byteOffset`?): [`SharedMutex`](SharedMutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`SharedMutex`](SharedMutex.md)

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](SharedMutex.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](SharedMutex.md#bytelength).

#### Defined in

[src/mutexes/sharedMutex.ts:60](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L60)

## Properties

### \_gate1

> `protected` **\_gate1**: [`ConditionVariable`](ConditionVariable.md)

#### Defined in

[src/mutexes/sharedMutex.ts:43](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L43)

***

### \_gate2

> `protected` **\_gate2**: [`ConditionVariable`](ConditionVariable.md)

#### Defined in

[src/mutexes/sharedMutex.ts:44](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L44)

***

### \_isReader

> `protected` **\_isReader**: `boolean`

#### Defined in

[src/mutexes/sharedMutex.ts:45](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L45)

***

### \_isWriter

> `protected` **\_isWriter**: `boolean`

#### Defined in

[src/mutexes/sharedMutex.ts:46](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L46)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

#### Defined in

[src/mutexes/sharedMutex.ts:47](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L47)

***

### \_mutex

> `protected` **\_mutex**: [`TimedMutex`](TimedMutex.md)

#### Defined in

[src/mutexes/sharedMutex.ts:48](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L48)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number`

The size in bytes of the mutex.

#### Defined in

[src/mutexes/sharedMutex.ts:41](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L41)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`buffer`](../interfaces/SharedResource.md#buffer)

#### Defined in

[src/mutexes/sharedMutex.ts:79](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L79)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteLength`](../interfaces/SharedResource.md#bytelength)

#### Defined in

[src/mutexes/sharedMutex.ts:83](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L83)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteOffset`](../interfaces/SharedResource.md#byteoffset)

#### Defined in

[src/mutexes/sharedMutex.ts:87](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L87)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`ownsLock`](../interfaces/Lockable.md#ownslock)

#### Defined in

[src/mutexes/sharedMutex.ts:91](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L91)

***

### ownsSharedLock

> `get` **ownsSharedLock**(): `boolean`

Indicates whether the current agent owns a shared lock.

#### Returns

`boolean`

#### Implementation of

[`SharedLockable`](../interfaces/SharedLockable.md).[`ownsSharedLock`](../interfaces/SharedLockable.md#ownssharedlock)

#### Defined in

[src/mutexes/sharedMutex.ts:95](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L95)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the mutex is already locked by the caller.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`lock`](../interfaces/Lockable.md#lock)

#### Defined in

[src/mutexes/sharedMutex.ts:104](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L104)

***

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`SharedLockable`](../interfaces/SharedLockable.md).[`lockShared`](../interfaces/SharedLockable.md#lockshared)

#### Defined in

[src/mutexes/sharedMutex.ts:172](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L172)

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

#### Defined in

[src/mutexes/sharedMutex.ts:125](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L125)

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

#### Defined in

[src/mutexes/sharedMutex.ts:193](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L193)

***

### unlock()

> **unlock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`unlock`](../interfaces/Lockable.md#unlock)

#### Defined in

[src/mutexes/sharedMutex.ts:150](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L150)

***

### unlockShared()

> **unlockShared**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SharedLockable`](../interfaces/SharedLockable.md).[`unlockShared`](../interfaces/SharedLockable.md#unlockshared)

#### Defined in

[src/mutexes/sharedMutex.ts:224](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/sharedMutex.ts#L224)
