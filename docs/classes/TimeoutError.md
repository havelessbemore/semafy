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

#### Defined in

[src/errors/timeoutError.ts:24](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/errors/timeoutError.ts#L24)

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Defined in

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### deadline?

> `optional` **deadline**: `number`

Absolute time in milliseconds after which the timeout error was thrown.
Can be `undefined` if not specified.

#### Defined in

[src/errors/timeoutError.ts:11](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/errors/timeoutError.ts#L11)

***

### message

> **message**: `string`

#### Inherited from

`Error.message`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1077

***

### name

> **name**: `string`

#### Inherited from

`Error.name`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1076

***

### stack?

> `optional` **stack**: `string`

#### Inherited from

`Error.stack`

#### Defined in

node\_modules/typescript/lib/lib.es5.d.ts:1078

***

### timeout?

> `optional` **timeout**: `number`

Duration in milliseconds after which the timeout error was thrown.
Can be `undefined` if not specified.

#### Defined in

[src/errors/timeoutError.ts:17](https://github.com/havelessbemore/semafy/blob/571d9f7b8415a099d2913b0d38cb23c994b5c69d/src/errors/timeoutError.ts#L17)

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Optional override for formatting stack traces

#### Parameters

• **err**: `Error`

• **stackTraces**: `CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

#### Defined in

node\_modules/@types/node/globals.d.ts:29

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

#### Inherited from

`Error.stackTraceLimit`

#### Defined in

node\_modules/@types/node/globals.d.ts:31

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

#### Defined in

node\_modules/@types/node/globals.d.ts:22
