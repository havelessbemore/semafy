[semafy - v1.0.6](../README.md) / SemaphoreError

# Class: SemaphoreError

Indicates an error when a semaphore cannot be acquired.

This can be encountered when:
   - A semaphore is cleared and all pending calls are rejected.
   - A semaphore could not be acquired within a given time limit.

## Hierarchy

* *Error*

  ↳ **SemaphoreError**

## Table of contents

### Constructors

- [constructor](semaphoreerror.md#constructor)

### Properties

- [message](semaphoreerror.md#message)
- [name](semaphoreerror.md#name)
- [stack](semaphoreerror.md#stack)
- [prepareStackTrace](semaphoreerror.md#preparestacktrace)
- [stackTraceLimit](semaphoreerror.md#stacktracelimit)

### Methods

- [captureStackTrace](semaphoreerror.md#capturestacktrace)

## Constructors

### constructor

\+ **new SemaphoreError**(`msg?`: *string*): [*SemaphoreError*](semaphoreerror.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `msg?` | *string* |

**Returns:** [*SemaphoreError*](semaphoreerror.md)

Overrides: Error.constructor

Defined in: [src/semaphoreError.ts:8](https://github.com/havelessbemore/semafy/blob/9e5af2a/src/semaphoreError.ts#L8)

## Properties

### message

• **message**: *string*

Inherited from: Error.message

Defined in: node_modules/typescript/lib/lib.es5.d.ts:974

___

### name

• **name**: *string*

Inherited from: Error.name

Defined in: node_modules/typescript/lib/lib.es5.d.ts:973

___

### stack

• `Optional` **stack**: *string*

Inherited from: Error.stack

Defined in: node_modules/typescript/lib/lib.es5.d.ts:975

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Type declaration:

▸ (`err`: Error, `stackTraces`: CallSite[]): *any*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `err` | Error |
| `stackTraces` | CallSite[] |

**Returns:** *any*

Defined in: node_modules/@types/node/globals.d.ts:11

Inherited from: Error.prepareStackTrace

Defined in: node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Inherited from: Error.stackTraceLimit

Defined in: node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static`**captureStackTrace**(`targetObject`: *object*, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

| Name | Type |
| :------ | :------ |
| `targetObject` | *object* |
| `constructorOpt?` | Function |

**Returns:** *void*

Inherited from: Error.captureStackTrace

Defined in: node_modules/@types/node/globals.d.ts:4
