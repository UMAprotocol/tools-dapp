import NextLink from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Dashboard</h1>
      <NextLink href="/assertion-tool">Assertion Tool</NextLink>
    </main>
  );
}
