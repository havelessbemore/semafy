# Semafy

**Semafy** provides synchronization and concurrency management across execution agents such as web workers and the main thread. It contains a robust set of tools modeled after C++ synchronization primitives, offering control and flexibility for managing shared resources and states.

[![Version](https://img.shields.io/npm/v/semafy.svg)](https://www.npmjs.com/package/semafy)
[![Maintenance](https://img.shields.io/maintenance/yes/2024.svg)](https://github.com/havelessbemore/semafy/graphs/commit-activity)
[![License](https://img.shields.io/github/license/havelessbemore/semafy.svg)](https://github.com/havelessbemore/semafy/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/havelessbemore/semafy/graph/badge.svg?token=F362G7C9U0)](https://codecov.io/gh/havelessbemore/semafy)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/semafy)

## Features

- **Mutexes**: Exclusive and shared locking to protect data from concurrent access.
- **ConditionVariable**: Allows agents (main thread, web workers) to wait for certain conditions to occur.
- **Semaphores**: Control access to a finite number of resources.
- **Error Handling**: Specific classes for various lock-related issues, enhancing debuggability and reliability.
- **Platform Agnostic**: Works in both [browser](#browser-usage) and server-side applications, and generally any environment that supports `SharedArrayBuffer`.

## Installation

NPM:

```bash
npm install semafy
```

Yarn:

```bash
yarn add semafy
```

## API

### Generic

- **BasicLockable**: A base interface that provides exclusive blocking for agents.

- **Lockable**: Extends `BasicLockable` to include attempted locking.

- **SharedLockable**: Provides shared blocking semantics for agents.

- **SharedResource**: Represents a shared resource that is backed by a `SharedArrayBuffer`.

- **SharedTimedLockable**: Extends `SharedLockable` to include timed blocking.

- **TimedLockable**: Extends `Lockable` to include timed blocking.

### Mutex

- **Mutex**: Provides essential mutex operations including `lock`, `unlock`, and `tryLock`.

- **TimedMutex**: A timed variant that supports timed operations including `tryLockFor` and `tryLockUntil`.

- **RecursiveMutex**: Allows multiple locks from the same agent.

- **RecursiveTimedMutex**: A timed variant that supports timed operations.

- **SharedMutex**: Allows multiple readers or exclusive writer access, facilitating reader-writer scenarios.

- **SharedTimedMutex**: A timed variant that supports timed operations.

### Mutex Management

- **lockGuard()**: Locks a mutex before calling a callback function, ensuring the mutex is unlocked afterwards.

- **SharedLock**: Wraps a `SharedLockable` object (e.g. `SharedMutex`) to create a shared lock. Calls to `lock`, `unlock`, etc will acquire a shared lock instead of an exclusive lock.

- **tryLock()**: Tries to sequentially acquire all provided locks. If any lock fails, the process is stopped, and any acquired locks are released in reverse order.

- **UniqueLock**: Wraps a `BasicLockable` object to create a unique lock. Calls to `lock`, `unlock`, etc will acquire an exclusive lock on the wrapped object.

### Call Once

- **callOnce()**: Executes a callback function at most once, based on the state of a provided `OnceFlag`.

- **OnceFlag**: Represents a flag that can be set exactly once, shared across different execution agents.

### Condition Variable

- **ConditionVariable**: Allows agents to wait for specific conditions, tightly integrated with mutexes for state management.

### Semaphore

- **CountingSemaphore**: Manages access to a finite number of resources, allowing multiple entities to hold the semaphore concurrently up to a maximum count.

### Errors

- **LockError**: A generic error related to errors in lock acquisition, release and management.

- **MultiLockError**: Occurs when attempting to acquire multiple locks simultaneously.

- **MultiUnlockError**: Occurs when attempting multiple unlocks simultaneously.

- **OwnershipError**: Occurs when attempting to unlock an unacquired mutex.

- **RelockError**: Occurs when attempting to lock an already acquired mutex. Prevents deadlocks from occurring.

- **TimeoutError**: Occurs when an operation exceeds a set time, such as when using `tryLockFor` or `tryLockUntil`.

## Browser Usage

For security reasons, browsers have certain requirements for using shared memory. Please see [SharedArrayBuffer > Security Requirements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements) for details.

## Contributing

Contributions are welcome! Please submit any bugs, issues, or pull requests to the [project's GitHub repository](https://github.com/havelessbemore/semafy).
