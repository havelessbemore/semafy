[semafy - v1.0.1](../README.md) / [Exports](../modules.md) / SemaphoreLock

# Class: SemaphoreLock

Represents acquisition of a semaphore.

## Table of contents

### Constructors

- [constructor](semaphorelock.md#constructor)

### Properties

- [isEnabled](semaphorelock.md#isenabled)
- [semaphore](semaphorelock.md#semaphore)

### Methods

- [isLocked](semaphorelock.md#islocked)
- [unlock](semaphorelock.md#unlock)

## Constructors

### constructor

\+ **new SemaphoreLock**(`semaphore`: [*RawSemaphore*](rawsemaphore.md), `isEnabled?`: *boolean*): [*SemaphoreLock*](semaphorelock.md)

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `semaphore` | [*RawSemaphore*](rawsemaphore.md) | - | The semaphore being locked |
| `isEnabled` | *boolean* | true | Whether or not the semaphore is acquired |

**Returns:** [*SemaphoreLock*](semaphorelock.md)

Defined in: [src/semaphore.ts:17](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L17)

## Properties

### isEnabled

• `Protected` **isEnabled**: *boolean*= true

___

### semaphore

• `Protected` **semaphore**: [*RawSemaphore*](rawsemaphore.md)

## Methods

### isLocked

▸ **isLocked**(): *boolean*

Check if the [semaphore](semaphorelock.md#semaphore) is locked

**Returns:** *boolean*

Defined in: [src/semaphore.ts:28](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L28)

___

### unlock

▸ **unlock**(): *void*

If locked, release the [semaphore](semaphorelock.md#semaphore) and increment its [value](semaphore.md#value)

**Returns:** *void*

Defined in: [src/semaphore.ts:35](https://github.com/havelessbemore/semafy/blob/47ff01d/src/semaphore.ts#L35)
