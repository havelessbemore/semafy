[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / ConditionVariable

# Class: ConditionVariable

## See

[C++ Condition Variable](https://en.cppreference.com/w/cpp/thread/condition_variable)

## Constructors

### new ConditionVariable()

> **new ConditionVariable**(`sharedBuffer`, `byteOffset`): [`ConditionVariable`](ConditionVariable.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

• **byteOffset**: `number`= `0`

#### Returns

[`ConditionVariable`](ConditionVariable.md)

#### Source

src/conditionVariable.ts:14

## Properties

### \_mem

> `private` **\_mem**: `Int32Array`

#### Source

src/conditionVariable.ts:12

## Accessors

### handle

> `get` **handle**(): `Int32Array`

#### Returns

`Int32Array`

#### Source

src/conditionVariable.ts:19

## Methods

### notifyAll()

> **notifyAll**(): `number`

#### Returns

`number`

#### Source

src/conditionVariable.ts:23

***

### notifyOne()

> **notifyOne**(): `number`

#### Returns

`number`

#### Source

src/conditionVariable.ts:27

***

### wait()

> **wait**(`mutex`, `timeout`?): `Promise`\<`void`\>

#### Parameters

• **mutex**: [`Mutex`](Mutex.md)

• **timeout?**: `number`

#### Returns

`Promise`\<`void`\>

#### Source

src/conditionVariable.ts:31

***

### waitUntil()

> **waitUntil**(`mutex`, `timestamp`): `Promise`\<`void`\>

#### Parameters

• **mutex**: [`Mutex`](Mutex.md)

• **timestamp**: `number`

#### Returns

`Promise`\<`void`\>

#### Source

src/conditionVariable.ts:47
