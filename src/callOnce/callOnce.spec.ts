import { beforeEach, describe, expect, jest, test } from "@jest/globals";

import { callOnce } from "./callOnce";
import { OnceFlag } from "./onceFlag";

describe(`${callOnce.name}()`, () => {
  let sharedBuffer: SharedArrayBuffer;

  beforeEach(() => {
    sharedBuffer = new SharedArrayBuffer(OnceFlag.ByteLength);
  });

  test("should execute the callback and return its result if the flag is not set", () => {
    const flag = new OnceFlag(sharedBuffer);
    const callback = jest.fn().mockReturnValue("result");

    const result = callOnce(flag, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(result).toBe("result");
    expect(flag.isSet()).toBe(true);
  });

  test("should not execute the callback and return undefined if the flag is already set", () => {
    const flag = new OnceFlag(sharedBuffer);
    const callback = jest.fn().mockReturnValue("result");

    flag.set(); // Set the flag

    const result = callOnce(flag, callback);

    expect(callback).not.toHaveBeenCalled();
    expect(result).toBeUndefined();
    expect(flag.isSet()).toBe(true);
  });

  test("should execute the callback only once across multiple calls when flag is shared", () => {
    const flag = new OnceFlag(sharedBuffer);
    const callback = jest.fn().mockReturnValue("result");

    const result1 = callOnce(flag, callback);
    const result2 = callOnce(flag, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(result1).toBe("result");
    expect(result2).toBeUndefined();
    expect(flag.isSet()).toBe(true);
  });

  test("should work correctly with different instances of OnceFlag sharing the same buffer", () => {
    const flag1 = new OnceFlag(sharedBuffer);
    const flag2 = new OnceFlag(sharedBuffer);
    const callback = jest.fn().mockReturnValue("result");

    const result1 = callOnce(flag1, callback);
    const result2 = callOnce(flag2, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(result1).toBe("result");
    expect(result2).toBeUndefined();
    expect(flag1.isSet()).toBe(true);
    expect(flag2.isSet()).toBe(true);
  });

  test("should return the correct type from the callback", () => {
    const flag = new OnceFlag(sharedBuffer);

    const numberCallback = jest.fn().mockReturnValue(42);
    const stringCallback = jest.fn().mockReturnValue("hello");
    const objectCallback = jest.fn().mockReturnValue({ key: "value" });

    expect(callOnce(flag, numberCallback)).toBe(42);
    flag.clear(); // Clear the flag for the next test

    expect(callOnce(flag, stringCallback)).toBe("hello");
    flag.clear(); // Clear the flag for the next test

    expect(callOnce(flag, objectCallback)).toEqual({ key: "value" });
  });
});
