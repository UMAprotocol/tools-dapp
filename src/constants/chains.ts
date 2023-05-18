export const chainsById = {
  0: "Unsupported Chain" as const,
  1: "Ethereum" as const,
  5: "Goerli" as const,
  10: "Optimism" as const,
  100: "Gnosis" as const,
  137: "Polygon" as const,
  288: "Boba" as const,
  416: "SX" as const,
  43114: "Avalanche" as const,
  42161: "Arbitrum" as const,
  80001: "Mumbai" as const,
};

export const chainNames = Object.values(chainsById);
