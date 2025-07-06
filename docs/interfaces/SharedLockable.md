[**semafy**](../README.md)

***

[semafy](../globals.md) / SharedLockable

# Interface: SharedLockable

Defined in: [src/types/sharedLockable.ts:4](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedLockable.ts#L4)

Provides shared blocking semantics for agents (i.e. main thread, workers).

## Extended by

- [`SharedTimedLockable`](SharedTimedLockable.md)

## Properties

### ownsSharedLock

> **ownsSharedLock**: `Readonly`\<`boolean`\>

Defined in: [src/types/sharedLockable.ts:8](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedLockable.ts#L8)

Indicates whether the current agent owns a shared lock.

## Methods

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

Defined in: [src/types/sharedLockable.ts:14](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedLockable.ts#L14)

Blocks until a shared lock can be acquired for the current
agent. If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

***

### tryLockShared()

> **tryLockShared**(): `boolean` \| `Promise`\<`boolean`\>

Defined in: [src/types/sharedLockable.ts:23](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedLockable.ts#L23)

Attempts to acquire a shared lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

***

### unlockShared()

> **unlockShared**(): `void` \| `Promise`\<`void`\>

Defined in: [src/types/sharedLockable.ts:28](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedLockable.ts#L28)

Releases the shared lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>
