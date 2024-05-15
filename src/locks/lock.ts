import { MultiLockError } from "../errors/multiLockError";
import { BasicLockable } from "../types/basicLockable";

/**
 * Sequentially locks the provided {@link BasicLockable} objects.
 *
 * If any lock acquisition fails, the process is halted
 * and previously acquired locks are released in reverse order.
 *
 * @param locks - An array of lockable objects to be locked sequentially.
 *
 * @throws A {@link MultiLockError} if an error occurs trying to acquire all
 * locks. Details include:
 *  - `locks`: The array of all locks.
 *  - `numLocked`: The number of locks successfully acquired before failure.
 *  - `lockErrors`: Errors encountered while trying to acquire all locks.
 *  - `unlockErrors`: Errors encountered while trying to roll back acquired locks.
 */
export async function lock(...locks: BasicLockable[]): Promise<void> {
  const N = locks.length;
  const lockErrors: [number, unknown][] = [];

  // Lock each lock. Stop at first error
  let numLocked = N;
  for (let i = 0; i < N; ++i) {
    try {
      await locks[i].lock();
    } catch (err) {
      lockErrors.push([i, err]);
      numLocked = i;
      break;
    }
  }

  // If successful
  if (numLocked === N) {
    return;
  }

  // Unlock acquired locks. Collect any errors
  const unlockErrors: [number, unknown][] = [];
  for (let i = numLocked - 1; i >= 0; --i) {
    try {
      await locks[i].unlock();
    } catch (err) {
      unlockErrors.push([i, err]);
    }
  }

  throw new MultiLockError(locks, numLocked, lockErrors, unlockErrors);
}
