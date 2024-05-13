import { SharedResource } from "../types/sharedResource";

/**
 * Represents a flag that can be set exactly once across different execution agents.
 */
export class OnceFlag implements SharedResource {
  /**
   * The bit within the shared memory used to set the flag.
   */
  protected _bit: number;
  /**
   * The offset for the bit within the 32-bit integer of the shared memory.
   */
  protected _bitOffset: number;
  /**
   * The shared memory buffer used for the flag.
   */
  protected _mem: Int32Array;

  constructor();
  /**
   * @param sharedBuffer The {@link SharedArrayBuffer} that backs the flag.
   * @param byteOffset The byte offset within `sharedBuffer`. Defaults to `0`.
   * @param bitOffset The bit offset within the shared memory location. Defaults to `0`.
   * This allows for different bits of a single integer to be used by different flags.
   */
  constructor(
    sharedBuffer: SharedArrayBuffer,
    byteOffset?: number,
    bitOffset?: number,
  );
  constructor(
    sharedBuffer?: SharedArrayBuffer,
    byteOffset = 0,
    bitOffset?: number,
  ) {
    // Sanitize input
    sharedBuffer ??= new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT);
    bitOffset ??= 0;

    // Initialize properties
    this._bit = 1 << bitOffset;
    this._bitOffset = bitOffset;
    this._mem = new Int32Array(sharedBuffer, byteOffset, 1);
  }

  get buffer(): SharedArrayBuffer {
    return this._mem.buffer as SharedArrayBuffer;
  }

  get byteLength(): number {
    return this._mem.byteLength;
  }

  get byteOffset(): number {
    return this._mem.byteOffset;
  }

  /**
   * The bit offset for the flag within shared memory, relative to `byteOffset`.
   */
  get bitOffset(): number {
    return this._bitOffset;
  }

  /**
   * Resets the flag state to `false`.
   *
   * @returns `true` if the flag was previously set, `false` otherwise.
   */
  clear(): boolean {
    return (Atomics.and(this._mem, 0, ~this._bit) & this._bit) !== 0;
  }

  /**
   * Checks if the flag is currently set.
   *
   * @returns `true` if the flag is set, `false` otherwise.
   */
  isSet(): boolean {
    return (Atomics.load(this._mem, 0) & this._bit) !== 0;
  }

  /**
   * Sets the flag to `true`. This operation is atomic and thread-safe.
   *
   * @returns `true` if the flag was set, `false` if it was already set.
   */
  set(): boolean {
    return (Atomics.or(this._mem, 0, this._bit) & this._bit) === 0;
  }
}