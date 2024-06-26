[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / MultiLock

# Class: MultiLock

A mutex ownership wrapper.

Locking a MultiLock exclusively locks the associated mutexes.

If the given mutexes implement [Lockable](../interfaces/Lockable.md), then MultiLock will too.
Otherwise, using attempted locking (`tryLock`) will result in errors.

## Implements

- [`Lockable`](../interfaces/Lockable.md)

## Constructors

### new MultiLock()

> **new MultiLock**(...`mutexes`): [`MultiLock`](MultiLock.md)

#### Parameters

• ...**mutexes**: [`BasicLockable`](../interfaces/BasicLockable.md)[]

The basic lockables to associate.

#### Returns

[`MultiLock`](MultiLock.md)

#### Source

[src/locks/multiLock.ts:30](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/locks/multiLock.ts#L30)

## Properties

### \_isOwner

> `protected` **\_isOwner**: `boolean`

Indicates whether the current agent owns the lock.

#### Source

[src/locks/multiLock.ts:20](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/locks/multiLock.ts#L20)

***

### mutexes

> **mutexes**: [`BasicLockable`](../interfaces/BasicLockable.md)[]

The associated basic lockable.

#### Source

[src/locks/multiLock.ts:25](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/locks/multiLock.ts#L25)

## Accessors

### ownsLock

> `get` **ownsLock**(): `boolean`

Indicates whether the current agent owns the lock.

#### Returns

`boolean`

#### Source

[src/locks/multiLock.ts:35](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/locks/multiLock.ts#L35)

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

Blocks until the lock can be acquired for the current agent.
If an exception is thrown, no lock is acquired.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`lock`](../interfaces/Lockable.md#lock)

#### Source

[src/locks/multiLock.ts:39](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/locks/multiLock.ts#L39)

***

### swap()

> **swap**(`other`): `void`

Exchange internal state

#### Parameters

• **other**: [`MultiLock`](MultiLock.md)

#### Returns

`void`

#### Source

[src/locks/multiLock.ts:47](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/locks/multiLock.ts#L47)

***

### tryLock()

> **tryLock**(): `Promise`\<`boolean`\>

Attempts to acquire the lock for the current agent
without blocking until acquired. If an exception
is thrown, no lock is obtained.

#### Returns

`Promise`\<`boolean`\>

`true` if the lock was acquired, `false` otherwise.

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`tryLock`](../interfaces/Lockable.md#trylock)

#### Source

[src/locks/multiLock.ts:58](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/locks/multiLock.ts#L58)

***

### unlock()

> **unlock**(): `Promise`\<`void`\>

Releases the lock held by the current agent.

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Lockable`](../interfaces/Lockable.md).[`unlock`](../interfaces/Lockable.md#unlock)

#### Source

[src/locks/multiLock.ts:63](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/locks/multiLock.ts#L63)
