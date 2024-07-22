[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / RecursiveTimedMutex

# Class: RecursiveTimedMutex

Provides synchronization across agents (main thread and workers)
to allow exclusive recursive access to shared resources / blocks of code.

A mutex is owned once an agent successfully locks it.
During ownership, the agent may acquire additional locks from the
mutex. Ownership ends when the agent releases all aquired locks.

While owned, any other agents attempting to lock the mutex will
block (or receive `false` from `tryLock` methods). When unlocked,
any blocked agent will have the chance to acquire owernship.

The maximum number of times a mutex can be locked recursively
is defined by [RecursiveTimedMutex.Max](RecursiveMutex.md#max). Once reached, attempts
for additional locks will throw an error, and calls to `tryLock` methods
will return `false`.

Behavior is undefined if:
   - The mutex is destroyed while being owned.
   - The agent is terminated while owning the mutex.
   - The mutex's shared memory location is modified externally.

Timeout precision for time-based methods may vary due to system load
and inherent limitations of JavaScript timing. Developers should
consider this possible variability in their applications.

## Extends

- [`RecursiveMutex`](RecursiveMutex.md)

## Implements

- [`TimedLockable`](../interfaces/TimedLockable.md)
- [`SyncTimedLockable`](../interfaces/SyncTimedLockable.md)

## Constructors

### new RecursiveTimedMutex()

> **new RecursiveTimedMutex**(): [`RecursiveTimedMutex`](RecursiveTimedMutex.md)

#### Returns

[`RecursiveTimedMutex`](RecursiveTimedMutex.md)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`constructor`](RecursiveMutex.md#constructors)

#### Defined in

[src/mutexes/recursiveMutex.ts:60](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L60)

### new RecursiveTimedMutex()

> **new RecursiveTimedMutex**(`sharedBuffer`, `byteOffset`?): [`RecursiveTimedMutex`](RecursiveTimedMutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the mutex.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`RecursiveTimedMutex`](RecursiveTimedMutex.md)

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](RecursiveMutex.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](RecursiveMutex.md#bytelength).

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`constructor`](RecursiveMutex.md#constructors)

#### Defined in

[src/mutexes/recursiveMutex.ts:70](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L70)

## Properties

### \_depth

> `protected` **\_depth**: `number`

The number of locks acquired by the agent.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`_depth`](RecursiveMutex.md#_depth)

#### Defined in

[src/mutexes/recursiveMutex.ts:53](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L53)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared atomic memory for the mutex.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`_mem`](RecursiveMutex.md#_mem)

#### Defined in

[src/mutexes/recursiveMutex.ts:58](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L58)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number` = `Int32Array.BYTES_PER_ELEMENT`

The size in bytes of the mutex.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`ByteLength`](RecursiveMutex.md#bytelength)

#### Defined in

[src/mutexes/recursiveMutex.ts:43](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L43)

***

### Max

> `readonly` `static` **Max**: `2147483647` = `MAX_INT32_VALUE`

The maximum levels of recursive ownership.

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`Max`](RecursiveMutex.md#max)

#### Defined in

[src/mutexes/recursiveMutex.ts:48](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L48)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`buffer`](RecursiveMutex.md#buffer)

#### Defined in

[src/mutexes/recursiveMutex.ts:83](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L83)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`byteLength`](RecursiveMutex.md#bytelength-1)

#### Defined in

[src/mutexes/recursiveMutex.ts:87](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L87)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`byteOffset`](RecursiveMutex.md#byteoffset)

#### Defined in

[src/mutexes/recursiveMutex.ts:91](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L91)

***

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`ownsLock`](../interfaces/SyncTimedLockable.md#ownslock)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`ownsLock`](RecursiveMutex.md#ownslock)

#### Defined in

[src/mutexes/recursiveMutex.ts:95](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L95)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Throws

A RangeError If the mutex is already locked the maximum amount of times.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`lock`](RecursiveMutex.md#lock)

#### Defined in

[src/mutexes/recursiveMutex.ts:102](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L102)

***

### lockSync()

> **lockSync**(): `void`

#### Returns

`void`

#### Throws

A RangeError If the mutex is already locked the maximum amount of times.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`lockSync`](../interfaces/SyncTimedLockable.md#locksync)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`lockSync`](RecursiveMutex.md#locksync)

#### Defined in

[src/mutexes/recursiveMutex.ts:122](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L122)

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

[`RecursiveMutex`](RecursiveMutex.md).[`tryLock`](RecursiveMutex.md#trylock)

#### Defined in

[src/mutexes/recursiveMutex.ts:139](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L139)

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

[src/mutexes/recursiveTimedMutex.ts:40](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveTimedMutex.ts#L40)

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

[src/mutexes/recursiveTimedMutex.ts:44](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveTimedMutex.ts#L44)

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

[`RecursiveMutex`](RecursiveMutex.md).[`tryLockSync`](RecursiveMutex.md#trylocksync)

#### Defined in

[src/mutexes/recursiveMutex.ts:143](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L143)

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

[src/mutexes/recursiveTimedMutex.ts:48](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveTimedMutex.ts#L48)

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

[src/mutexes/recursiveTimedMutex.ts:72](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveTimedMutex.ts#L72)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`unlock`](RecursiveMutex.md#unlock)

#### Defined in

[src/mutexes/recursiveMutex.ts:162](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L162)

***

### unlockSync()

> **unlockSync**(): `void`

#### Returns

`void`

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`unlockSync`](../interfaces/SyncTimedLockable.md#unlocksync)

#### Inherited from

[`RecursiveMutex`](RecursiveMutex.md).[`unlockSync`](RecursiveMutex.md#unlocksync)

#### Defined in

[src/mutexes/recursiveMutex.ts:169](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/mutexes/recursiveMutex.ts#L169)
