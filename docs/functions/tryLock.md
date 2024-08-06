[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / tryLock

# Function: tryLock()

> **tryLock**(...`locks`): `Promise`\<`number`\>

Tries to sequentially lock the provided [Lockable](../interfaces/Lockable.md) objects.

If any lock acquisition fails, the process is halted
and previously acquired locks are released in reverse order.

## Parameters

• ...**locks**: [`Lockable`](../interfaces/Lockable.md)[]

An array of lockable objects to be locked sequentially.

## Returns

`Promise`\<`number`\>

`-1` if all locks are successfully acquired, otherwise the 0-based index of the lock that failed.

## Throws

A [MultiLockError](../classes/MultiLockError.md) if an error occurs trying to acquire all
locks. Details include:
 - `locks`: The array of all locks.
 - `numLocked`: The number of locks successfully acquired before failure.
 - `lockErrors`: Errors encountered while trying to acquire all locks.
 - `unlockErrors`: Errors encountered while trying to roll back acquired locks.

## Throws

A [MultiUnlockError](../classes/MultiUnlockError.md) if, after lock failure, an errors occurs
while trying to roll back acquired locks. Details include:
 - `locks`: The array of all locks.
 - `numUnlocked`: The number of locks successfully unlocked.
 - `unlockErrors`: Errors encountered while trying to roll back acquired locks.

## Defined in

[src/locks/tryLock.ts:29](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/locks/tryLock.ts#L29)
