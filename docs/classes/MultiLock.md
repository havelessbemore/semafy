[**semafy**](../README.md)

***

[semafy](../globals.md) / MultiLock

# Class: MultiLock

Defined in: [src/locks/multiLock.ts:16](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/multiLock.ts#L16)

A mutex ownership wrapper.

Locking a MultiLock exclusively locks the associated mutexes.

If the given mutexes implement [Lockable](../interfaces/Lockable.md), then MultiLock will too.
Otherwise, using attempted locking (`tryLock`) will result in errors.

## Implements

- [`Lockable`](../interfaces/Lockable.md)

## Constructors

### Constructor

> **new MultiLock**(...`mutexes`): `MultiLock`

Defined in: [src/locks/multiLock.ts:30](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/multiLock.ts#L30)

#### Parameters

##### mutexes

...[`BasicLockable`](../interfaces/BasicLockable.md)[]

The basic lockables to associate.

#### Returns

`MultiLock`

## Properties

### \_isOwner

> `protected` **\_isOwner**: `boolean`

Defined in: [src/locks/multiLock.ts:20](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/multiLock.ts#L20)

Indicates whether the current agent owns the lock.

***

### mutexes

> **mutexes**: [`BasicLockable`](../interfaces/BasicLockable.md)[]

Defined in: [src/locks/multiLock.ts:25](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/multiLock.ts#L25)

The associated basic lockable.

## Accessors

### ownsLock

#### Get Signature

> **get** **ownsLock**(): `boolean`

Defined in: [src/locks/multiLock.ts:35](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/multiLock.ts#L35)

Indicates whether the current agent owns the lock.

##### Returns

`boolean`

Indicates whether the current agent owns the lock.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`ownsLock`](../interfaces/Lockable.md#ownslock)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Defined in: [src/locks/multiLock.ts:39](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/multiLock.ts#L39)

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`lock`](../interfaces/Lockable.md#lock)

***

### swap()

> **swap**(`other`): `void`

Defined in: [src/locks/multiLock.ts:47](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/multiLock.ts#L47)

Exchange internal state

#### Parameters

##### other

`MultiLock`

#### Returns

`void`

***

### tryLock()

> **tryLock**(): `Promise`\<`boolean`\>

Defined in: [src/locks/multiLock.ts:58](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/multiLock.ts#L58)

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`tryLock`](../interfaces/Lockable.md#trylock)

***

### unlock()

> **unlock**(): `Promise`\<`void`\>

Defined in: [src/locks/multiLock.ts:63](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/multiLock.ts#L63)

Releases the lock held by the current agent.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`unlock`](../interfaces/Lockable.md#unlock)
