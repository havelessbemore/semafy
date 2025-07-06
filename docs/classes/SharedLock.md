[**semafy**](../README.md)

***

[semafy](../globals.md) / SharedLock

# Class: SharedLock

Defined in: [src/locks/sharedLock.ts:14](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/sharedLock.ts#L14)

A shared mutex wrapper.

Locking a SharedLock locks the associated shared mutex in shared mode.

If the shared mutex implements [SharedTimedLockable](../interfaces/SharedTimedLockable.md), then SharedLock
will also implement it. Otherwise, attempts to use timed methods
(`tryLockFor`, `tryLockUntil`) will result in errors.

## Implements

- [`TimedLockable`](../interfaces/TimedLockable.md)

## Constructors

### Constructor

> **new SharedLock**(`mutex?`): `SharedLock`

Defined in: [src/locks/sharedLock.ts:23](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/sharedLock.ts#L23)

#### Parameters

##### mutex?

[`SharedLockable`](../interfaces/SharedLockable.md)

The shared lockable to associate.

#### Returns

`SharedLock`

## Properties

### mutex

> **mutex**: `undefined` \| [`SharedLockable`](../interfaces/SharedLockable.md)

Defined in: [src/locks/sharedLock.ts:18](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/sharedLock.ts#L18)

The associated mutex.

## Accessors

### ownsLock

#### Get Signature

> **get** **ownsLock**(): `boolean`

Defined in: [src/locks/sharedLock.ts:27](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/sharedLock.ts#L27)

Indicates whether the current agent owns the lock.

##### Returns

`boolean`

Indicates whether the current agent owns the lock.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`ownsLock`](../interfaces/TimedLockable.md#ownslock)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/locks/sharedLock.ts:31](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/sharedLock.ts#L31)

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`lock`](../interfaces/TimedLockable.md#lock)

***

### swap()

> **swap**(`other`): `void`

Defined in: [src/locks/sharedLock.ts:38](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/sharedLock.ts#L38)

Exchanges the internal states of the shared locks.

#### Parameters

##### other

`SharedLock`

#### Returns

`void`

***

### tryLock()

> **tryLock**(): `boolean` \| `Promise`\<`boolean`\>

Defined in: [src/locks/sharedLock.ts:44](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/sharedLock.ts#L44)

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`boolean` \| `Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLock`](../interfaces/TimedLockable.md#trylock)

***

### tryLockFor()

> **tryLockFor**(`timeout`): `Promise`\<`boolean`\>

Defined in: [src/locks/sharedLock.ts:48](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/sharedLock.ts#L48)

Blocks for the provided duration or until a lock is acquired.

#### Parameters

##### timeout

`number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLockFor`](../interfaces/TimedLockable.md#trylockfor)

***

### tryLockUntil()

> **tryLockUntil**(`timestamp`): `Promise`\<`boolean`\>

Defined in: [src/locks/sharedLock.ts:52](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/sharedLock.ts#L52)

Blocks until the provided timestamp is reached or a lock is acquired.

#### Parameters

##### timestamp

`number`

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`tryLockUntil`](../interfaces/TimedLockable.md#trylockuntil)

***

### unlock()

> **unlock**(): `void` \| `Promise`\<`void`\>

Defined in: [src/locks/sharedLock.ts:56](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/sharedLock.ts#L56)

Releases the lock held by the current agent.

#### Returns

`void` \| `Promise`\<`void`\>

#### Implementation of

[`TimedLockable`](../interfaces/TimedLockable.md).[`unlock`](../interfaces/TimedLockable.md#unlock)
