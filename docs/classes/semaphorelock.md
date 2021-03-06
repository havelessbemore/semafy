[semafy - v1.0.6](../README.md) / SemaphoreLock

# Class: SemaphoreLock

Represents a lock (acquisition) on a semaphore.

Usage imposes the following restrictions:
1. A semaphore must first be acquired (locked) before it can be released (unlocked)
1. If locked, the lock can be unlocked once at most
1. Once unlocked, the lock is exhausted. If needed, a new lock must be acquired via the semaphore

## Table of contents

### Constructors

- [constructor](semaphorelock.md#constructor)

### Properties

- [isAcquired](semaphorelock.md#isacquired)
- [semaphore](semaphorelock.md#semaphore)

### Methods

- [isLocked](semaphorelock.md#islocked)
- [unlock](semaphorelock.md#unlock)

## Constructors

### constructor

\+ **new SemaphoreLock**(`semaphore`: [*RawSemaphore*](rawsemaphore.md), `isAcquired?`: *boolean*): [*SemaphoreLock*](semaphorelock.md)

#### Parameters:

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `semaphore` | [*RawSemaphore*](rawsemaphore.md) | - | The semaphore being locked |
| `isAcquired` | *boolean* | true | Whether or not the semaphore is acquired |

**Returns:** [*SemaphoreLock*](semaphorelock.md)

Defined in: [src/semaphoreLock.ts:19](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/semaphoreLock.ts#L19)

## Properties

### isAcquired

• `Protected` **isAcquired**: *boolean*

Whether or not the semaphore is acquired

Defined in: [src/semaphoreLock.ts:15](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/semaphoreLock.ts#L15)

___

### semaphore

• `Protected` **semaphore**: [*RawSemaphore*](rawsemaphore.md)

The semaphore being locked

Defined in: [src/semaphoreLock.ts:19](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/semaphoreLock.ts#L19)

## Methods

### isLocked

▸ **isLocked**(): *boolean*

Check if locked

**Returns:** *boolean*

Defined in: [src/semaphoreLock.ts:34](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/semaphoreLock.ts#L34)

___

### unlock

▸ **unlock**(): *void*

If locked, then unlock

**Returns:** *void*

Defined in: [src/semaphoreLock.ts:41](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/semaphoreLock.ts#L41)
