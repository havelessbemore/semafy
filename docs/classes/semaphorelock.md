[semafy - v1.0.1](../README.md) / [Exports](../modules.md) / SemaphoreLock

# Class: SemaphoreLock

Represents acquisition of a semaphore.

Usage imposes the following restrictions:
1. Only a call that has acquired the semaphore (aka decremented its value) can release it (aka increment its value)
1. If acquired, a call can release the semaphore once at most

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

Defined in: src/semaphoreLock.ts:10

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

Defined in: src/semaphoreLock.ts:21

___

### unlock

▸ **unlock**(): *void*

If locked, release the [semaphore](semaphorelock.md#semaphore) and increment its [value](semaphore.md#value)

**Returns:** *void*

Defined in: src/semaphoreLock.ts:28
