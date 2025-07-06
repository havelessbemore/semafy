[**semafy**](../README.md)

***

[semafy](../globals.md) / SharedTimedLockable

# Interface: SharedTimedLockable

Defined in: [src/types/sharedTimedLockable.ts:6](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedTimedLockable.ts#L6)

Extends the [SharedLockable](SharedLockable.md) interface to include timed blocking.

## Extends

- [`SharedLockable`](SharedLockable.md)

## Properties

### ownsSharedLock

> **ownsSharedLock**: `Readonly`\<`boolean`\>

Defined in: [src/types/sharedLockable.ts:8](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedLockable.ts#L8)

Indicates whether the current agent owns a shared lock.

#### Inherited from

[`SharedLockable`](SharedLockable.md).[`ownsSharedLock`](SharedLockable.md#ownssharedlock)

## Methods

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

Defined in: [src/types/sharedLockable.ts:14](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedLockable.ts#L14)

Blocks until a shared lock can be acquired for the current
agent. If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SharedLockable`](SharedLockable.md).[`lockShared`](SharedLockable.md#lockshared)

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

#### Inherited from

[`SharedLockable`](SharedLockable.md).[`tryLockShared`](SharedLockable.md#trylockshared)

***

### tryLockSharedFor()

> **tryLockSharedFor**(`timeout`): `Promise`\<`boolean`\>

Defined in: [src/types/sharedTimedLockable.ts:12](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedTimedLockable.ts#L12)

Blocks for the provided duration or until a lock is acquired.

#### Parameters

##### timeout

`number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

***

### tryLockSharedUntil()

> **tryLockSharedUntil**(`timestamp`): `Promise`\<`boolean`\>

Defined in: [src/types/sharedTimedLockable.ts:19](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedTimedLockable.ts#L19)

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

##### timestamp

`number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

***

### unlockShared()

> **unlockShared**(): `void` \| `Promise`\<`void`\>

Defined in: [src/types/sharedLockable.ts:28](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedLockable.ts#L28)

Releases the shared lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`SharedLockable`](SharedLockable.md).[`unlockShared`](SharedLockable.md#unlockshared)
