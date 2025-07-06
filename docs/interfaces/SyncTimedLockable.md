[**semafy**](../README.md)

***

[semafy](../globals.md) / SyncTimedLockable

# Interface: SyncTimedLockable

Defined in: [src/types/sync/syncTimedLockable.ts:6](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncTimedLockable.ts#L6)

Extends the [SyncLockable](SyncLockable.md) interface to include timed blocking.

## Extends

- [`SyncLockable`](SyncLockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Defined in: [src/types/sync/syncBasicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncBasicLockable.ts#L9)

Indicates whether the current agent owns the lock.

#### Inherited from

[`SyncLockable`](SyncLockable.md).[`ownsLock`](SyncLockable.md#ownslock)

## Methods

### lockSync()

> **lockSync**(): `void`

Defined in: [src/types/sync/syncBasicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncBasicLockable.ts#L15)

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`void`

#### Inherited from

[`SyncLockable`](SyncLockable.md).[`lockSync`](SyncLockable.md#locksync)

***

### tryLockForSync()

> **tryLockForSync**(`timeout`): `boolean`

Defined in: [src/types/sync/syncTimedLockable.ts:12](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncTimedLockable.ts#L12)

Blocks for the provided duration or until a lock is acquired.

#### Parameters

##### timeout

`number`

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

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

#### Inherited from

[`SyncLockable`](SyncLockable.md).[`tryLockSync`](SyncLockable.md#trylocksync)

***

### tryLockUntilSync()

> **tryLockUntilSync**(`timestamp`): `boolean`

Defined in: [src/types/sync/syncTimedLockable.ts:19](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncTimedLockable.ts#L19)

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

##### timestamp

`number`

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

[`SyncLockable`](SyncLockable.md).[`unlockSync`](SyncLockable.md#unlocksync)
