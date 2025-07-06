[**semafy**](../README.md)

***

[semafy](../globals.md) / lockGuardSync

# Function: lockGuardSync()

> **lockGuardSync**\<`T`\>(`mutex`, `callbackfn`): `T`

Defined in: [src/locks/lockGuard.ts:37](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/lockGuard.ts#L37)

Acquires the mutex and executes the provided callback, automatically
unlocking afterwards. Blocks until the lock is available.

## Type Parameters

### T

`T`

## Parameters

### mutex

[`SyncBasicLockable`](../interfaces/SyncBasicLockable.md)

The mutex to acquire.

### callbackfn

() => `T`

The callback function.

## Returns

`T`

The return value of `callbackfn`.
