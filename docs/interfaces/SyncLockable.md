[**semafy**](../README.md)

***

[semafy](../globals.md) / SyncLockable

# Interface: SyncLockable

Defined in: [src/types/sync/syncLockable.ts:6](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncLockable.ts#L6)

Extends the [SyncBasicLockable](SyncBasicLockable.md) interface to include attempted locking.

## Extends

- [`SyncBasicLockable`](SyncBasicLockable.md)

## Extended by

- [`SyncTimedLockable`](SyncTimedLockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Defined in: [src/types/sync/syncBasicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncBasicLockable.ts#L9)

Indicates whether the current agent owns the lock.

#### Inherited from

[`SyncBasicLockable`](SyncBasicLockable.md).[`ownsLock`](SyncBasicLockable.md#ownslock)

## Methods

### lockSync()

> **lockSync**(): `void`

Defined in: [src/types/sync/syncBasicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncBasicLockable.ts#L15)

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`void`

#### Inherited from

[`SyncBasicLockable`](SyncBasicLockable.md).[`lockSync`](SyncBasicLockable.md#locksync)

***

### tryLockSync()

> **tryLockSync**(): `boolean`

Defined in: [src/types/sync/syncLockable.ts:14](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncLockable.ts#L14)

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

***

### unlockSync()

> **unlockSync**(): `void`

Defined in: [src/types/sync/syncBasicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncBasicLockable.ts#L20)

Releases the lock held by the current agent.

#### Returns

`void`

#### Inherited from

[`SyncBasicLockable`](SyncBasicLockable.md).[`unlockSync`](SyncBasicLockable.md#unlocksync)
