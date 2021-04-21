semafy - v1.0.1 / [Exports](modules.md)

# Semafy

Semaphore & Mutex implementation for node

## Installing

```bash
npm install semafy
```

## Contribute

There are many ways to contribute:
* [Submit bugs](https://github.com/havelessbemore/semafy/issues) and help verify fixes.
* Review [source code changes](https://github.com/havelessbemore/semafy/pulls).
* Contribute bug fixes.

## Usage

### Semaphore

Acquring a [Semaphore](./docs/classes/semaphore.md) returns a [SemaphoreLock](./docs/classes/semaphorelock.md) to make sure that:  
1. Only a call that has acquired the semaphore (aka decremented its value) can release it (aka increment its value)
1. A call can release the semaphore once at most

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

While usage is very similar to a [Semaphore](./docs/classes/semaphore.md), it does not use [SemaphoreLocks]() and so does not have the same restrictions; Anything with a reference to the semaphore can increment its value multiple times via the [post()](./docs/classes/rawsemaphore.md#post) method. Acquiring a [RawSemaphore](./docs/classes/rawsemaphore.md) also returns the semaphore itself.

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

## API

See [documentation](./docs/modules.md)
