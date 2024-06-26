[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / TimeoutError

# Class: TimeoutError

Represents an error that occurs when a process exceeds a set time.

## Extends

- `Error`

## Constructors

### new TimeoutError()

> **new TimeoutError**(`message`?, `timeout`?, `deadline`?): [`TimeoutError`](TimeoutError.md)

#### Parameters

• **message?**: `string`

A custom error message. Defaults to `undefined`.

• **timeout?**: `number`

The timeout duration in milliseconds. Defaults to `undefined`.

• **deadline?**: `number`

The absolute time in milliseconds. Defaults to `undefined`.

#### Returns

[`TimeoutError`](TimeoutError.md)

#### Overrides

`Error.constructor`

#### Source

[src/errors/timeoutError.ts:24](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/errors/timeoutError.ts#L24)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### deadline?

> `optional` **deadline**: `number`

Absolute time in milliseconds after which the timeout error was thrown.
Can be `undefined` if not specified.

#### Source

[src/errors/timeoutError.ts:11](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/errors/timeoutError.ts#L11)

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Source

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### timeout?

> `optional` **timeout**: `number`

Duration in milliseconds after which the timeout error was thrown.
Can be `undefined` if not specified.

#### Source

[src/errors/timeoutError.ts:17](https://github.com/havelessbemore/semafy/blob/51b7924eee2692d3840b3a9f9e7614a75a8ef8d6/src/errors/timeoutError.ts#L17)

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### Inherited from

`Error.prepareStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:28

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Source

node\_modules/@types/node/globals.d.ts:30

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Create .stack property on a target object

#### Parameters

• **targetObject**: `object`

• **constructorOpt?**: `Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`

#### Source

node\_modules/@types/node/globals.d.ts:21
