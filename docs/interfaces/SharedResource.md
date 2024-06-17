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

#### Source

[src/types/sharedResource.ts:12](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sharedResource.ts#L12)

***

### byteLength

> **byteLength**: `number`

The total length in bytes being used from the SharedArrayBuffer.

#### Source

[src/types/sharedResource.ts:17](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sharedResource.ts#L17)

***

### byteOffset

> **byteOffset**: `number`

The byte offset within the SharedArrayBuffer where data begins.

#### Source

[src/types/sharedResource.ts:22](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/types/sharedResource.ts#L22)
