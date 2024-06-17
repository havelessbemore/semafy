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

[src/locks/lockGuard.ts:37](https://github.com/havelessbemore/semafy/blob/24a3ea8dcb70f91d58fc18f17dc96fd55aaef829/src/locks/lockGuard.ts#L37)
