[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / Latch

# Class: Latch

A synchronization primitive that allows one or more agents to wait until
a set of operations has been completed.

## Constructors

### new Latch()

> **new Latch**(`expected`): [`Latch`](Latch.md)

#### Parameters

• **expected**: `number`

The initial value of the internal counter. Must be non-negative and
not exceed [Latch.Max](Latch.md#max).

#### Returns

[`Latch`](Latch.md)

#### Throws

A RangeError if `expected` is negative or exceeds [Latch.Max](Latch.md#max).

#### Source

[src/barriers/latch.ts:48](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/barriers/latch.ts#L48)

### new Latch()

> **new Latch**(`sharedBuffer`, `byteOffset`?): [`Latch`](Latch.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The shared buffer that backs the latch.

• **byteOffset?**: `number`

The byte offset within the shared buffer. Defaults to `0`.

#### Returns

[`Latch`](Latch.md)

#### Source

[src/barriers/latch.ts:53](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/barriers/latch.ts#L53)

## Properties

### \_gate

> `protected` **\_gate**: [`ConditionVariable`](ConditionVariable.md)

Condition variable to manage waiting agents.

#### Source

[src/barriers/latch.ts:30](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/barriers/latch.ts#L30)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared atomic memory for the internal counter.

#### Source

[src/barriers/latch.ts:35](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/barriers/latch.ts#L35)

***

### \_mutex

> `protected` **\_mutex**: [`Lockable`](../interfaces/Lockable.md)

Mutex to protect access to the internal counter.

#### Source

[src/barriers/latch.ts:40](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/barriers/latch.ts#L40)

***

### Max

> `static` `readonly` **Max**: `2147483647` = `MAX_INT32_VALUE`

The maximum possible value of the internal counter.

#### Source

[src/barriers/latch.ts:25](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/barriers/latch.ts#L25)

## Methods

### arriveAndWait()

> **arriveAndWait**(`n`): `Promise`\<`void`\>

Decrements the counter by a specified amount, then waits for it to reach zero.

If the counter is decremented to zero, waiting agents are notified.

#### Parameters

• **n**: `number`= `1`

The amount to decrement the counter.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the internal count reaches zero,
allowing the agent to proceed.

#### Throws

A RangeError If `n` is negative or exceeds the current count.

#### Source

[src/barriers/latch.ts:139](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/barriers/latch.ts#L139)

***

### countDown()

> **countDown**(`n`): `Promise`\<`void`\>

Decrements the counter by a specified amount.

If the counter reaches zero, waiting agents are notified.

#### Parameters

• **n**: `number`= `1`

The amount to decrement the counter.

#### Returns

`Promise`\<`void`\>

#### Throws

A RangeError If `n` is negative or exceeds the current count.

#### Source

[src/barriers/latch.ts:99](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/barriers/latch.ts#L99)

***

### tryWait()

> **tryWait**(): `boolean`

Tests if the counter has reached zero.

#### Returns

`boolean`

`true` if the current count is zero, otherwise `false`.

#### Source

[src/barriers/latch.ts:178](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/barriers/latch.ts#L178)

***

### wait()

> **wait**(): `Promise`\<`void`\>

Wait until the counter reaches zero.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the internal count reaches zero,
allowing the agent to proceed.

#### Source

[src/barriers/latch.ts:188](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/barriers/latch.ts#L188)
