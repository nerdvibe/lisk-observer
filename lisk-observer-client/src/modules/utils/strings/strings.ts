export const truncateMidString = (str: string = "", length: number = 15) => {
  if (str.length < length) {
    return str;
  }

  const ellipsis = "...";
  const charsOnEitherSide = Math.floor(length / 2);

  return (
    str.slice(0, charsOnEitherSide) + ellipsis + str.slice(-charsOnEitherSide)
  );
};

export const hexToString = (hex: string = "") => {
  let string = "";
  const hexString = hex && hex.length ? hex : "";
  for (var i = 0; i < hexString.length; i += 2) {
    string += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
  }
  return string;
};
