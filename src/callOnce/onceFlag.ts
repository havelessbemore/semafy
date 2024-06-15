import type { SharedResource } from "../types/sharedResource";

/**
 * Represents a flag that can be set exactly once across different execution agents.
 */
export class OnceFlag implements SharedResource {
  /**
   * The size in bytes of the flag.
   */
  static readonly ByteLength = Int32Array.BYTES_PER_ELEMENT;

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
   *
   * @throws A {@link RangeError} for any of the following:
   *  - `byteOffset` is negative or not a multiple of `4`.
   *  - The byte length of `sharedBuffer` is less than {@link ByteLength}.
   *  - The space in `sharedBuffer` starting from `byteOffset` is less than {@link ByteLength}.
   *  - `bitOffset` is negative.
   *  - `bitOffset` is greater than or equal to `4`.
   */
  constructor(
    sharedBuffer: SharedArrayBuffer,
    byteOffset?: number,
    bitOffset?: number,
  );
  constructor(sharedBuffer?: SharedArrayBuffer, byteOffset = 0, bitOffset = 0) {
    // Sanitize input
    sharedBuffer ??= new SharedArrayBuffer(OnceFlag.ByteLength);

    // Check bit offset
    if (bitOffset < 0) {
      throw new RangeError("Invalid bit offset", {
        cause: `${bitOffset} < 0`,
      });
    }
    if (bitOffset >= Int32Array.BYTES_PER_ELEMENT) {
      throw new RangeError("Invalid bit offset", {
        cause: `${bitOffset} >= ${Int32Array.BYTES_PER_ELEMENT}`,
      });
    }

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
