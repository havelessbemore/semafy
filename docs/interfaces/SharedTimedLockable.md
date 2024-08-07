[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / SharedTimedLockable

# Interface: SharedTimedLockable

Extends the [SharedLockable](SharedLockable.md) interface to include timed blocking.

## Extends

- [`SharedLockable`](SharedLockable.md)

## Properties

### ownsSharedLock

> **ownsSharedLock**: `Readonly`\<`boolean`\>

Indicates whether the current agent owns a shared lock.

#### Inherited from

[`SharedLockable`](SharedLockable.md).[`ownsSharedLock`](SharedLockable.md#ownssharedlock)

#### Defined in

[src/types/sharedLockable.ts:8](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sharedLockable.ts#L8)

## Methods

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

Blocks until a shared lock can be acquired for the current
agent. If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`SharedLockable`](SharedLockable.md).[`lockShared`](SharedLockable.md#lockshared)

#### Defined in

[src/types/sharedLockable.ts:14](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sharedLockable.ts#L14)

***

### tryLockShared()

> **tryLockShared**(): `boolean` \| `Promise`\<`boolean`\>

Attempts to acquire a shared lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Inherited from

[`SharedLockable`](SharedLockable.md).[`tryLockShared`](SharedLockable.md#trylockshared)

#### Defined in

[src/types/sharedLockable.ts:23](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sharedLockable.ts#L23)

***

### tryLockSharedFor()

> **tryLockSharedFor**(`timeout`): `Promise`\<`boolean`\>

Blocks for the provided duration or until a lock is acquired.

#### Parameters

• **timeout**: `number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Defined in

[src/types/sharedTimedLockable.ts:12](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sharedTimedLockable.ts#L12)

***

### tryLockSharedUntil()

> **tryLockSharedUntil**(`timestamp`): `Promise`\<`boolean`\>

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

• **timestamp**: `number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Defined in

[src/types/sharedTimedLockable.ts:19](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sharedTimedLockable.ts#L19)

***

### unlockShared()

> **unlockShared**(): `void` \| `Promise`\<`void`\>

Releases the shared lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`SharedLockable`](SharedLockable.md).[`unlockShared`](SharedLockable.md#unlockshared)

#### Defined in

[src/types/sharedLockable.ts:28](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sharedLockable.ts#L28)
