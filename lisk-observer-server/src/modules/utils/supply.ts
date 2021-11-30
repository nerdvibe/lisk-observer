import { getBlock } from "@modules/blocks/getBlock";

const PRE_ONE_LSK_BLOCK_MINED = 142000000; // How many LSK have been mined before 1 LSK per block, including pre-mine
const ONE_LSK_BLOCK_HEIGHT = 13451520; // The height where the block reward became 1 LSK

export const calculateTotalSupply = async (height?: number) => {
  let givenHeight = height;

  if (!givenHeight) {
    const block = await getBlock();
    givenHeight = block.height;
  }

  return PRE_ONE_LSK_BLOCK_MINED + (givenHeight - ONE_LSK_BLOCK_HEIGHT);
};
