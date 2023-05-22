import { oov3Abi } from "@/abis";
import { Button, Tooltip } from "@/components";
import { oov3AddressesByChainId } from "@/constants";
import type { ChainId } from "@/types";
import { parseUnits, stringToHex, zeroAddress } from "viem";
import type { Address } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import styles from "./ActionButton.module.css";

interface Props {
  address: Address;
  chainId: ChainId;
  claim: string;
  bond: string;
  currencyAddress: Address;
  decimals: number;
}
export function ActionButton({
  address,
  chainId,
  claim,
  bond,
  currencyAddress,
  decimals,
}: Props) {
  const hasClaim = claim.length > 0;
  const { config } = usePrepareContractWrite({
    address: oov3AddressesByChainId[chainId],
    abi: oov3Abi,
    functionName: "assertTruth",
    args: [
      stringToHex(claim || "stuff", { size: 32 }),
      address,
      zeroAddress,
      zeroAddress,
      720000n,
      currencyAddress,
      BigInt(parseUnits(bond as `${number}`, decimals)),
      stringToHex("ASSERT_TRUTH", { size: 32 }),
      stringToHex("0x0", { size: 32 }),
    ],
  });

  const { write } = useContractWrite(config);

  function onSubmit() {
    write?.();
  }

  const submitButton = (
    <Button disabled={!hasClaim || !address} type="submit" onSubmit={onSubmit}>
      Submit
    </Button>
  );

  return (
    <div className={styles.submitButtonWrapper} aria-disabled={!hasClaim}>
      {hasClaim ? (
        submitButton
      ) : (
        <Tooltip content="Please enter a claim to submit">
          <span>{submitButton}</span>
        </Tooltip>
      )}
    </div>
  );
}
