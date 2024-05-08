[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / SharedMutex

# Class: SharedMutex

## Constructors

### new SharedMutex()

> **new SharedMutex**(`sharedBuffer`, `byteOffset`): [`SharedMutex`](SharedMutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

• **byteOffset**: `number`= `0`

#### Returns

[`SharedMutex`](SharedMutex.md)

#### Source

src/sharedMutex.ts:20

## Properties

### \_gate1

> `private` **\_gate1**: [`ConditionVariable`](ConditionVariable.md)

#### Source

src/sharedMutex.ts:13

***

### \_gate2

> `private` **\_gate2**: [`ConditionVariable`](ConditionVariable.md)

#### Source

src/sharedMutex.ts:14

***

### \_isReader

> `private` **\_isReader**: `boolean`

#### Source

src/sharedMutex.ts:15

***

### \_isWriter

> `private` **\_isWriter**: `boolean`

#### Source

src/sharedMutex.ts:16

***

### \_mutex

> `private` **\_mutex**: [`Mutex`](Mutex.md)

#### Source

src/sharedMutex.ts:17

***

### \_state

> `private` **\_state**: `Int32Array`

#### Source

src/sharedMutex.ts:18

## Methods

### lock()

> **lock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

src/sharedMutex.ts:35

***

### lockShared()

> **lockShared**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

src/sharedMutex.ts:92

***

### request()

> **request**\<`T`\>(`callbackfn`): `Promise`\<`T`\>

#### Type parameters

• **T**

#### Parameters

• **callbackfn**

#### Returns

`Promise`\<`T`\>

#### Source

src/sharedMutex.ts:53

***

### requestShared()

> **requestShared**\<`T`\>(`callbackfn`): `Promise`\<`T`\>

#### Type parameters

• **T**

#### Parameters

• **callbackfn**

#### Returns

`Promise`\<`T`\>

#### Source

src/sharedMutex.ts:110

***

### tryLock()

> **tryLock**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Source

src/sharedMutex.ts:64

***

### tryLockShared()

> **tryLockShared**(): `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

#### Source

src/sharedMutex.ts:121

***

### unlock()

> **unlock**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

src/sharedMutex.ts:77

***

### unlockShared()

> **unlockShared**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Source

src/sharedMutex.ts:138
