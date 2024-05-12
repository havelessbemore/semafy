import { describe, expect, test } from "@jest/globals";

import { RecursiveMutex } from "./recursiveMutex";
import { OwnershipError } from "../errors/ownershipError";

describe(RecursiveMutex.name, () => {
  describe(`constructor()`, () => {
    test("creates an instance", () => {
      let inst: RecursiveMutex | undefined = undefined;
      expect(() => (inst = new RecursiveMutex())).not.toThrow();
      expect(inst!.byteOffset).toBe(0);
      expect(inst!.ownsLock).toBe(false);
    });

    test("creates an instance with a shared buffer", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(bpe);

      let inst: RecursiveMutex | undefined = undefined;
      expect(() => (inst = new RecursiveMutex(buffer))).not.toThrow();
      expect(inst!.buffer).toBe(buffer);
      expect(inst!.byteOffset).toBe(0);
      expect(inst!.ownsLock).toBe(false);
    });

    test("creates an instance with an offset shared buffer", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(5 * bpe);
      const byteOffset = 2 * bpe;

      let inst: RecursiveMutex | undefined = undefined;
      expect(
        () => (inst = new RecursiveMutex(buffer, byteOffset)),
      ).not.toThrow();
      expect(inst!.buffer).toBe(buffer);
      expect(inst!.byteOffset).toBe(byteOffset);
      expect(inst!.ownsLock).toBe(false);
    });

    test("throws if shared buffer is empty", () => {
      const buffer = new SharedArrayBuffer(0);
      expect(() => new RecursiveMutex(buffer)).toThrow();
    });

    test("throws if shared buffer not large enough", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(bpe - 1);
      expect(() => new RecursiveMutex(buffer)).toThrow();
    });

    test("throws if not enough space in shared buffer", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(10 * bpe);
      const byteOffset = buffer.byteLength - bpe + 1;
      expect(() => new RecursiveMutex(buffer, byteOffset)).toThrow();
    });

    test("throws if negative byte offset", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(bpe);
      expect(() => new RecursiveMutex(buffer, -1)).toThrow();
    });

    test("throws if byte offset too high", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(bpe);
      const byteOffset = bpe;
      expect(() => new RecursiveMutex(buffer, byteOffset)).toThrow();
    });
  });

  describe(`${RecursiveMutex.prototype.lock.name}()`, () => {
    test("locks if unlocked", async () => {
      const inst = new RecursiveMutex();
      await expect(inst.lock()).resolves.not.toThrow();
      expect(inst.ownsLock).toBe(true);
    });

    test("Allows relocking from same agent", async () => {
      const inst = new RecursiveMutex();
      await expect(inst.lock()).resolves.not.toThrow();
      await expect(inst.lock()).resolves.not.toThrow();
      expect(inst.ownsLock).toBe(true);
    });
  });

  describe(`${RecursiveMutex.prototype.tryLock.name}()`, () => {
    test("locks if unlocked", async () => {
      const inst = new RecursiveMutex();
      expect(inst.tryLock()).toBe(true);
      expect(inst.ownsLock).toBe(true);
    });

    test("Allows relocking from same agent", async () => {
      const inst = new RecursiveMutex();
      expect(inst.tryLock()).toBe(true);
      expect(inst.tryLock()).toBe(true);
      expect(inst.ownsLock).toBe(true);
    });
  });

  describe(`${RecursiveMutex.prototype.unlock.name}()`, () => {
    test("unlocks if locked", async () => {
      const inst = new RecursiveMutex();
      await inst.lock();
      expect(inst.ownsLock).toBe(true);
      expect(() => inst.unlock()).not.toThrow();
      expect(inst.ownsLock).toBe(false);
    });

    test("throws if not locked", async () => {
      const inst = new RecursiveMutex();
      expect(() => inst.unlock()).toThrow(OwnershipError);
      expect(inst.ownsLock).toBe(false);
    });

    test("allows relock via lock", async () => {
      const inst = new RecursiveMutex();
      await inst.lock();
      inst.unlock();
      await expect(inst.lock()).resolves.not.toThrow();
      expect(inst.ownsLock).toBe(true);
    });

    test("allows relock via tryLock", async () => {
      const inst = new RecursiveMutex();
      await inst.lock();
      inst.unlock();
      expect(() => inst.tryLock()).not.toThrow();
      expect(inst.ownsLock).toBe(true);
    });
  });
});
