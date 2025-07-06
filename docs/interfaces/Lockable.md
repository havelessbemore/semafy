[**semafy**](../README.md)

***

[semafy](../globals.md) / Lockable

# Interface: Lockable

Defined in: [src/types/lockable.ts:6](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/lockable.ts#L6)

Extends the [BasicLockable](BasicLockable.md) interface to include attempted locking.

## Extends

- [`BasicLockable`](BasicLockable.md)

## Extended by

- [`TimedLockable`](TimedLockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Defined in: [src/types/basicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/basicLockable.ts#L9)

Indicates whether the current agent owns the lock.

#### Inherited from

[`BasicLockable`](BasicLockable.md).[`ownsLock`](BasicLockable.md#ownslock)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/types/basicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/basicLockable.ts#L15)

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`BasicLockable`](BasicLockable.md).[`lock`](BasicLockable.md#lock)

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

***

### unlock()

> **unlock**(): `void` \| `Promise`\<`void`\>

Defined in: [src/types/basicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/basicLockable.ts#L20)

Releases the lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`BasicLockable`](BasicLockable.md).[`unlock`](BasicLockable.md#unlock)
