import type { ChainId } from "@/types";

function getBlockExplorerUrlForChain(chainId: ChainId) {
  switch (chainId) {
    case 1:
      return "https://etherscan.io";
    case 5:
      return "https://goerli.etherscan.io";
    case 10:
      return "https://optimistic.etherscan.io";
    case 137:
      return "https://polygonscan.com";
    case 42161:
      return "https://arbiscan.io";
  }
}

export function makeBlockExplorerLink(
  hash: string,
  chainId: ChainId,
  type: "tx" | "address" | "block"
) {
  const url = getBlockExplorerUrlForChain(chainId);

  if (!url) return "";

  return `${url}/${type}/${hash}`;
}
