import NextLink from "next/link";
import styles from "./page.module.css";
export default function Home() {
  return (
    <main>
      <h1 className={styles.header}>Dashboard</h1>
      <h1 className={styles.header2}>Test test</h1>
      <h1 className={styles.header3}>Test test</h1>
      <NextLink href="/assertion-tool">Assertion Tool</NextLink>
    </main>
  );
}
