[**semafy**](../README.md)

***

[semafy](../globals.md) / Latch

# Class: Latch

Defined in: [src/barriers/latch.ts:21](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L21)

A synchronization primitive that allows one or more agents to wait until
a set of operations has been completed.

## Constructors

### Constructor

> **new Latch**(`expected`): `Latch`

Defined in: [src/barriers/latch.ts:53](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L53)

#### Parameters

##### expected

`number`

The initial value of the internal counter. Must be non-negative and
not exceed [Latch.Max](#max).

#### Returns

`Latch`

#### Throws

A RangeError if `expected` is negative or exceeds [Latch.Max](#max).

### Constructor

> **new Latch**(`sharedBuffer`, `byteOffset?`): `Latch`

Defined in: [src/barriers/latch.ts:63](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L63)

#### Parameters

##### sharedBuffer

`SharedArrayBuffer`

The SharedArrayBuffer that backs the latch.

##### byteOffset?

`number`

The byte offset within `sharedBuffer`. Defaults to `0`.

#### Returns

`Latch`

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](#bytelength).

## Properties

### \_gate

> `protected` **\_gate**: [`ConditionVariable`](ConditionVariable.md)

Defined in: [src/barriers/latch.ts:35](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L35)

Condition variable to manage waiting agents.

***

### \_mem

> `protected` **\_mem**: `Int32Array`

Defined in: [src/barriers/latch.ts:40](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L40)

The shared atomic memory for the internal counter.

***

### \_mutex

> `protected` **\_mutex**: [`Lockable`](../interfaces/Lockable.md)

Defined in: [src/barriers/latch.ts:45](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L45)

Mutex to protect access to the internal counter.

***

### ByteLength

> `readonly` `static` **ByteLength**: `number`

Defined in: [src/barriers/latch.ts:25](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L25)

The size in bytes of the latch.

***

### Max

> `readonly` `static` **Max**: `2147483647` = `MAX_INT32_VALUE`

Defined in: [src/barriers/latch.ts:30](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L30)

The maximum possible value of the internal counter.

## Methods

### arriveAndWait()

> **arriveAndWait**(`n`): `Promise`\<`void`\>

Defined in: [src/barriers/latch.ts:149](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L149)

Decrements the counter by a specified amount, then waits for it to reach zero.

If the counter is decremented to zero, waiting agents are notified.

#### Parameters

##### n

`number` = `1`

The amount to decrement the counter.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the internal count reaches zero,
allowing the agent to proceed.

#### Throws

A RangeError If `n` is negative or exceeds the current count.

***

### countDown()

> **countDown**(`n`): `Promise`\<`void`\>

Defined in: [src/barriers/latch.ts:109](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L109)

Decrements the counter by a specified amount.

If the counter reaches zero, waiting agents are notified.

#### Parameters

##### n

`number` = `1`

The amount to decrement the counter.

#### Returns

`Promise`\<`void`\>

#### Throws

A RangeError If `n` is negative or exceeds the current count.

***

### tryWait()

> **tryWait**(): `boolean`

Defined in: [src/barriers/latch.ts:188](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L188)

Tests if the counter has reached zero.

#### Returns

`boolean`

`true` if the current count is zero, otherwise `false`.

***

### wait()

> **wait**(): `Promise`\<`void`\>

Defined in: [src/barriers/latch.ts:198](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/barriers/latch.ts#L198)

Wait until the counter reaches zero.

#### Returns

`Promise`\<`void`\>

A promise that resolves once the internal count reaches zero,
allowing the agent to proceed.
