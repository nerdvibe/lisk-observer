import React from "react";

const redStatus = {
  width: "20px",
  height: "20px",
  borderRadius: "26px",
  backgroundColor: "#FC78A3",
};

const greenStatus = {
  width: "20px",
  height: "20px",
  borderRadius: "26px",
  backgroundColor: "#00bf9a",
};

const unknownStatus = {
  width: "20px",
  height: "20px",
  borderRadius: "26px",
  borderColor: "rgb(191, 115, 0)",
  borderStyle: "dashed",
};

export const delegateStatusColor = (rank: string) => {
  const color =
    +rank > 101
      ? { ...unknownStatus }
      : parseInt(rank) % 2 == 0
      ? { ...redStatus }
      : { ...greenStatus };
  return <div className="float-right" style={color} />;
};
