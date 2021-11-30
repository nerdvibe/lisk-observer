export const queries = {
  nodeInfo: async () => {
    return {
      name: process.env.SERVER_NAME,
    };
  },
};
