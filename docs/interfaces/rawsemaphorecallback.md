[semafy - v1.0.4](../README.md) / [Exports](../modules.md) / RawSemaphoreCallback

# Interface: RawSemaphoreCallback

Defines the arguments to expect in a callback function passed to [RawSemaphore](../classes/rawsemaphore.md) methods.

## Callable

▸ **RawSemaphoreCallback**(`error`: *undefined* \| [*SemaphoreError*](../classes/semaphoreerror.md), `semaphore`: [*RawSemaphore*](../classes/rawsemaphore.md)): *void*

Defines the arguments to expect in a callback function passed to [RawSemaphore](../classes/rawsemaphore.md) methods.

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | *undefined* \| [*SemaphoreError*](../classes/semaphoreerror.md) | A [SemaphoreError](../classes/semaphoreerror.md) if the semaphore could not be acquired. Otherwise, this is `undefined` |
| `semaphore` | [*RawSemaphore*](../classes/rawsemaphore.md) | The semaphore being acquired |

**Returns:** *void*

Defined in: [src/rawSemaphore.ts:10](https://github.com/havelessbemore/semafy/blob/1695d55/src/rawSemaphore.ts#L10)
