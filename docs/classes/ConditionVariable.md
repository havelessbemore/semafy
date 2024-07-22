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

#### Defined in

[src/condVars/conditionVariable.ts:31](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L31)

### new ConditionVariable()

> **new ConditionVariable**(`sharedBuffer`, `byteOffset`?): [`ConditionVariable`](ConditionVariable.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the condition variable.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`ConditionVariable`](ConditionVariable.md)

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](ConditionVariable.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](ConditionVariable.md#bytelength).

#### Defined in

[src/condVars/conditionVariable.ts:41](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L41)

## Properties

### ByteLength

> `readonly` `static` **ByteLength**: `number` = `Int32Array.BYTES_PER_ELEMENT`

The size in bytes of the condition variable.

#### Defined in

[src/condVars/conditionVariable.ts:24](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L24)

## Accessors

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`buffer`](../interfaces/SharedResource.md#buffer)

#### Defined in

[src/condVars/conditionVariable.ts:53](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L53)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteLength`](../interfaces/SharedResource.md#bytelength)

#### Defined in

[src/condVars/conditionVariable.ts:57](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L57)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteOffset`](../interfaces/SharedResource.md#byteoffset)

#### Defined in

[src/condVars/conditionVariable.ts:61](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L61)

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

#### Defined in

[src/condVars/conditionVariable.ts:72](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L72)

***

### notifyAll()

> **notifyAll**(): `number`

Notify all waiting agents that are blocked on this condition variable.

#### Returns

`number`

The number of agents that were notified.

#### Defined in

[src/condVars/conditionVariable.ts:81](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L81)

***

### notifyOne()

> **notifyOne**(): `number`

Notify one waiting agent that is blocked on this condition variable.

#### Returns

`number`

The number of agents that were notified.

#### Defined in

[src/condVars/conditionVariable.ts:90](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L90)

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

#### Defined in

[src/condVars/conditionVariable.ts:104](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L104)

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

#### Defined in

[src/condVars/conditionVariable.ts:121](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L121)

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

#### Defined in

[src/condVars/conditionVariable.ts:158](https://github.com/havelessbemore/semafy/blob/b402258eb8c8c3b4f24a474b97d376f26f034cec/src/condVars/conditionVariable.ts#L158)
