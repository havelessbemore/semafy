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

#### Defined in

[src/barriers/latch.ts:53](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L53)

### new Latch()

> **new Latch**(`sharedBuffer`, `byteOffset`?): [`Latch`](Latch.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the latch.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

[`Latch`](Latch.md)

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](Latch.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](Latch.md#bytelength).

#### Defined in

[src/barriers/latch.ts:63](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L63)

## Properties

### \_gate

> `protected` **\_gate**: [`ConditionVariable`](ConditionVariable.md)

Condition variable to manage waiting agents.

#### Defined in

[src/barriers/latch.ts:35](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L35)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared atomic memory for the internal counter.

#### Defined in

[src/barriers/latch.ts:40](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L40)

***

### \_mutex

> `protected` **\_mutex**: [`Lockable`](../interfaces/Lockable.md)

Mutex to protect access to the internal counter.

#### Defined in

[src/barriers/latch.ts:45](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L45)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number`

The size in bytes of the latch.

#### Defined in

[src/barriers/latch.ts:25](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L25)

***

### Max

> `readonly` `static` **Max**: `2147483647` = `MAX_INT32_VALUE`

The maximum possible value of the internal counter.

#### Defined in

[src/barriers/latch.ts:30](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L30)

## Methods

### arriveAndWait()

> **arriveAndWait**(`n`): `Promise`\<`void`\>

Decrements the counter by a specified amount, then waits for it to reach zero.

If the counter is decremented to zero, waiting agents are notified.

#### Parameters

• **n**: `number` = `1`

The amount to decrement the counter.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the internal count reaches zero,
allowing the agent to proceed.

#### Throws

A RangeError If `n` is negative or exceeds the current count.

#### Defined in

[src/barriers/latch.ts:149](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L149)

***

### countDown()

> **countDown**(`n`): `Promise`\<`void`\>

Decrements the counter by a specified amount.

If the counter reaches zero, waiting agents are notified.

#### Parameters

• **n**: `number` = `1`

The amount to decrement the counter.

#### Returns

`Promise`\<`void`\>

#### Throws

A RangeError If `n` is negative or exceeds the current count.

#### Defined in

[src/barriers/latch.ts:109](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L109)

***

### tryWait()

> **tryWait**(): `boolean`

Tests if the counter has reached zero.

#### Returns

`boolean`

`true` if the current count is zero, otherwise `false`.

#### Defined in

[src/barriers/latch.ts:188](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L188)

***

### wait()

> **wait**(): `Promise`\<`void`\>

Wait until the counter reaches zero.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the internal count reaches zero,
allowing the agent to proceed.

#### Defined in

[src/barriers/latch.ts:198](https://github.com/havelessbemore/semafy/blob/243ef563375eae7e1984d5c778f0c8e55910568b/src/barriers/latch.ts#L198)
