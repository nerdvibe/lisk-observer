import React from "react";

const dot = {
  display: "inline-block",
  marginRight: 10,
  width: "20px",
  height: "20px",
  borderRadius: "26px",
};

const redStatus = {
  backgroundColor: "#FC78A3",
};

const greenStatus = {
  backgroundColor: "#00bf9a",
};

const missingBlocksStatus = {
  backgroundColor: "#e35f5f",
};

const unknownStatus = {
  borderColor: "rgb(191, 115, 0)",
  borderStyle: "dashed",
};
const greyStatus = {
  borderColor: "rgb(149,200,199)",
  borderStyle: "dashed",
};

const punishedStatus = {
  backgroundColor: "rgb(250,179,0)",
  borderStyle: "solid",
};

export const delegateStatusColor = (
  rank: string,
  isBanned: boolean,
  missingBlocks: boolean,
  willForge: boolean,
  isPunished: boolean,
  isMinimumWeightForStandby: boolean,
  message?: string
) => {
  const color = {
    ...dot,
    ...(willForge && greenStatus),
    ...(!willForge && !missingBlocks && !isBanned && unknownStatus),
    ...(!isMinimumWeightForStandby && greyStatus),
    ...(missingBlocks && missingBlocksStatus),
    ...(isPunished && punishedStatus),
    ...(isBanned && redStatus),
  };
  return (
    <>
      <div
        className=""
        style={color}
        data-tip={isBanned ? "Banned" : message ? message : ""}
      >
        &nbsp;&nbsp;&nbsp;
      </div>
    </>
  );
};
