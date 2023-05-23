import { oov3Abi } from "@/abis";
import { Button, Tooltip } from "@/components";
import { stringToHex, zeroAddress } from "viem";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import type { Props } from "./ActionButton";

export function SubmitButton(props: Props) {
  const { hasClaim, submitAssertion, tooltipContent } = useSubmitButton(props);
  return (
    <Tooltip content={tooltipContent}>
      <Button disabled={!hasClaim} onClick={submitAssertion}>
        <span>Submit</span>
      </Button>
    </Tooltip>
  );
}

function useSubmitButton(props: Props) {
  const {
    claim,
    bondBigInt,
    challengePeriodBigInt,
    userAddress,
    currencyAddress,
    oracleAddress,
  } = props;
  const hasClaim = claim.length > 0;

  const { config } = usePrepareContractWrite({
    address: oracleAddress,
    abi: oov3Abi,
    functionName: "assertTruth",
    args: [
      stringToHex(claim, { size: 32 }),
      userAddress,
      zeroAddress,
      zeroAddress,
      challengePeriodBigInt,
      currencyAddress,
      bondBigInt,
      stringToHex("ASSERT_TRUTH", { size: 32 }),
      stringToHex("0x0", { size: 32 }),
    ],
  });

  const { write } = useContractWrite(config);

  const tooltipContent = hasClaim
    ? undefined
    : "Please enter a claim to submit";

  return {
    ...props,
    hasClaim,
    submitAssertion: () => write?.(),
    tooltipContent,
  };
}
