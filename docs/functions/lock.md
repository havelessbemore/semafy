[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / lock

# Function: lock()

> **lock**(...`locks`): `Promise`\<`void`\>

Sequentially locks the provided [BasicLockable](../interfaces/BasicLockable.md) objects.

If any lock acquisition fails, the process is halted
and previously acquired locks are released in reverse order.

## Parameters

• ...**locks**: [`BasicLockable`](../interfaces/BasicLockable.md)[]

An array of lockable objects to be locked sequentially.

## Returns

`Promise`\<`void`\>

## Throws

A [MultiLockError](../classes/MultiLockError.md) if an error occurs trying to acquire all
locks. Details include:
 - `locks`: The array of all locks.
 - `numLocked`: The number of locks successfully acquired before failure.
 - `lockErrors`: Errors encountered while trying to acquire all locks.
 - `unlockErrors`: Errors encountered while trying to roll back acquired locks.

## Source

[src/locks/lock.ts:19](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/locks/lock.ts#L19)
