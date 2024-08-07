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

#### Defined in

[src/types/sync/syncBasicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sync/syncBasicLockable.ts#L9)

## Methods

### lockSync()

> **lockSync**(): `void`

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`void`

#### Defined in

[src/types/sync/syncBasicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sync/syncBasicLockable.ts#L15)

***

### unlockSync()

> **unlockSync**(): `void`

Releases the lock held by the current agent.

#### Returns

`void`

#### Defined in

[src/types/sync/syncBasicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sync/syncBasicLockable.ts#L20)
