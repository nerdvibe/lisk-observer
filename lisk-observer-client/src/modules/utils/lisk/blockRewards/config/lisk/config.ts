export const liskConfig = {
  testnet: {
    TOTAL_AMOUNT: 10000000000000000,
    MILESTONES: [
      "500000000", // Initial Reward
      "400000000", // Milestone 1
      "300000000", // Milestone 2
      "200000000", // Milestone 3
      "100000000", // Milestone 4
    ],
    OFFSET: 2160, // Start rewards at 39th block of 22nd round
    DISTANCE: 3000000, // Distance between each milestone
  },
  mainnet: {
    TOTAL_AMOUNT: 10000000000000000,
    MILESTONES: [
      "500000000", // Initial Reward
      "400000000", // Milestone 1
      "300000000", // Milestone 2
      "200000000", // Milestone 3
      "100000000", // Milestone 4
    ],
    OFFSET: 1451520, // Start rewards at 39th block of 22nd round
    DISTANCE: 3000000, // Distance between each milestone
  },
};
