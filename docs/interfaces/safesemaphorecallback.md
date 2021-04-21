[semafy - v1.0.1](../README.md) / [Exports](../modules.md) / SafeSemaphoreCallback

# Interface: SafeSemaphoreCallback

Defines the arguments to expect in a callback function passed to [Semaphore](../classes/semaphore.md) methods.

## Callable

▸ **SafeSemaphoreCallback**(`error`: *undefined* \| [*SemaphoreError*](../classes/semaphoreerror.md), `lock`: [*SemaphoreLock*](../classes/semaphorelock.md)): *void*

Defines the arguments to expect in a callback function passed to [Semaphore](../classes/semaphore.md) methods.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | *undefined* \| [*SemaphoreError*](../classes/semaphoreerror.md) | A [SemaphoreError](../classes/semaphoreerror.md) if the semaphore could not be acquired. Otherwise, this is `undefined` |
| `lock` | [*SemaphoreLock*](../classes/semaphorelock.md) | A [SemaphoreLock](../classes/semaphorelock.md) to the [Semaphore](../classes/semaphore.md) being acquired. If acquired, the lock will be locked. Otherwise, the lock will be unlocked. |

**Returns:** *void*

Defined in: [src/semaphore.ts:11](https://github.com/havelessbemore/semafy/blob/03d6228/src/semaphore.ts#L11)
