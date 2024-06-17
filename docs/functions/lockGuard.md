[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / lockGuard

# Function: lockGuard()

> **lockGuard**\<`T`\>(`mutex`, `callbackfn`): `Promise`\<`T`\>

Acquires the mutex and executes the provided callback, automatically
unlocking afterwards. Blocks until the lock is available.

## Type parameters

• **T**

## Parameters

• **mutex**: [`BasicLockable`](../interfaces/BasicLockable.md)

The mutex to acquire.

• **callbackfn**

The callback function.

## Returns

`Promise`\<`T`\>

A promise resolved to the return value of `callbackfn`.

## Source

[src/locks/lockGuard.ts:13](https://github.com/havelessbemore/semafy/blob/24a3ea8dcb70f91d58fc18f17dc96fd55aaef829/src/locks/lockGuard.ts#L13)
