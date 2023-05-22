export const chainsById = {
  1: "Ethereum" as const,
  5: "Goerli" as const,
  10: "Optimism" as const,
  137: "Polygon" as const,
  42161: "Arbitrum" as const,
};

export const chainNames = Object.values(chainsById);
