[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / BasicLockable

# Interface: BasicLockable

The base interface for types that provide exclusive
blocking for agents (i.e. main thread, workers).

## Extended by

- [`Lockable`](Lockable.md)

## Properties

### ownsLock

> **ownsLock**: `Readonly`\<`boolean`\>

Indicates whether the current agent owns the lock.

#### Defined in

[src/types/basicLockable.ts:9](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/types/basicLockable.ts#L9)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/types/basicLockable.ts:15](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/types/basicLockable.ts#L15)

***

### unlock()

> **unlock**(): `void` \| `Promise`\<`void`\>

Releases the lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Defined in

[src/types/basicLockable.ts:20](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/types/basicLockable.ts#L20)
