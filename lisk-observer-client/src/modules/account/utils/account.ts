export const isLegacyAddress = (address: string) => {
  return (
    !isNaN(Number(address.slice(0, address.length - 1))) &&
    address[address.length - 1] === "L"
  );
};
