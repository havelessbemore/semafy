[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / SharedLock

# Class: SharedLock

A shared mutex wrapper.

Locking a SharedLock locks the associated shared mutex in shared mode.

If the shared mutex implements [SharedTimedLockable](../interfaces/SharedTimedLockable.md), then SharedLock
will also implement it. Otherwise, attempts to use timed methods
(`tryLockFor`, `tryLockUntil`) will result in errors.

## Implements

- [`TimedLockable`](../interfaces/TimedLockable.md)

## Constructors

### new SharedLock()

> **new SharedLock**(`mutex`?): [`SharedLock`](SharedLock.md)

#### Parameters

• **mutex?**: [`SharedLockable`](../interfaces/SharedLockable.md)

The shared lockable to associate.

#### Returns

[`SharedLock`](SharedLock.md)

#### Defined in

[src/locks/sharedLock.ts:23](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/locks/sharedLock.ts#L23)

## Properties

### mutex

> **mutex**: `undefined` \| [`SharedLockable`](../interfaces/SharedLockable.md)

The associated mutex.

#### Defined in

[src/locks/sharedLock.ts:18](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/locks/sharedLock.ts#L18)

## Accessors

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`ownsLock`](../interfaces/TimedLockable.md#ownslock)

#### Defined in

[src/locks/sharedLock.ts:27](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/locks/sharedLock.ts#L27)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

#### Defined in

[src/locks/sharedLock.ts:31](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/locks/sharedLock.ts#L31)

***

### swap()

> **swap**(`other`): `void`

Exchanges the internal states of the shared locks.

#### Parameters

• **other**: [`SharedLock`](SharedLock.md)

#### Returns

`void`

#### Defined in

[src/locks/sharedLock.ts:38](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/locks/sharedLock.ts#L38)

***

### tryLock()

> **tryLock**(): `boolean` \| `Promise`\<`boolean`\>

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLock`](../interfaces/TimedLockable.md#trylock)

#### Defined in

[src/locks/sharedLock.ts:44](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/locks/sharedLock.ts#L44)

***

### tryLockFor()

> **tryLockFor**(`timeout`): `Promise`\<`boolean`\>

Blocks for the provided duration or until a lock is acquired.

#### Parameters

• **timeout**: `number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLockFor`](../interfaces/TimedLockable.md#trylockfor)

#### Defined in

[src/locks/sharedLock.ts:48](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/locks/sharedLock.ts#L48)

***

### tryLockUntil()

> **tryLockUntil**(`timestamp`): `Promise`\<`boolean`\>

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

• **timestamp**: `number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLockUntil`](../interfaces/TimedLockable.md#trylockuntil)

#### Defined in

[src/locks/sharedLock.ts:52](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/locks/sharedLock.ts#L52)

***

### unlock()

> **unlock**(): `void` \| `Promise`\<`void`\>

Releases the lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

#### Defined in

[src/locks/sharedLock.ts:56](https://github.com/havelessbemore/semafy/blob/cdfb44edc28a367e6c7c0367d952ab96ae7d9e6d/src/locks/sharedLock.ts#L56)
