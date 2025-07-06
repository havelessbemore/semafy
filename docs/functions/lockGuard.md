[**semafy**](../README.md)

***

[semafy](../globals.md) / lockGuard

# Function: lockGuard()

> **lockGuard**\<`T`\>(`mutex`, `callbackfn`): `Promise`\<`T`\>

Defined in: [src/locks/lockGuard.ts:13](https://github.com/havelessbemore/semafy/blob/b127757771d72c42d7cd66798069cb41033064d6/src/locks/lockGuard.ts#L13)

Acquires the mutex and executes the provided callback, automatically
unlocking afterwards. Blocks until the lock is available.

## Type Parameters

### T

`T`

## Parameters

### mutex

[`BasicLockable`](../interfaces/BasicLockable.md)

The mutex to acquire.

### callbackfn

() => `T` \| `Promise`\<`T`\>

The callback function.

## Returns

`Promise`\<`T`\>

A promise resolved to the return value of `callbackfn`.
