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

#### Defined in

[src/mutexes/mutex.ts:51](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L51)

### new Mutex()

> **new Mutex**(`sharedBuffer`, `byteOffset`?): [`Mutex`](Mutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`Mutex`](Mutex.md)

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](Mutex.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](Mutex.md#bytelength).

#### Defined in

[src/mutexes/mutex.ts:61](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L61)

## Properties

### \_isOwner

> `protected` **\_isOwner**: `boolean`

Indicates whether the current agent owns the lock.

#### Defined in

[src/mutexes/mutex.ts:44](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L44)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared memory for the mutex.

#### Defined in

[src/mutexes/mutex.ts:49](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L49)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number` = `Int32Array.BYTES_PER_ELEMENT`

The size in bytes of the mutex.

#### Defined in

[src/mutexes/mutex.ts:39](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L39)

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

[src/mutexes/mutex.ts:74](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L74)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteLength`](../interfaces/SharedResource.md#bytelength)

#### Defined in

[src/mutexes/mutex.ts:78](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L78)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteOffset`](../interfaces/SharedResource.md#byteoffset)

#### Defined in

[src/mutexes/mutex.ts:82](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L82)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`ownsLock`](../interfaces/SyncLockable.md#ownslock)

#### Defined in

[src/mutexes/mutex.ts:86](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L86)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`lock`](../interfaces/Lockable.md#lock)

#### Defined in

[src/mutexes/mutex.ts:93](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L93)

***

### lockSync()

> **lockSync**(): `void`

#### Returns

`void`

#### Throws

A [RelockError](RelockError.md) If the lock is already locked by the caller.

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`lockSync`](../interfaces/SyncLockable.md#locksync)

#### Defined in

[src/mutexes/mutex.ts:112](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L112)

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

[src/mutexes/mutex.ts:125](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L125)

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

#### Defined in

[src/mutexes/mutex.ts:129](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L129)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`unlock`](../interfaces/Lockable.md#unlock)

#### Defined in

[src/mutexes/mutex.ts:141](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L141)

***

### unlockSync()

> **unlockSync**(): `void`

#### Returns

`void`

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SyncLockable`](../interfaces/SyncLockable.md).[`unlockSync`](../interfaces/SyncLockable.md#unlocksync)

#### Defined in

[src/mutexes/mutex.ts:148](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/mutex.ts#L148)
