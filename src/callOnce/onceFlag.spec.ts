import { beforeEach, describe, expect, test } from "@jest/globals";

import { OnceFlag } from "./onceFlag";

describe(`${OnceFlag.name}`, () => {
  let sharedBuffer: SharedArrayBuffer;

  beforeEach(() => {
    sharedBuffer = new SharedArrayBuffer(OnceFlag.ByteLength);
  });

  describe(`constructor`, () => {
    test("should initialize with default parameters", () => {
      const flag = new OnceFlag();
      expect(flag.buffer.byteLength).toBe(OnceFlag.ByteLength);
      expect(flag.byteLength).toBe(OnceFlag.ByteLength);
      expect(flag.byteOffset).toBe(0);
      expect(flag.bitOffset).toBe(0);
      expect(flag.isSet()).toBe(false);
    });

    test("should initialize with provided SharedArrayBuffer and default offsets", () => {
      const flag = new OnceFlag(sharedBuffer);
      expect(flag.buffer).toBe(sharedBuffer);
      expect(flag.byteLength).toBe(OnceFlag.ByteLength);
      expect(flag.byteOffset).toBe(0);
      expect(flag.bitOffset).toBe(0);
      expect(flag.isSet()).toBe(false);
    });

    test("should initialize with provided SharedArrayBuffer, byteOffset, and bitOffset", () => {
      const byteOffset = 0;
      const bitOffset = 2;
      const flag = new OnceFlag(sharedBuffer, byteOffset, bitOffset);
      expect(flag.buffer).toBe(sharedBuffer);
      expect(flag.byteLength).toBe(OnceFlag.ByteLength);
      expect(flag.byteOffset).toBe(byteOffset);
      expect(flag.bitOffset).toBe(bitOffset);
      expect(flag.isSet()).toBe(false);
    });

    test("should throw RangeError for negative byteOffset", () => {
      expect(() => new OnceFlag(sharedBuffer, -1)).toThrow(RangeError);
    });

    test("should throw RangeError for byteOffset not a multiple of 4", () => {
      expect(() => new OnceFlag(sharedBuffer, 3)).toThrow(RangeError);
    });

    test("should throw RangeError for SharedArrayBuffer length less than ByteLength", () => {
      const smallBuffer = new SharedArrayBuffer(OnceFlag.ByteLength - 1);
      expect(() => new OnceFlag(smallBuffer)).toThrow(RangeError);
    });

    test("should throw RangeError for byteOffset leaving insufficient space in SharedArrayBuffer", () => {
      expect(() => new OnceFlag(sharedBuffer, OnceFlag.ByteLength)).toThrow(
        RangeError,
      );
    });

    test("should throw RangeError for negative bitOffset", () => {
      expect(() => new OnceFlag(sharedBuffer, 0, -1)).toThrow(RangeError);
    });

    test("should throw RangeError for bitOffset greater than or equal to 32", () => {
      expect(() => new OnceFlag(sharedBuffer, 0, 32)).toThrow(RangeError);
    });
  });

  describe(`${OnceFlag.prototype.clear.name}()`, () => {
    test("should clear the flag and return true if it was previously set", () => {
      const flag = new OnceFlag(sharedBuffer);
      flag.set(); // Set the flag
      expect(flag.isSet()).toBe(true); // Ensure it is set
      expect(flag.clear()).toBe(true); // Clear the flag, expect true as it was previously set
      expect(flag.isSet()).toBe(false); // Ensure it is now cleared
    });

    test("should return false if the flag was not previously set", () => {
      const flag = new OnceFlag(sharedBuffer);
      expect(flag.isSet()).toBe(false); // Ensure it is not set
      expect(flag.clear()).toBe(false); // Clear the flag, expect false as it was not set
      expect(flag.isSet()).toBe(false); // Ensure it remains cleared
    });

    test("should allow re-setting the flag after it has been cleared", () => {
      const flag = new OnceFlag(sharedBuffer);
      flag.set(); // Set the flag
      expect(flag.isSet()).toBe(true); // Ensure it is set
      flag.clear(); // Clear the flag
      expect(flag.isSet()).toBe(false); // Ensure it is cleared
      expect(flag.set()).toBe(true); // Set the flag again, expect true as it was not set
      expect(flag.isSet()).toBe(true); // Ensure it is set again
    });

    test("should return true only on the first clear call when flag is set", () => {
      const flag = new OnceFlag(sharedBuffer);
      flag.set(); // Set the flag
      expect(flag.isSet()).toBe(true); // Ensure it is set
      expect(flag.clear()).toBe(true); // First clear, should return true
      expect(flag.clear()).toBe(false); // Subsequent clear, should return false
      expect(flag.isSet()).toBe(false); // Ensure it is cleared
    });

    test("should work correctly with bitOffset", () => {
      const bitOffset = 1;
      const flag = new OnceFlag(sharedBuffer, 0, bitOffset);
      flag.set(); // Set the flag with bitOffset
      expect(flag.isSet()).toBe(true); // Ensure it is set
      expect(flag.clear()).toBe(true); // Clear the flag with bitOffset, expect true
      expect(flag.isSet()).toBe(false); // Ensure it is cleared
      expect(flag.clear()).toBe(false); // Clear the flag again, expect false
    });
  });

  describe(`${OnceFlag.prototype.isSet.name}()`, () => {
    test("should return false when the flag is not set", () => {
      const flag = new OnceFlag(sharedBuffer);
      expect(flag.isSet()).toBe(false); // Ensure it is not set
    });

    test("should return true when the flag is set", () => {
      const flag = new OnceFlag(sharedBuffer);
      flag.set(); // Set the flag
      expect(flag.isSet()).toBe(true); // Ensure it is set
    });

    test("should return false after the flag has been cleared", () => {
      const flag = new OnceFlag(sharedBuffer);
      flag.set(); // Set the flag
      flag.clear(); // Clear the flag
      expect(flag.isSet()).toBe(false); // Ensure it is cleared
    });

    test("should return correct state after multiple sets and clears", () => {
      const flag = new OnceFlag(sharedBuffer);
      flag.set(); // Set the flag
      expect(flag.isSet()).toBe(true); // Ensure it is set
      flag.clear(); // Clear the flag
      expect(flag.isSet()).toBe(false); // Ensure it is cleared
      flag.set(); // Set the flag again
      expect(flag.isSet()).toBe(true); // Ensure it is set again
      flag.clear(); // Clear the flag again
      expect(flag.isSet()).toBe(false); // Ensure it is cleared again
    });

    test("should work correctly with bitOffset", () => {
      const bitOffset = 1;
      const flag = new OnceFlag(sharedBuffer, 0, bitOffset);
      expect(flag.isSet()).toBe(false); // Ensure it is not set
      flag.set(); // Set the flag with bitOffset
      expect(flag.isSet()).toBe(true); // Ensure it is set
      flag.clear(); // Clear the flag with bitOffset
      expect(flag.isSet()).toBe(false); // Ensure it is cleared
    });

    test("should accurately reflect state across multiple instances sharing the same buffer", () => {
      const flag1 = new OnceFlag(sharedBuffer);
      const flag2 = new OnceFlag(sharedBuffer);

      expect(flag1.isSet()).toBe(false); // Ensure it is not set
      expect(flag2.isSet()).toBe(false); // Ensure it is not set

      flag1.set(); // Set the flag using the first instance

      expect(flag1.isSet()).toBe(true); // Ensure the first instance sees it as set
      expect(flag2.isSet()).toBe(true); // Ensure the second instance sees it as set

      flag2.clear(); // Clear the flag using the second instance

      expect(flag1.isSet()).toBe(false); // Ensure the first instance sees it as cleared
      expect(flag2.isSet()).toBe(false); // Ensure the second instance sees it as cleared
    });
  });

  describe(`${OnceFlag.prototype.set.name}()`, () => {
    test("should set the flag and return true if it was not previously set", () => {
      const flag = new OnceFlag(sharedBuffer);
      expect(flag.isSet()).toBe(false); // Ensure it is not set
      expect(flag.set()).toBe(true); // Set the flag, expect true as it was not previously set
      expect(flag.isSet()).toBe(true); // Ensure it is now set
    });

    test("should return false if the flag was already set", () => {
      const flag = new OnceFlag(sharedBuffer);
      flag.set(); // Set the flag
      expect(flag.isSet()).toBe(true); // Ensure it is set
      expect(flag.set()).toBe(false); // Set the flag again, expect false as it was already set
      expect(flag.isSet()).toBe(true); // Ensure it remains set
    });

    test("should return true after flag has been cleared and set again", () => {
      const flag = new OnceFlag(sharedBuffer);
      flag.set(); // Set the flag
      expect(flag.isSet()).toBe(true); // Ensure it is set
      flag.clear(); // Clear the flag
      expect(flag.isSet()).toBe(false); // Ensure it is cleared
      expect(flag.set()).toBe(true); // Set the flag again, expect true as it was not previously set
      expect(flag.isSet()).toBe(true); // Ensure it is now set again
    });

    test("should return true only on the first set call when flag is cleared", () => {
      const flag = new OnceFlag(sharedBuffer);
      flag.set(); // Set the flag
      expect(flag.isSet()).toBe(true); // Ensure it is set
      flag.clear(); // Clear the flag
      expect(flag.isSet()).toBe(false); // Ensure it is cleared
      expect(flag.set()).toBe(true); // First set after clearing, should return true
      expect(flag.set()).toBe(false); // Subsequent set, should return false
      expect(flag.isSet()).toBe(true); // Ensure it is set
    });

    test("should work correctly with bitOffset", () => {
      const bitOffset = 1;
      const flag = new OnceFlag(sharedBuffer, 0, bitOffset);
      expect(flag.isSet()).toBe(false); // Ensure it is not set
      expect(flag.set()).toBe(true); // Set the flag with bitOffset, expect true
      expect(flag.isSet()).toBe(true); // Ensure it is now set
      expect(flag.set()).toBe(false); // Set the flag again, expect false
    });
  });
});
