import type { chainsById } from "@/constants";

export type ChainsById = typeof chainsById;

export type ChainId = keyof ChainsById;

export type ChainName = ChainsById[ChainId];
