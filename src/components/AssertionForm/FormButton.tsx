import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { Address } from "viem";
import { ErrorButton } from "../ErrorButton";
import { LoadingButton } from "../LoadingButton";
import { ActionButton } from "./ActionButton/ActionButton";
import type { AssertionFormProps } from "./useAssertionForm";

type Props = {
  delegatedProps: AssertionFormProps;
  isConnected: boolean;
  userAddress: Address | undefined;
  currencyAddress: Address | undefined;
  errors: string[];
};
export function FormButton({
  delegatedProps,
  isConnected,
  userAddress,
  currencyAddress,
  errors,
}: Props) {
  if (errors.length > 0)
    return <ErrorButton errors={errors}>Submit</ErrorButton>;
  if (!isConnected) return <ConnectButton />;
  if (!userAddress || !currencyAddress) return <LoadingButton />;
  return (
    <ActionButton
      {...delegatedProps}
      userAddress={userAddress}
      currencyAddress={currencyAddress}
    />
  );
}
