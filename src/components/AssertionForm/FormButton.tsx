import { ConnectButton, ErrorButton, LoadingButton } from "@/components";
import { ActionButton } from "./ActionButton/ActionButton";
import type { AssertionFormProps } from "./useAssertionForm";

export function FormButton(props: AssertionFormProps) {
  const { isConnected, currencyAddress, errors } = props;
  if (!isConnected) return <ConnectButton />;
  if (errors.length > 0)
    return <ErrorButton errors={errors}>Submit</ErrorButton>;
  if (!currencyAddress) return <LoadingButton />;
  return <ActionButton {...props} currencyAddress={currencyAddress} />;
}
