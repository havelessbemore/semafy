[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / SharedLockable

# Interface: SharedLockable

Provides shared blocking semantics for agents (i.e. main thread, workers).

## Extended by

- [`SharedTimedLockable`](SharedTimedLockable.md)

## Properties

### ownsSharedLock

> **ownsSharedLock**: `Readonly`\<`boolean`\>

Indicates whether the current agent owns a shared lock.

#### Defined in

[src/types/sharedLockable.ts:8](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/types/sharedLockable.ts#L8)

## Methods

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

Blocks until a shared lock can be acquired for the current
agent. If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/sharedLockable.ts:14](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/types/sharedLockable.ts#L14)

***

### tryLockShared()

> **tryLockShared**(): `boolean` \| `Promise`\<`boolean`\>

Attempts to acquire a shared lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Defined in

[src/types/sharedLockable.ts:23](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/types/sharedLockable.ts#L23)

***

### unlockShared()

> **unlockShared**(): `void` \| `Promise`\<`void`\>

Releases the shared lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/types/sharedLockable.ts:28](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/types/sharedLockable.ts#L28)
