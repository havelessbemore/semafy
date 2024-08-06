[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / Lockable

# Interface: Lockable

Extends the [BasicLockable](BasicLockable.md) interface to include attempted locking.

## Extends

- [`BasicLockable`](BasicLockable.md)

## Extended by

- [`TimedLockable`](TimedLockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Indicates whether the current agent owns the lock.

#### Inherited from

[`BasicLockable`](BasicLockable.md).[`ownsLock`](BasicLockable.md#ownslock)

#### Defined in

[src/types/basicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/basicLockable.ts#L9)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`BasicLockable`](BasicLockable.md).[`lock`](BasicLockable.md#lock)

#### Defined in

[src/types/basicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/basicLockable.ts#L15)

***

### tryLock()

> **tryLock**(): `boolean` \| `Promise`\<`boolean`\>

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Defined in

[src/types/lockable.ts:14](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/lockable.ts#L14)

***

### unlock()

> **unlock**(): `void` \| `Promise`\<`void`\>

Releases the lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`BasicLockable`](BasicLockable.md).[`unlock`](BasicLockable.md#unlock)

#### Defined in

[src/types/basicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/basicLockable.ts#L20)
