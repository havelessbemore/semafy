import { OnceFlag } from "./onceFlag";

/**
 * Executes a callback function at most once, based on the state of a provided {@link OnceFlag}.
 *
 * This function ensures the callback is executed exactly once, even across multiple
 * calls in different agents (main thread, web workers). This is useful for one-time
 * processes, such as initialization and cleanup routines.
 *
 * - If the flag is already set, the callback is not executed and `undefined` is returned.
 *
 * - If the flag is not set, the flag is set, the callback is executed, and the callback's
 * result is returned.
 *
 * @param flag - The {@link OnceFlag} used to determine whether the callback has been invoked.
 * @param callbackfn - A function that will be called if the flag has not been set.
 *
 * @returns The result of `callbackfn` if the flag was not previously set, otherwise `undefined`.
 */
export function callOnce<T>(
  flag: OnceFlag,
  callbackfn: () => T,
): T | undefined {
  return flag.set() ? callbackfn() : undefined;
}
