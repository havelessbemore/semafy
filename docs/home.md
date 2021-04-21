semafy - v1.0.1 / [Exports](modules.md)

# Semafy

[![npm](https://img.shields.io/npm/v/semafy.svg)](https://www.npmjs.com/package/semafy)

Semaphore & Mutex implementation for node

## Installing

```bash
npm install semafy
```

## API

See [documentation](https://github.com/havelessbemore/semafy/wiki/modules) for details. 

**TLDR;** This library provides:
1. [Semaphore](https://github.com/havelessbemore/semafy/wiki/semaphore)  
Acquisition returns a [SemaphoreLock](https://github.com/havelessbemore/semafy/wiki/semaphorelock). This ensures that: 
   <ol type="a">
      <li>Only a call that has acquired the semaphore (aka decremented its value) can release it (aka increment its value)</li>
      <li>A call can release the semaphore once at most</li>
   </ol>

1. [Mutex](https://github.com/havelessbemore/semafy/wiki/mutex)  
A convenience class for defining a binary [Semaphore](https://github.com/havelessbemore/semafy/wiki/semaphore). ```new Mutex()``` is functionally equivalent to ```new Semaphore(1)```.

1. [RawSemaphore](https://github.com/havelessbemore/semafy/wiki/rawsemaphore)  
Similar to a [Semaphore](https://github.com/havelessbemore/semafy/wiki/semaphore) but without using [SemaphoreLocks](https://github.com/havelessbemore/semafy/wiki/semaphorelock), so it does not have the same restrictions. Anything with a reference to the semaphore can:
   <ol type="a">
      <li>Increment it via <a href="https://github.com/havelessbemore/semafy/wiki/rawsemaphore#post">post()</a>, regardless of if the semaphore was first acquired</li>
      <li>Increment it multiple times</li>
      <li> Increment it above the initial value the semaphore was created with
   </ol>
   Acquisition returns a self-reference to the semaphore.

## Usage

### Semaphore

#### With Promises

```js
import { Semaphore } from 'semafy';

// Limit calls to 5 per second
const delay = 1000; // ms
const semaphore = new Semaphore(5);

async function rateLimit(callback) {
    const lock = await semaphore.wait();
    setTimeout(() => lock.unlock(), delay);
    callback();
}
```

#### With Callbacks

```js
import { Semaphore } from 'semafy';

// Limit calls to 5 per second
const delay = 1000; // ms
const semaphore = new Semaphore(5);

function rateLimit(callback) {
    semaphore.wait((error, lock) => {
        if (error) {
            // Could not acquire semaphore
            // Handle error...
            return;
        }
        setTimeout(() => lock.unlock(), delay);
        callback();
    });
}
```

#### With Timeout

```js
import { Semaphore } from 'semafy';

// Limit calls to 5 per second
// Give up after 8 seconds
const delay = 1000; // ms
const timeout = 8000; // ms
const semaphore = new Semaphore(5);

async function rateLimit(callback) {
    const lock = await semaphore.waitFor(timeout);
    setTimeout(() => lock.unlock(), delay);
    callback();
}
```

or

```js
import { Semaphore } from 'semafy';

// Limit calls to 5 per second
// Give up after 8 seconds
const delay = 1000; // ms
const timeout = 8000; // ms
const semaphore = new Semaphore(5);

function rateLimit(callback) {
    semaphore.waitFor(timeout, (error, lock) => {
        if (error) {
            // Could not acquire semaphore
            // Handle error...
            return;
        }
        setTimeout(() => lock.unlock(), delay);
        callback();
    });
}
```

#### tryWait()

```js
import { Semaphore } from 'semafy';

const semaphore = new Semaphore(5);

function nowOrNever(callback) {
    const lock = semaphore.tryWait();
    if (lock) {
        try {
            callback();
        } finally {
            lock.unlock();
        }
    }
}
```

### Raw Semaphore

#### With Promises

```js
import { RawSemaphore } from 'semafy';

// Limit calls to 5 per second
const delay = 1000; // ms
const semaphore = new RawSemaphore(5);

async function rateLimit(callback) {
    await semaphore.wait();
    setTimeout(() => semaphore.post(), delay);
    callback();
}
```

#### With Callbacks and Timeout

```js
import { RawSemaphore } from 'semafy';

// Limit calls to 5 per second
// Give up after 8 seconds
const delay = 1000; // ms
const timeout = 8000; // ms
const semaphore = new RawSemaphore(5);

function rateLimit(callback) {
    semaphore.waitFor(timeout, (error, sem) => {
        if (error) {
            // Could not acquire semaphore
            // Handle error...
            return;
        }
        setTimeout(() => sem.post(), delay);
        callback();
    });
}
```

#### tryWait()

```js
import { RawSemaphore } from 'semafy';

const semaphore = new RawSemaphore(5);

function nowOrNever(callback) {
    if (semaphore.tryWait()) {
        try {
            callback();
        } finally {
            semaphore.post();
        }
    }
}
```

## Contribute

There are many ways to contribute:
* [Submit bugs](https://github.com/havelessbemore/semafy/issues) and help verify fixes.
* Review [source code changes](https://github.com/havelessbemore/semafy/pulls).
* Contribute bug fixes.
