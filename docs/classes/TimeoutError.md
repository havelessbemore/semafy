[**semafy**](../README.md) • **Docs**

***

[semafy](../globals.md) / TimeoutError

# Class: TimeoutError

## Extends

- `Error`

## Constructors

### new TimeoutError()

> **new TimeoutError**(`message`, `duration`?): [`TimeoutError`](TimeoutError.md)

#### Parameters

• **message**: `string`= `"Timed out"`

• **duration?**: `number`

#### Returns

[`TimeoutError`](TimeoutError.md)

#### Overrides

`Error.constructor`

#### Source

src/utils/timeoutError.ts:7

## Properties

### cause?

> `optional` **cause**: `unknown`

#### Inherited from

`Error.cause`

#### Source

node\_modules/typescript/lib/lib.es2022.error.d.ts:24

***

### duration?

> `optional` **duration**: `number`

Duration in milliseconds after which the timeout error was thrown

#### Source

src/utils/timeoutError.ts:5

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