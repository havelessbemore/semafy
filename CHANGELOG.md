# Change Log

## [2.1.0](https://github.com/havelessbemore/semafy/compare/v2.0.7...v2.1.0) (2024-06-13)

### What's New

Introduces synchronous versions of methods.

- Sync methods use [Atomics.wait](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/wait#browser_compatibility), which may not be allowed on the main thread in a browser environment. In these cases, their existing async versions (e.g. `lockSync` -> `lock`) should be used.

- Interfaces:

  - SyncBasicLockable
  - SyncLockable
  - SyncTimedLockable

- Classes:

  - `Mutex` extends `SyncLockable`.
  - `RecursiveMutex` extends `SyncLockable`.
  - `RecursiveTimedMutex` extends `SyncTimedLockable`.
  - `TimedMutex` extends `SyncTimedLockable`.
  - `UniqueLock` extends `SyncTimedLockable`.

- Utilities:

  - lockGuardSync

### Misc

- Update dev dependencies
- Add support for [JSR](https://jsr.io/@rojas/semafy):
  ```bash
  jsr add @rojas/semafy
  ```

## [2.0.7](https://github.com/havelessbemore/semafy/compare/v2.0.6...v2.0.7) (2024-05-15)

### What's New

- Classes

  - `MultiLock` for managing multiple locks as one.

- Utilities
  - `lock()` function for joint locking of multiple locks.

### What's Changed

- Fix bug in `tryLock()` utility function. Error was not being re-thrown if it occurred on the first lock.

## [2.0.6](https://github.com/havelessbemore/semafy/compare/v2.0.5...v2.0.6) (2024-05-13)

### What's New

- Classes

  - Latch
  - UniqueLock
  - OnceFlag

- Utilities
  - callOnce()

### What's Changed

- `CountingSemaphore` constructor now alternatively accepts an initial value.
- The maximum value for `RecursiveMutex` has changed.
  - Before: Number.MAX_SAFE_INTEGER
  - After: (2\*\*31) - 1

### Breaking Changes

- `CountingSemaphore.MAX` and `RecursiveMutex.MAX` constants have been renamed to `.Max`.

## [2.0.5](https://github.com/havelessbemore/semafy/compare/v2.0.4...v2.0.5) (2024-05-12)

### What's New

- Utilities

  - `tryLock` function for attempted joint locking of multiple locks.

- Errors
  - `MultiLockError` class to collect and surface errors attempting to lock multiple locks.
  - `MultiUnlockError` class to collect and surface errors attempting to unlock multiple locks.

### What's Changed

- `SharedMutex.tryLock` and `SharedMutex.tryLockShared` are now non-blocking.

## [2.0.4](https://github.com/havelessbemore/semafy/compare/v2.0.3...v2.0.4) (2024-05-10)

### What's Changed

- Fix bug in `lockGuard`. Mutex unlock was not properly awaited on for mutexes with async unlocking.

## [2.0.3](https://github.com/havelessbemore/semafy/compare/v2.0.2...v2.0.3) (2024-05-10)

### What's New

- Classes
  - SharedTimedMutex

## [2.0.2](https://github.com/havelessbemore/semafy/compare/v2.0.1...v2.0.2) (2024-05-10)

### What's New

- Interfaces:

  - BasicLockable
  - Lockable
  - SharedLockable
  - SharedResource
  - SharedTimedLockable
  - TimedLockable

- Classes

  - RecursiveTimedMutex
  - SharedLock
  - TimedMutex

- Utilities
  - lockGuard

### Breaking

Until v2.1.0, breaking changes may be released in patched or minor versions. These will be always be highlighted in the release notes / changelog.

- Remove .request, .requestFor, .requestShared and .requestUntil methods.

  - .request should be replaced by lockGuard.
  - .requestShared should be replaced by wrapping the shared mutex in a shared lock and then using lockGuard.
  - There are no replacements for .requestFor and .requestUntil at this time.

- Rename classes
  - Mutex -> TimedMutex
  - Semaphore -> CountingSemaphore
  - MutexError -> LockError
  - MutexOwnershipError -> OwnershipError
  - MutexRelockError -> RelockError

## [2.0.1](https://github.com/havelessbemore/semafy/compare/v2.0.0...v2.0.1) (2024-05-09)

### What's New

- Classes
  - RecursiveMutex

### Breaking

Given the very brief period since the previous version, this will be released as a patch, despite breaking changes.

- Removed ability to instantiate classes with Int32Array.
- Replace .handle getter with .buffer and .byteOffset getters
- tryLock methods now return false instead of throwing an error if lock already owned.

## [2.0.0](https://github.com/havelessbemore/semafy/compare/v1.0.5...v2.0.0) (2024-05-09)

### New

- Types

  - CVStatus

- Classes

  - ConditionVariable
  - SharedMutex

- Errors
  - MutexError
  - MutexOwnershipError
  - MutexRelockError
  - TimeoutError

### What's Changed

- Mutex
- Semaphore

### Breaking

Everything. This release is a complete library rewrite from scratch.
