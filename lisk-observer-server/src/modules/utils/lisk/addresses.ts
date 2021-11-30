import {
  getAddressFromPublicKey,
  getBase32AddressFromAddress,
  getAddressFromBase32Address,
} from "@liskhq/lisk-cryptography";

// e.g.
// pk     de10543964171768e5af1a7811b512683259d6b09553a7a53033b2742d6aa646
// hex    efde519ce48b20af69370b94f8eddbedb8e666f8
// base32 lskhg8mcnnpyou6fd4wx768ys7shej7oaw249vejn

export const getHexAddressFromPublicKey = (publicKey) => {
  const binaryAddress = getAddressFromPublicKey(Buffer.from(publicKey, "hex"));
  return binaryAddress.toString("hex");
};

export const getBase32AddressFromHex = (address) => {
  const base32Address = getBase32AddressFromAddress(
    Buffer.from(address, "hex")
  );
  return base32Address;
};

export const getHexAddressFromBase32 = (address) => {
  const binaryAddress = getAddressFromBase32Address(address).toString("hex");
  return binaryAddress;
};

export const getBase32AddressFromPublicKey = (publicKey: string) => {
  const hex = getHexAddressFromPublicKey(publicKey);
  const lskAddress = getBase32AddressFromHex(hex);
  return lskAddress;
};

export const isLegacyAddress = (address: string) => {
  return (
    !isNaN(Number(address.slice(0, address.length - 1))) &&
    address[address.length - 1] === "L"
  );
};
