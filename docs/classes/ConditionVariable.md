[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / ConditionVariable

# Class: ConditionVariable

A condition variable manages an atomic wait/block mechanism that
is tightly coupled with a mutex for safe cross-agent synchronization.

Behavior is undefined if:
   - The shared memory location is modified externally.

## Implements

- [`SharedResource`](../interfaces/SharedResource.md)

## Constructors

### new ConditionVariable()

> **new ConditionVariable**(): [`ConditionVariable`](ConditionVariable.md)

#### Returns

[`ConditionVariable`](ConditionVariable.md)

#### Source

[src/condVars/conditionVariable.ts:26](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L26)

### new ConditionVariable()

> **new ConditionVariable**(`sharedBuffer`, `byteOffset`?): [`ConditionVariable`](ConditionVariable.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the condition variable.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`ConditionVariable`](ConditionVariable.md)

#### Source

[src/condVars/conditionVariable.ts:31](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L31)

## Properties

### \_mem

> `private` **\_mem**: `Int32Array`

The shared atomic memory where the condition variable stores its state.

#### Source

[src/condVars/conditionVariable.ts:24](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L24)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Source

[src/condVars/conditionVariable.ts:43](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L43)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Source

[src/condVars/conditionVariable.ts:47](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L47)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Source

[src/condVars/conditionVariable.ts:51](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L51)

## Methods

### notify()

> **notify**(`count`): `number`

Notify waiting agents that are blocked on this condition variable.

#### Parameters

• **count**: `number`

The number of agents to notify.

#### Returns

`number`

The number of agents that were notified.

#### Source

[src/condVars/conditionVariable.ts:62](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L62)

***

### notifyAll()

> **notifyAll**(): `number`

Notify all waiting agents that are blocked on this condition variable.

#### Returns

`number`

The number of agents that were notified.

#### Source

[src/condVars/conditionVariable.ts:71](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L71)

***

### notifyOne()

> **notifyOne**(): `number`

Notify one waiting agent that is blocked on this condition variable.

#### Returns

`number`

The number of agents that were notified.

#### Source

[src/condVars/conditionVariable.ts:80](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L80)

***

### wait()

> **wait**(`mutex`): `Promise`\<`void`\>

Blocks the current agent until this condition variable is notified.
The associated mutex is released before blocking and re-acquired
after waking up.

#### Parameters

• **mutex**: [`BasicLockable`](../interfaces/BasicLockable.md)

The mutex that must be locked by the current agent.

#### Returns

`Promise`\<`void`\>

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Throws

A RangeError If the shared memory data is unexpected.

#### Source

[src/condVars/conditionVariable.ts:94](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L94)

***

### waitFor()

> **waitFor**(`mutex`, `timeout`): `Promise`\<[`CVStatus`](../type-aliases/CVStatus.md)\>

Blocks the current agent until this condition variable is notified,
or an optional timeout expires. The associated mutex is released
before blocking and re-acquired after waking up.

#### Parameters

• **mutex**: [`BasicLockable`](../interfaces/BasicLockable.md)

The mutex that must be locked by the current agent.

• **timeout**: `number`

A timeout in milliseconds after which the wait is aborted.

#### Returns

`Promise`\<[`CVStatus`](../type-aliases/CVStatus.md)\>

A [CVStatus](../type-aliases/CVStatus.md) representing the result of the operation.

#### Throws

An [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Throws

A RangeError If the shared memory data is unexpected.

#### Source

[src/condVars/conditionVariable.ts:111](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L111)

***

### waitUntil()

> **waitUntil**(`mutex`, `timestamp`): `Promise`\<[`CVStatus`](../type-aliases/CVStatus.md)\>

Blocks the current agent until this condition variable is notified,
or until a specified point in time is reached. The associated mutex
is released before blocking and re-acquired after waking up.

#### Parameters

• **mutex**: [`BasicLockable`](../interfaces/BasicLockable.md)

The mutex that must be locked by the current agent.

• **timestamp**: `number`

The absolute time in milliseconds at which the wait is aborted.

#### Returns

`Promise`\<[`CVStatus`](../type-aliases/CVStatus.md)\>

A [CVStatus](../type-aliases/CVStatus.md) representing the result of the operation.

#### Throws

A [OwnershipError](OwnershipError.md) If the mutex is not owned by the caller.

#### Throws

A RangeError If the shared memory data is unexpected.

#### Source

[src/condVars/conditionVariable.ts:148](https://github.com/havelessbemore/semafy/blob/149e7eb3316334bacba0da85965a5d191883e2fc/src/condVars/conditionVariable.ts#L148)
