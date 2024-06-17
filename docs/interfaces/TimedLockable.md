[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / TimedLockable

# Interface: TimedLockable

Extends the [Lockable](Lockable.md) interface to include timed blocking.

## Extends

- [`Lockable`](Lockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Indicates whether the current agent owns the lock.

#### Inherited from

[`Lockable`](Lockable.md).[`ownsLock`](Lockable.md#ownslock)

#### Source

[src/types/basicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/basicLockable.ts#L9)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Lockable`](Lockable.md).[`lock`](Lockable.md#lock)

#### Source

[src/types/basicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/basicLockable.ts#L15)

***

### tryLock()

> **tryLock**(): `boolean` \| `Promise`\<`boolean`\>

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Inherited from

[`Lockable`](Lockable.md).[`tryLock`](Lockable.md#trylock)

#### Source

[src/types/lockable.ts:14](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/lockable.ts#L14)

***

### tryLockFor()

> **tryLockFor**(`timeout`): `Promise`\<`boolean`\>

Blocks for the provided duration or until a lock is acquired.

#### Parameters

• **timeout**: `number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Source

[src/types/timedLockable.ts:12](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/timedLockable.ts#L12)

***

### tryLockUntil()

> **tryLockUntil**(`timestamp`): `Promise`\<`boolean`\>

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

• **timestamp**: `number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Source

[src/types/timedLockable.ts:19](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/timedLockable.ts#L19)

***

### unlock()

> **unlock**(): `void` \| `Promise`\<`void`\>

Releases the lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`Lockable`](Lockable.md).[`unlock`](Lockable.md#unlock)

#### Source

[src/types/basicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/basicLockable.ts#L20)
