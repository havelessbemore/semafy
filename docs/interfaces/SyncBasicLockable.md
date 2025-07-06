[**semafy**](../README.md)

***

[semafy](../globals.md) / SyncBasicLockable

# Interface: SyncBasicLockable

Defined in: [src/types/sync/syncBasicLockable.ts:5](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncBasicLockable.ts#L5)

The base interface for types that provide exclusive
blocking for agents (i.e. main thread, workers).

## Extended by

- [`SyncLockable`](SyncLockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Defined in: [src/types/sync/syncBasicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncBasicLockable.ts#L9)

Indicates whether the current agent owns the lock.

## Methods

### lockSync()

> **lockSync**(): `void`

Defined in: [src/types/sync/syncBasicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncBasicLockable.ts#L15)

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`void`

***

### unlockSync()

> **unlockSync**(): `void`

Defined in: [src/types/sync/syncBasicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sync/syncBasicLockable.ts#L20)

Releases the lock held by the current agent.

#### Returns

`void`
