import { ConnectButton, ErrorButton, LoadingButton } from "@/components";
import type { Address } from "viem";
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
  if (!isConnected) return <ConnectButton />;
  if (errors.length > 0)
    return <ErrorButton errors={errors}>Submit</ErrorButton>;
  if (!userAddress || !currencyAddress) return <LoadingButton />;
  return (
    <ActionButton
      {...delegatedProps}
      userAddress={userAddress}
      currencyAddress={currencyAddress}
    />
  );
}
