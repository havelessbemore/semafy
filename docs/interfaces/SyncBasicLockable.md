[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / SyncBasicLockable

# Interface: SyncBasicLockable

The base interface for types that provide exclusive
blocking for agents (i.e. main thread, workers).

## Extended by

- [`SyncLockable`](SyncLockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Indicates whether the current agent owns the lock.

#### Source

[src/types/sync/syncBasicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/24a3ea8dcb70f91d58fc18f17dc96fd55aaef829/src/types/sync/syncBasicLockable.ts#L9)

## Methods

### lockSync()

> **lockSync**(): `void`

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`void`

#### Source

[src/types/sync/syncBasicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/24a3ea8dcb70f91d58fc18f17dc96fd55aaef829/src/types/sync/syncBasicLockable.ts#L15)

***

### unlockSync()

> **unlockSync**(): `void`

Releases the lock held by the current agent.

#### Returns

`void`

#### Source

[src/types/sync/syncBasicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/24a3ea8dcb70f91d58fc18f17dc96fd55aaef829/src/types/sync/syncBasicLockable.ts#L20)
