import GreyCircle from "@/icons/grey-circle.svg";
import ReactMarkdown from "react-markdown";
import styles from "./Preview.module.css";

interface Props {
  claim: string;
  currency: string | undefined;
  bond: string;
  challengePeriod: string | undefined;
}
export function Preview({ claim, currency, bond, challengePeriod }: Props) {
  return (
    <div className={styles.outerWrapper}>
      <h2 className={styles.title}>Preview</h2>
      <div className={styles.wrapper}>
        <h3 className={styles.subtitle}>
          <GreyCircle />
          Assertion Claim:
        </h3>
        <div className={styles.claim}>
          <ReactMarkdown
            components={{
              a: (props) => (
                <a {...props} target="_blank" className={styles.link} />
              ),
            }}
          >
            {claim === "" ? "I assert that..." : claim}
          </ReactMarkdown>
        </div>
        <h2 className={styles.subtitle}>
          <GreyCircle /> Bond Value:
        </h2>
        <div className={styles.content}>
          <p>
            {bond} {currency}
          </p>
        </div>
        <h2 className={styles.subtitle}>
          <GreyCircle /> Challenge Period:
        </h2>
        <div className={styles.content}>
          <p>{challengePeriod}</p>
        </div>
      </div>
    </div>
  );
}
