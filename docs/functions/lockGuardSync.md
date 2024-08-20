[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / lockGuardSync

# Function: lockGuardSync()

> **lockGuardSync**\<`T`\>(`mutex`, `callbackfn`): `T`

Acquires the mutex and executes the provided callback, automatically
unlocking afterwards. Blocks until the lock is available.

## Type Parameters

• **T**

## Parameters

• **mutex**: [`SyncBasicLockable`](../interfaces/SyncBasicLockable.md)

The mutex to acquire.

• **callbackfn**

The callback function.

## Returns

`T`

The return value of `callbackfn`.

## Defined in

[src/locks/lockGuard.ts:37](https://github.com/havelessbemore/semafy/blob/bc2afcafa5917c57eff4df5c0126278459b970d5/src/locks/lockGuard.ts#L37)
