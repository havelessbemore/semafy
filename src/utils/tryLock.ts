import { MultiLockError } from "../errors/multiLockError";
import { MultiUnlockError } from "../errors/multiUnlockError";
import { Lockable } from "../types/lockable";

/**
 * Tries to sequentially acquire locks on the provided {@link Lockable} objects.
 * If any lock acquisition fails or an error is thrown, the process is halted,
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
 *
 * @throws A {@link MultiUnlockError} if, after lock failure, an errors occurs
 * while trying to roll back acquired locks. Details include:
 *  - `locks`: The array of all locks.
 *  - `numUnlocked`: The number of locks successfully unlocked.
 *  - `unlockErrors`: Errors encountered while trying to roll back acquired locks.
 *
 * @returns `-1` if all locks are successfully acquired, otherwise the 0-based index of the lock that failed.
 */
export async function tryLock(...locks: Lockable[]): Promise<number> {
  const N = locks.length;
  const lockErrors: [number, unknown][] = [];

  // Lock each lock. Stop at first failure
  let numLocked = N;
  for (let i = 0; i < N; ++i) {
    try {
      if (!(await locks[i].tryLock())) {
        numLocked = i;
        break;
      }
    } catch (err) {
      lockErrors.push([i, err]);
      numLocked = i;
      break;
    }
  }

  // If successful
  if (numLocked === N) {
    return -1;
  }

  // If immediate failure
  if (numLocked < 1) {
    return numLocked;
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

  // If errors occurred
  if (lockErrors.length > 0) {
    throw new MultiLockError(locks, numLocked, lockErrors, unlockErrors);
  }
  if (unlockErrors.length > 0) {
    const numUnlocked = numLocked - unlockErrors.length;
    throw new MultiUnlockError(locks, numUnlocked, unlockErrors);
  }

  // Return 0-based index of failed lock
  return numLocked;
}
