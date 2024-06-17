[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / SyncTimedLockable

# Interface: SyncTimedLockable

Extends the [SyncLockable](SyncLockable.md) interface to include timed blocking.

## Extends

- [`SyncLockable`](SyncLockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Indicates whether the current agent owns the lock.

#### Inherited from

[`SyncLockable`](SyncLockable.md).[`ownsLock`](SyncLockable.md#ownslock)

#### Source

[src/types/sync/syncBasicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sync/syncBasicLockable.ts#L9)

## Methods

### lockSync()

> **lockSync**(): `void`

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`void`

#### Inherited from

[`SyncLockable`](SyncLockable.md).[`lockSync`](SyncLockable.md#locksync)

#### Source

[src/types/sync/syncBasicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sync/syncBasicLockable.ts#L15)

***

### tryLockForSync()

> **tryLockForSync**(`timeout`): `boolean`

Blocks for the provided duration or until a lock is acquired.

#### Parameters

• **timeout**: `number`

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Source

[src/types/sync/syncTimedLockable.ts:12](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sync/syncTimedLockable.ts#L12)

***

### tryLockSync()

> **tryLockSync**(): `boolean`

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Inherited from

[`SyncLockable`](SyncLockable.md).[`tryLockSync`](SyncLockable.md#trylocksync)

#### Source

[src/types/sync/syncLockable.ts:14](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sync/syncLockable.ts#L14)

***

### tryLockUntilSync()

> **tryLockUntilSync**(`timestamp`): `boolean`

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

• **timestamp**: `number`

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Source

[src/types/sync/syncTimedLockable.ts:19](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sync/syncTimedLockable.ts#L19)

***

### unlockSync()

> **unlockSync**(): `void`

Releases the lock held by the current agent.

#### Returns

`void`

#### Inherited from

[`SyncLockable`](SyncLockable.md).[`unlockSync`](SyncLockable.md#unlocksync)

#### Source

[src/types/sync/syncBasicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sync/syncBasicLockable.ts#L20)
