import { describe, expect, test } from "@jest/globals";

import { Mutex } from "./mutex";
import { RelockError } from "../errors/relockError";
import { OwnershipError } from "../errors/ownershipError";

describe(Mutex.name, () => {
  describe(`constructor()`, () => {
    test("creates an instance", () => {
      let inst: Mutex | undefined = undefined;
      expect(() => (inst = new Mutex())).not.toThrow();
      expect(inst!.byteOffset).toBe(0);
      expect(inst!.ownsLock).toBe(false);
    });

    test("creates an instance with a shared buffer", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(bpe);

      let inst: Mutex | undefined = undefined;
      expect(() => (inst = new Mutex(buffer))).not.toThrow();
      expect(inst!.buffer).toBe(buffer);
      expect(inst!.byteOffset).toBe(0);
      expect(inst!.ownsLock).toBe(false);
    });

    test("creates an instance with an offset shared buffer", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(5 * bpe);
      const byteOffset = 2 * bpe;

      let inst: Mutex | undefined = undefined;
      expect(() => (inst = new Mutex(buffer, byteOffset))).not.toThrow();
      expect(inst!.buffer).toBe(buffer);
      expect(inst!.byteOffset).toBe(byteOffset);
      expect(inst!.ownsLock).toBe(false);
    });

    test("throws if shared buffer is empty", () => {
      const buffer = new SharedArrayBuffer(0);
      expect(() => new Mutex(buffer)).toThrow();
    });

    test("throws if shared buffer not large enough", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(bpe - 1);
      expect(() => new Mutex(buffer)).toThrow();
    });

    test("throws if not enough space in shared buffer", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(10 * bpe);
      const byteOffset = buffer.byteLength - bpe + 1;
      expect(() => new Mutex(buffer, byteOffset)).toThrow();
    });

    test("throws if negative byte offset", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(bpe);
      expect(() => new Mutex(buffer, -1)).toThrow();
    });

    test("throws if byte offset too high", () => {
      const bpe = Int32Array.BYTES_PER_ELEMENT;
      const buffer = new SharedArrayBuffer(bpe);
      const byteOffset = bpe;
      expect(() => new Mutex(buffer, byteOffset)).toThrow();
    });
  });

  describe(`${Mutex.prototype.lock.name}()`, () => {
    test("locks if unlocked", async () => {
      const inst = new Mutex();
      await expect(inst.lock()).resolves.not.toThrow();
      expect(inst.ownsLock).toBe(true);
    });

    test("throws if locked twice", async () => {
      const inst = new Mutex();
      await expect(inst.lock()).resolves.not.toThrow();
      await expect(inst.lock()).rejects.toThrow(RelockError);
      expect(inst.ownsLock).toBe(true);
    });
  });

  describe(`${Mutex.prototype.tryLock.name}()`, () => {
    test("locks if unlocked", async () => {
      const inst = new Mutex();
      expect(inst.tryLock()).toBe(true);
      expect(inst.ownsLock).toBe(true);
    });

    test("Does not allow relock", async () => {
      const inst = new Mutex();
      expect(inst.tryLock()).toBe(true);
      expect(inst.tryLock()).toBe(false);
      expect(inst.ownsLock).toBe(true);
    });
  });

  describe(`${Mutex.prototype.unlock.name}()`, () => {
    test("unlocks if locked", async () => {
      const inst = new Mutex();
      await inst.lock();
      expect(inst.ownsLock).toBe(true);
      expect(() => inst.unlock()).not.toThrow();
      expect(inst.ownsLock).toBe(false);
    });

    test("throws if not locked", async () => {
      const inst = new Mutex();
      expect(() => inst.unlock()).toThrow(OwnershipError);
      expect(inst.ownsLock).toBe(false);
    });

    test("allows relock via lock", async () => {
      const inst = new Mutex();
      await inst.lock();
      inst.unlock();
      await expect(inst.lock()).resolves.not.toThrow();
      expect(inst.ownsLock).toBe(true);
    });

    test("allows relock via tryLock", async () => {
      const inst = new Mutex();
      await inst.lock();
      inst.unlock();
      expect(() => inst.tryLock()).not.toThrow();
      expect(inst.ownsLock).toBe(true);
    });
  });
});
