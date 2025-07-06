[**semafy**](../README.md)

***

[semafy](../globals.md) / OnceFlag

# Class: OnceFlag

Defined in: [src/callOnce/onceFlag.ts:6](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L6)

Represents a flag that can be set exactly once across different execution agents.

## Implements

- [`SharedResource`](../interfaces/SharedResource.md)

## Constructors

### Constructor

> **new OnceFlag**(): `OnceFlag`

Defined in: [src/callOnce/onceFlag.ts:25](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L25)

#### Returns

`OnceFlag`

### Constructor

> **new OnceFlag**(`sharedBuffer`, `byteOffset?`, `bitOffset?`): `OnceFlag`

Defined in: [src/callOnce/onceFlag.ts:38](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L38)

#### Parameters

##### sharedBuffer

`SharedArrayBuffer`

The SharedArrayBuffer that backs the flag.

##### byteOffset?

`number`

The byte offset within `sharedBuffer`. Defaults to `0`.

##### bitOffset?

`number`

The bit offset within the shared memory location. Defaults to `0`.

#### Returns

`OnceFlag`

#### Throws

A RangeError for any of the following:
 - `byteOffset` is negative or not a multiple of `4`.
 - The byte length of `sharedBuffer` is less than [ByteLength](#bytelength).
 - The space in `sharedBuffer` starting from `byteOffset` is less than [ByteLength](#bytelength).
 - `bitOffset` is negative.
 - `bitOffset` is greater than or equal to `32`.

## Properties

### \_bit

> `protected` **\_bit**: `number`

Defined in: [src/callOnce/onceFlag.ts:15](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L15)

The bit within the shared memory used to set the flag.

***

### \_bitOffset

> `protected` **\_bitOffset**: `number`

Defined in: [src/callOnce/onceFlag.ts:19](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L19)

The offset for the bit within the 32-bit integer of the shared memory.

***

### \_mem

> `protected` **\_mem**: `Int32Array`

Defined in: [src/callOnce/onceFlag.ts:23](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L23)

The shared memory buffer used for the flag.

***

### ByteLength

> `readonly` `static` **ByteLength**: `number` = `Int32Array.BYTES_PER_ELEMENT`

Defined in: [src/callOnce/onceFlag.ts:10](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L10)

The size in bytes of the flag.

## Accessors

### bitOffset

#### Get Signature

> **get** **bitOffset**(): `number`

Defined in: [src/callOnce/onceFlag.ts:80](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L80)

The bit offset for the flag within shared memory, relative to `byteOffset`.

##### Returns

`number`

***

### buffer

#### Get Signature

> **get** **buffer**(): `SharedArrayBuffer`

Defined in: [src/callOnce/onceFlag.ts:65](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L65)

The underlying SharedArrayBuffer
and primary storage for shared data.

##### Returns

`SharedArrayBuffer`

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`buffer`](../interfaces/SharedResource.md#buffer)

***

### byteLength

#### Get Signature

> **get** **byteLength**(): `number`

Defined in: [src/callOnce/onceFlag.ts:69](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L69)

The total length in bytes being used from the SharedArrayBuffer.

##### Returns

`number`

The total length in bytes being used from the SharedArrayBuffer.

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteLength`](../interfaces/SharedResource.md#bytelength)

***

### byteOffset

#### Get Signature

> **get** **byteOffset**(): `number`

Defined in: [src/callOnce/onceFlag.ts:73](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L73)

The byte offset within the SharedArrayBuffer where data begins.

##### Returns

`number`

The byte offset within the SharedArrayBuffer where data begins.

#### Implementation of

[`SharedResource`](../interfaces/SharedResource.md).[`byteOffset`](../interfaces/SharedResource.md#byteoffset)

## Methods

### clear()

> **clear**(): `boolean`

Defined in: [src/callOnce/onceFlag.ts:89](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L89)

Resets the flag state to `false`.

#### Returns

`boolean`

`true` if the flag was previously set, `false` otherwise.

***

### isSet()

> **isSet**(): `boolean`

Defined in: [src/callOnce/onceFlag.ts:98](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L98)

Checks if the flag is currently set.

#### Returns

`boolean`

`true` if the flag is set, `false` otherwise.

***

### set()

> **set**(): `boolean`

Defined in: [src/callOnce/onceFlag.ts:107](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/callOnce/onceFlag.ts#L107)

Sets the flag to `true`. This operation is atomic and thread-safe.

#### Returns

`boolean`

`true` if the flag was set, `false` if it was already set.
