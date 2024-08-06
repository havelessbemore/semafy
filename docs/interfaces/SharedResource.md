[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / SharedResource

# Interface: SharedResource

Represents a shared resource that is backed by a SharedArrayBuffer.

This resource can be shared across different execution contexts, such as
web workers or the main thread, enabling data sharing and manipulation.

## Properties

### buffer

> **buffer**: `Readonly`\<`SharedArrayBuffer`\>

The underlying SharedArrayBuffer
and primary storage for shared data.

#### Defined in

[src/types/sharedResource.ts:12](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sharedResource.ts#L12)

***

### byteLength

> **byteLength**: `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Defined in

[src/types/sharedResource.ts:17](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sharedResource.ts#L17)

***

### byteOffset

> **byteOffset**: `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Defined in

[src/types/sharedResource.ts:22](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/types/sharedResource.ts#L22)
