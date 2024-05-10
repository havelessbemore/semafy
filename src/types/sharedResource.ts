/**
 * Represents a shared resource that is backed by a {@link SharedArrayBuffer}.
 *
 * This resource can be shared across different execution contexts, such as
 * web workers or the main thread, enabling data sharing and manipulation.
 */
export interface SharedResource {
  /**
   * The underlying {@link SharedArrayBuffer}
   * and primary storage for shared data.
   */
  buffer: Readonly<SharedArrayBuffer>;

  /**
   * The total length in bytes being used from the {@link SharedArrayBuffer}.
   */
  byteLength: Readonly<number>;

  /**
   * The byte offset within the {@link SharedArrayBuffer} where data begins.
   */
  byteOffset: Readonly<number>;
}
