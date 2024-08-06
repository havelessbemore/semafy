[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / UniqueLock

# Class: UniqueLock

A mutex ownership wrapper.

Locking a UniqueLock exclusively locks the associated mutex.

If the given mutex implements [Lockable](../interfaces/Lockable.md), then UniqueLock will too.
If the given mutex implements [TimedLockable](../interfaces/TimedLockable.md), then UniqueLock will too.
Otherwise, using attempted locking (e.g. `tryLock`) or timed methods
(e.g. `tryLockFor`, `tryLockUntil`) will result in errors.

## Implements

- [`TimedLockable`](../interfaces/TimedLockable.md)
- [`SyncTimedLockable`](../interfaces/SyncTimedLockable.md)

## Constructors

### new UniqueLock()

> **new UniqueLock**(`mutex`?): [`UniqueLock`](UniqueLock.md)

#### Parameters

• **mutex?**: [`BasicLockable`](../interfaces/BasicLockable.md) \| [`SyncBasicLockable`](../interfaces/SyncBasicLockable.md)

The basic lockable to associate.

#### Returns

[`UniqueLock`](UniqueLock.md)

#### Defined in

[src/locks/uniqueLock.ts:27](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L27)

## Properties

### mutex

> **mutex**: `undefined` \| [`BasicLockable`](../interfaces/BasicLockable.md) \| [`SyncBasicLockable`](../interfaces/SyncBasicLockable.md)

The associated basic lockable.

#### Defined in

[src/locks/uniqueLock.ts:22](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L22)

## Accessors

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`ownsLock`](../interfaces/SyncTimedLockable.md#ownslock)

#### Defined in

[src/locks/uniqueLock.ts:31](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L31)

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

[src/locks/uniqueLock.ts:35](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L35)

***

### lockSync()

> **lockSync**(): `void`

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`void`

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`lockSync`](../interfaces/SyncTimedLockable.md#locksync)

#### Defined in

[src/locks/uniqueLock.ts:39](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L39)

***

### swap()

> **swap**(`other`): `void`

Exchanges the internal states of the unique locks.

#### Parameters

• **other**: [`UniqueLock`](UniqueLock.md)

#### Returns

`void`

#### Defined in

[src/locks/uniqueLock.ts:46](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L46)

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

[src/locks/uniqueLock.ts:52](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L52)

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

[src/locks/uniqueLock.ts:60](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L60)

***

### tryLockForSync()

> **tryLockForSync**(`timeout`): `boolean`

Blocks for the provided duration or until a lock is acquired.

#### Parameters

• **timeout**: `number`

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`tryLockForSync`](../interfaces/SyncTimedLockable.md#trylockforsync)

#### Defined in

[src/locks/uniqueLock.ts:64](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L64)

***

### tryLockSync()

> **tryLockSync**(): `boolean`

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`tryLockSync`](../interfaces/SyncTimedLockable.md#trylocksync)

#### Defined in

[src/locks/uniqueLock.ts:56](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L56)

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

[src/locks/uniqueLock.ts:68](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L68)

***

### tryLockUntilSync()

> **tryLockUntilSync**(`timestamp`): `boolean`

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

• **timestamp**: `number`

#### Returns

`boolean`

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`tryLockUntilSync`](../interfaces/SyncTimedLockable.md#trylockuntilsync)

#### Defined in

[src/locks/uniqueLock.ts:72](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L72)

***

### unlock()

> **unlock**(): `void` \| `Promise`\<`void`\>

Releases the lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)

#### Defined in

[src/locks/uniqueLock.ts:76](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L76)

***

### unlockSync()

> **unlockSync**(): `void`

Releases the lock held by the current agent.

#### Returns

`void`

#### Implementation of

[`SyncTimedLockable`](../interfaces/SyncTimedLockable.md).[`unlockSync`](../interfaces/SyncTimedLockable.md#unlocksync)

#### Defined in

[src/locks/uniqueLock.ts:80](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/uniqueLock.ts#L80)
