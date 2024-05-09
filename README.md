# Semafy

Semafy provides synchronization primitives based on concepts from C++ standard threading and synchronization libraries. It includes support for mutexes, condition variables, semaphores, and shared mutexes to facilitate robust concurrent applications in environments supporting shared memory and atomic operations.

[![Version](https://img.shields.io/npm/v/semafy.svg)](https://www.npmjs.com/package/semafy)
[![Maintenance](https://img.shields.io/maintenance/yes/2024.svg)](https://github.com/havelessbemore/semafy/graphs/commit-activity)
[![License](https://img.shields.io/github/license/havelessbemore/semafy.svg)](https://github.com/havelessbemore/semafy/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/havelessbemore/semafy/graph/badge.svg?token=F362G7C9U0)](https://codecov.io/gh/havelessbemore/semafy)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/semafy)

## Features

- **Mutex**: Provides exclusive locking to protect shared data from concurrent access.
- **Condition Variable**: Allows agents (main thread, web workers) to wait for certain conditions to occur.
- **Semaphore**: Implements a semaphore to control access to a finite number of resources.
- **Shared Mutex**: Allows multiple readers or exclusive writer access, facilitating reader-writer scenarios.
- **Error Handling**: Includes specific error classes like `MutexError`, `MutexOwnershipError`, `MutexRelockError`, and `TimeoutError` to handle different synchronization scenarios.

## Installation

NPM:

```bash
npm install semafy
```

Yarn:

```bash
yarn add semafy
```

## Browser Usage

For security reasons, browsers have certain requirements for using shared memory. These requirements must be met to use this library in a browser. Please see [SharedArrayBuffer > Security Requirements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements) for details.

## Contributing

Contributions are welcome! Please submit any bugs, issues, or pull requests to the [project's GitHub repository](https://github.com/havelessbemore/semafy).
