import { Banner } from "@/components/Banner";
import { RedLink } from "@/components/RedLink";

export default function AssertionToolPage() {
  return (
    <main>
      <Banner
        page="assertion-tool"
        title="Assertion Tool"
        subtitle={
          <>
            This smart contract allows data providers to assert the correctness
            of a data point, within any arbitrary data set, and bring the result
            on-chain. This contract is designed to be maximally open ended,
            enabling any kind of data to be asserted.{" "}
            <RedLink href="todo">Read more</RedLink>
          </>
        }
      />
    </main>
  );
}
