[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / callOnce

# Function: callOnce()

> **callOnce**\<`T`\>(`flag`, `callbackfn`): `T` \| `undefined`

Executes a callback function at most once, based on the state of a provided [OnceFlag](../classes/OnceFlag.md).

This function ensures the callback is executed exactly once, even across multiple
calls in different agents (main thread, web workers). This is useful for one-time
processes, such as initialization and cleanup routines.

- If the flag is already set, the callback is not executed and `undefined` is returned.

- If the flag is not set, the flag is set, the callback is executed, and the callback's
result is returned.

## Type Parameters

• **T**

## Parameters

• **flag**: [`OnceFlag`](../classes/OnceFlag.md)

The [OnceFlag](../classes/OnceFlag.md) used to determine whether the callback has been invoked.

• **callbackfn**

A function that will be called if the flag has not been set.

## Returns

`T` \| `undefined`

The result of `callbackfn` if the flag was not previously set, otherwise `undefined`.

## Defined in

[src/callOnce/callOnce.ts:20](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/callOnce/callOnce.ts#L20)
