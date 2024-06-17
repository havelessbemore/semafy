[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / SyncLockable

# Interface: SyncLockable

Extends the [SyncBasicLockable](SyncBasicLockable.md) interface to include attempted locking.

## Extends

- [`SyncBasicLockable`](SyncBasicLockable.md)

## Extended by

- [`SyncTimedLockable`](SyncTimedLockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Indicates whether the current agent owns the lock.

#### Inherited from

[`SyncBasicLockable`](SyncBasicLockable.md).[`ownsLock`](SyncBasicLockable.md#ownslock)

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

[`SyncBasicLockable`](SyncBasicLockable.md).[`lockSync`](SyncBasicLockable.md#locksync)

#### Source

[src/types/sync/syncBasicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sync/syncBasicLockable.ts#L15)

***

### tryLockSync()

> **tryLockSync**(): `boolean`

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Source

[src/types/sync/syncLockable.ts:14](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sync/syncLockable.ts#L14)

***

### unlockSync()

> **unlockSync**(): `void`

Releases the lock held by the current agent.

#### Returns

`void`

#### Inherited from

[`SyncBasicLockable`](SyncBasicLockable.md).[`unlockSync`](SyncBasicLockable.md#unlocksync)

#### Source

[src/types/sync/syncBasicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sync/syncBasicLockable.ts#L20)
