[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / lockGuardSync

# Function: lockGuardSync()

> **lockGuardSync**\<`T`\>(`mutex`, `callbackfn`): `T`

Acquires the mutex and executes the provided callback, automatically
unlocking afterwards. Blocks until the lock is available.

## Type parameters

• **T**

## Parameters

• **mutex**: [`SyncBasicLockable`](../interfaces/SyncBasicLockable.md)

The mutex to acquire.

• **callbackfn**

The callback function.

## Returns

`T`

The return value of `callbackfn`.

## Source

[src/locks/lockGuard.ts:37](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/locks/lockGuard.ts#L37)
