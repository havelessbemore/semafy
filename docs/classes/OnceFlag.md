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

#### Defined in

[src/callOnce/onceFlag.ts:25](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L25)

### new OnceFlag()

> **new OnceFlag**(`sharedBuffer`, `byteOffset`?, `bitOffset`?): [`OnceFlag`](OnceFlag.md)

#### Parameters

• **sharedBuffer**: `SharedArrayBuffer`

The SharedArrayBuffer that backs the flag.

• **byteOffset?**: `number`

The byte offset within `sharedBuffer`. Defaults to `0`.

• **bitOffset?**: `number`

The bit offset within the shared memory location. Defaults to `0`.

#### Returns

[`OnceFlag`](OnceFlag.md)

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](OnceFlag.md#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](OnceFlag.md#bytelength).
 - `bitOffset` is negative.
 - `bitOffset` is greater than or equal to `32`.

#### Defined in

[src/callOnce/onceFlag.ts:38](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L38)

## Properties

### \_bit

> `protected` **\_bit**: `number`

The bit within the shared memory used to set the flag.

#### Defined in

[src/callOnce/onceFlag.ts:15](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L15)

***

### \_bitOffset

> `protected` **\_bitOffset**: `number`

The offset for the bit within the 32-bit integer of the shared memory.

#### Defined in

[src/callOnce/onceFlag.ts:19](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L19)

***

### \_mem

> `protected` **\_mem**: `Int32Array`

The shared memory buffer used for the flag.

#### Defined in

[src/callOnce/onceFlag.ts:23](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L23)

***

### ByteLength

> `readonly` `static` **ByteLength**: `number` = `Int32Array.BYTES_PER_ELEMENT`

The size in bytes of the flag.

#### Defined in

[src/callOnce/onceFlag.ts:10](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L10)

## Accessors

### bitOffset

> `get` **bitOffset**(): `number`

The bit offset for the flag within shared memory, relative to `byteOffset`.

#### Returns

`number`

#### Defined in

[src/callOnce/onceFlag.ts:80](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L80)

***

### buffer

> `get` **buffer**(): `SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Returns

`SharedArrayBuffer`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`buffer`](../interfaces/SharedResource.md#buffer)

#### Defined in

[src/callOnce/onceFlag.ts:65](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L65)

***

### byteLength

> `get` **byteLength**(): `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Returns

`number`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteLength`](../interfaces/SharedResource.md#bytelength)

#### Defined in

[src/callOnce/onceFlag.ts:69](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L69)

***

### byteOffset

> `get` **byteOffset**(): `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Returns

`number`

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteOffset`](../interfaces/SharedResource.md#byteoffset)

#### Defined in

[src/callOnce/onceFlag.ts:73](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L73)

## Methods

### clear()

> **clear**(): `boolean`

Resets the flag state to `false`.

#### Returns

`boolean`

`true` if the flag was previously set, `false` otherwise.

#### Defined in

[src/callOnce/onceFlag.ts:89](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L89)

***

### isSet()

> **isSet**(): `boolean`

Checks if the flag is currently set.

#### Returns

`boolean`

`true` if the flag is set, `false` otherwise.

#### Defined in

[src/callOnce/onceFlag.ts:98](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L98)

***

### set()

> **set**(): `boolean`

Sets the flag to `true`. This operation is atomic and thread-safe.

#### Returns

`boolean`

`true` if the flag was set, `false` if it was already set.

#### Defined in

[src/callOnce/onceFlag.ts:107](https://github.com/havelessbemore/semafy/blob/8eba5886d3775a63da96eb7c166c6371edbbcfa1/src/callOnce/onceFlag.ts#L107)
