[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / Mutex

# Class: Mutex

## Constructors

### new Mutex()

> **new Mutex**(`sharedBuffer`, `byteOffset`?): [`Mutex`](Mutex.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

• **byteOffset?**: `number`

#### Returns

[`Mutex`](Mutex.md)

#### Source

[src/mutex.ts:12](https://github.com/havelessbemore/semafy/blob/2e79073fa99d72a42ce4afc051af2c5b130abe97/src/mutex.ts#L12)

## Properties

### \_hasLock

> `private` **\_hasLock**: `boolean`

#### Source

[src/mutex.ts:9](https://github.com/havelessbemore/semafy/blob/2e79073fa99d72a42ce4afc051af2c5b130abe97/src/mutex.ts#L9)

***

### \_lock

> `private` **\_lock**: `Int32Array`

#### Source

[src/mutex.ts:10](https://github.com/havelessbemore/semafy/blob/2e79073fa99d72a42ce4afc051af2c5b130abe97/src/mutex.ts#L10)

## Accessors

### hasLock

> `get` **hasLock**(): `boolean`

#### Returns

`boolean`

#### Source

[src/mutex.ts:17](https://github.com/havelessbemore/semafy/blob/2e79073fa99d72a42ce4afc051af2c5b130abe97/src/mutex.ts#L17)

## Methods

### lock()

> **lock**(`timeout`?): `Promise`\<`void`\>

#### Parameters

• **timeout?**: `number`

#### Returns

`Promise`\<`void`\>

#### Source

[src/mutex.ts:21](https://github.com/havelessbemore/semafy/blob/2e79073fa99d72a42ce4afc051af2c5b130abe97/src/mutex.ts#L21)

***

### request()

> **request**\<`T`\>(`callbackfn`, `timeout`?): `Promise`\<`T`\>

#### Type parameters

• **T**

#### Parameters

• **callbackfn**

• **timeout?**: `number`

#### Returns

`Promise`\<`T`\>

#### Source

[src/mutex.ts:31](https://github.com/havelessbemore/semafy/blob/2e79073fa99d72a42ce4afc051af2c5b130abe97/src/mutex.ts#L31)

***

### tryLock()

> **tryLock**(): `boolean`

#### Returns

`boolean`

#### Source

[src/mutex.ts:43](https://github.com/havelessbemore/semafy/blob/2e79073fa99d72a42ce4afc051af2c5b130abe97/src/mutex.ts#L43)

***

### unlock()

> **unlock**(): `void`

#### Returns

`void`

#### Source

[src/mutex.ts:48](https://github.com/havelessbemore/semafy/blob/2e79073fa99d72a42ce4afc051af2c5b130abe97/src/mutex.ts#L48)
