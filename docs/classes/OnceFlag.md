[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / OnceFlag

# Class: OnceFlag

Represents a flag that can be set exactly once across different execution agents.

## Implements

- [`SharedResource`](../interfaces/SharedResource.md)

## Constructors

### new OnceFlag()

> **new OnceFlag**(): [`OnceFlag`](OnceFlag.md)

#### Returns

[`OnceFlag`](OnceFlag.md)

#### Source

[src/callOnce/onceFlag.ts:20](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L20)

### new OnceFlag()

> **new OnceFlag**(`sharedBuffer`, `byteOffset`?, `bitOffset`?): [`OnceFlag`](OnceFlag.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the flag.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

• **bitOffset?**: `number`

The bit offset within the shared memory location. Defaults to `0`.
This allows for different bits of a single integer to be used by different flags.

#### Returns

[`OnceFlag`](OnceFlag.md)

#### Source

[src/callOnce/onceFlag.ts:27](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L27)

## Properties

### \_bit

> `protected` **\_bit**: `number`

The bit within the shared memory used to set the flag.

#### Source

[src/callOnce/onceFlag.ts:10](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L10)

***

### \_bitOffset

> `protected` **\_bitOffset**: `number`

The offset for the bit within the 32-bit integer of the shared memory.

#### Source

[src/callOnce/onceFlag.ts:14](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L14)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared memory buffer used for the flag.

#### Source

[src/callOnce/onceFlag.ts:18](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L18)

## Accessors

### bitOffset

> `get` **bitOffset**(): `number`

The bit offset for the flag within shared memory, relative to `byteOffset`.

#### Returns

`number`

#### Source

[src/callOnce/onceFlag.ts:57](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L57)

***

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Source

[src/callOnce/onceFlag.ts:42](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L42)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Source

[src/callOnce/onceFlag.ts:46](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L46)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Source

[src/callOnce/onceFlag.ts:50](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L50)

## Methods

### clear()

> **clear**(): `boolean`

Resets the flag state to `false`.

#### Returns

`boolean`

`true` if the flag was previously set, `false` otherwise.

#### Source

[src/callOnce/onceFlag.ts:66](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L66)

***

### isSet()

> **isSet**(): `boolean`

Checks if the flag is currently set.

#### Returns

`boolean`

`true` if the flag is set, `false` otherwise.

#### Source

[src/callOnce/onceFlag.ts:75](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L75)

***

### set()

> **set**(): `boolean`

Sets the flag to `true`. This operation is atomic and thread-safe.

#### Returns

`boolean`

`true` if the flag was set, `false` if it was already set.

#### Source

[src/callOnce/onceFlag.ts:84](https://github.com/havelessbemore/semafy/blob/c1d56be99a331ecbe5fe1625f5e190ff01b04eee/src/callOnce/onceFlag.ts#L84)
