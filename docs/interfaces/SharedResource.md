[**semafy**](../README.md)

***

[semafy](../globals.md) / SharedResource

# Interface: SharedResource

Defined in: [src/types/sharedResource.ts:7](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedResource.ts#L7)

Represents a shared resource that is backed by a SharedArrayBuffer.

This resource can be shared across different execution contexts, such as
web workers or the main thread, enabling data sharing and manipulation.

## Properties

### buffer

> **buffer**: `Readonly`\<`SharedArrayBuffer`\>

Defined in: [src/types/sharedResource.ts:12](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedResource.ts#L12)

The underlying SharedArrayBuffer
and primary storage for shared data.

***

### byteLength

> **byteLength**: `number`

Defined in: [src/types/sharedResource.ts:17](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedResource.ts#L17)

The total length in bytes being used from the SharedArrayBuffer.

***

### byteOffset

> **byteOffset**: `number`

Defined in: [src/types/sharedResource.ts:22](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/types/sharedResource.ts#L22)

The byte offset within the SharedArrayBuffer where data begins.
