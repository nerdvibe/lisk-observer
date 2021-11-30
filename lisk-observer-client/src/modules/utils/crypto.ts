import { Buffer } from "buffer";
import { createHash } from "crypto-browserify";

export const digestMessage = async (message: string | Buffer) => {
  const msg = typeof message === "string" ? message : message.toString();
  const encoder = new TextEncoder();
  const data = encoder.encode(msg);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const isArrayBufferSupported =
    new Buffer(new Uint8Array([1]).buffer)[0] === 1;
  const arrayBufferToBuffer = isArrayBufferSupported
    ? arrayBufferToBufferAsArgument
    : arrayBufferToBufferCycle;

  return arrayBufferToBuffer(hash);
};

const arrayBufferToBufferAsArgument = (ab: ArrayBuffer) => {
  return new Buffer(ab);
};

function arrayBufferToBufferCycle(ab: ArrayBuffer) {
  var buffer = new Buffer(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
    buffer[i] = view[i];
  }
  return buffer;
}

const cryptoHashSha256 = (data: Buffer): Buffer => {
  const dataHash = createHash("sha256");
  dataHash.update(data);

  return dataHash.digest();
};

const hexRegex = /^[0-9a-f]+/i;
export const hexToBuffer = (hex: string, argumentName = "Argument"): Buffer => {
  if (typeof hex !== "string") {
    throw new TypeError(`${argumentName} must be a string.`);
  }
  const matchedHex = (hex.match(hexRegex) || [])[0];
  if (!matchedHex || matchedHex.length !== hex.length) {
    throw new TypeError(`${argumentName} must be a valid hex string.`);
  }
  if (matchedHex.length % 2 !== 0) {
    throw new TypeError(
      `${argumentName} must have a valid length of hex string.`
    );
  }

  return Buffer.from(matchedHex, "hex");
};

export const hash = (data: Buffer | string, format?: string): Buffer => {
  if (Buffer.isBuffer(data)) {
    return cryptoHashSha256(data);
  }

  if (typeof data === "string" && typeof format === "string") {
    if (!["utf8", "hex"].includes(format)) {
      throw new Error(
        "Unsupported string format. Currently only `hex` and `utf8` are supported."
      );
    }
    const encoded =
      format === "utf8" ? Buffer.from(data, "utf8") : hexToBuffer(data);

    return cryptoHashSha256(encoded);
  }

  throw new Error(
    "Unsupported data format. Currently only Buffers or `hex` and `utf8` strings are supported."
  );
};
