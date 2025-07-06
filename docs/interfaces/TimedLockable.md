[**semafy**](../README.md)

***

[semafy](../globals.md) / TimedLockable

# Interface: TimedLockable

Defined in: [src/types/timedLockable.ts:6](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/timedLockable.ts#L6)

Extends the [Lockable](Lockable.md) interface to include timed blocking.

## Extends

- [`Lockable`](Lockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Defined in: [src/types/basicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/basicLockable.ts#L9)

Indicates whether the current agent owns the lock.

#### Inherited from

[`Lockable`](Lockable.md).[`ownsLock`](Lockable.md#ownslock)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/types/basicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/basicLockable.ts#L15)

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`Lockable`](Lockable.md).[`lock`](Lockable.md#lock)

***

### tryLock()

> **tryLock**(): `boolean` \| `Promise`\<`boolean`\>

Defined in: [src/types/lockable.ts:14](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/lockable.ts#L14)

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Inherited from

[`Lockable`](Lockable.md).[`tryLock`](Lockable.md#trylock)

***

### tryLockFor()

> **tryLockFor**(`timeout`): `Promise`\<`boolean`\>

Defined in: [src/types/timedLockable.ts:12](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/timedLockable.ts#L12)

Blocks for the provided duration or until a lock is acquired.

#### Parameters

##### timeout

`number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

***

### tryLockUntil()

> **tryLockUntil**(`timestamp`): `Promise`\<`boolean`\>

Defined in: [src/types/timedLockable.ts:19](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/timedLockable.ts#L19)

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

##### timestamp

`number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

***

### unlock()

> **unlock**(): `void` \| `Promise`\<`void`\>

Defined in: [src/types/basicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/basicLockable.ts#L20)

Releases the lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`Lockable`](Lockable.md).[`unlock`](Lockable.md#unlock)
