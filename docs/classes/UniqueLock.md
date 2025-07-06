[**semafy**](../README.md)

***

[semafy](../globals.md) / UniqueLock

# Class: UniqueLock

Defined in: [src/locks/uniqueLock.ts:18](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L18)

A mutex ownership wrapper.

Locking a UniqueLock exclusively locks the associated mutex.

If the given mutex implements [Lockable](../interfaces/Lockable.md), then UniqueLock will too.
If the given mutex implements [TimedLockable](../interfaces/TimedLockable.md), then UniqueLock will too.
Otherwise, using attempted locking (e.g. `tryLock`) or timed methods
(e.g. `tryLockFor`, `tryLockUntil`) will result in errors.

## Implements

- [`TimedLockable`](../interfaces/TimedLockable.md)
- [`SyncTimedLockable`](../interfaces/SyncTimedLockable.md)

## Constructors

### Constructor

> **new UniqueLock**(`mutex?`): `UniqueLock`

Defined in: [src/locks/uniqueLock.ts:27](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L27)

#### Parameters

##### mutex?

The basic lockable to associate.

[`BasicLockable`](../interfaces/BasicLockable.md) | [`SyncBasicLockable`](../interfaces/SyncBasicLockable.md)

#### Returns

`UniqueLock`

## Properties

### mutex

> **mutex**: `undefined` \| [`BasicLockable`](../interfaces/BasicLockable.md) \| [`SyncBasicLockable`](../interfaces/SyncBasicLockable.md)

Defined in: [src/locks/uniqueLock.ts:22](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L22)

The associated basic lockable.

## Accessors

### ownsLock

#### Get Signature

> **get** **ownsLock**(): `boolean`

Defined in: [src/locks/uniqueLock.ts:31](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L31)

Indicates whether the current agent owns the lock.

##### Returns

`boolean`

Indicates whether the current agent owns the lock.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`ownsLock`](../interfaces/SyncTimedLockable.md#ownslock)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/locks/uniqueLock.ts:35](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L35)

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

***

### lockSync()

> **lockSync**(): `void`

Defined in: [src/locks/uniqueLock.ts:39](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L39)

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`void`

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`lockSync`](../interfaces/SyncTimedLockable.md#locksync)

***

### swap()

> **swap**(`other`): `void`

Defined in: [src/locks/uniqueLock.ts:46](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L46)

Exchanges the internal states of the unique locks.

#### Parameters

##### other

`UniqueLock`

#### Returns

`void`

***

### tryLock()

> **tryLock**(): `boolean` \| `Promise`\<`boolean`\>

Defined in: [src/locks/uniqueLock.ts:52](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L52)

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLock`](../interfaces/TimedLockable.md#trylock)

***

### tryLockFor()

> **tryLockFor**(`timeout`): `Promise`\<`boolean`\>

Defined in: [src/locks/uniqueLock.ts:60](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L60)

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

Defined in: [src/locks/uniqueLock.ts:64](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L64)

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

Defined in: [src/locks/uniqueLock.ts:56](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L56)

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`tryLockSync`](../interfaces/SyncTimedLockable.md#trylocksync)

***

### tryLockUntil()

> **tryLockUntil**(`timestamp`): `Promise`\<`boolean`\>

Defined in: [src/locks/uniqueLock.ts:68](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L68)

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

Defined in: [src/locks/uniqueLock.ts:72](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L72)

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

> **unlock**(): `void` \| `Promise`\<`void`\>

Defined in: [src/locks/uniqueLock.ts:76](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L76)

Releases the lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

***

### unlockSync()

> **unlockSync**(): `void`

Defined in: [src/locks/uniqueLock.ts:80](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/uniqueLock.ts#L80)

Releases the lock held by the current agent.

#### Returns

`void`

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`unlockSync`](../interfaces/SyncTimedLockable.md#unlocksync)
