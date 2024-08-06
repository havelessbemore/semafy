[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / lockGuard

# Function: lockGuard()

> **lockGuard**\<`T`\>(`mutex`, `callbackfn`): `Promise`\<`T`\>

Acquires the mutex and executes the provided callback, automatically
unlocking afterwards. Blocks until the lock is available.

## Type Parameters

• **T**

## Parameters

• **mutex**: [`BasicLockable`](../interfaces/BasicLockable.md)

The mutex to acquire.

• **callbackfn**

The callback function.

## Returns

`Promise`\<`T`\>

A promise resolved to the return value of `callbackfn`.

## Defined in

[src/locks/lockGuard.ts:13](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/lockGuard.ts#L13)
