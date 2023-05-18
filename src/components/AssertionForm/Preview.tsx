import GreyCircle from "@/icons/grey-circle.svg";
import ReactMarkdown from "react-markdown";
import styles from "./Preview.module.css";

interface Props {
  statement: string;
  currency: string | undefined;
  bond: string;
  challengePeriod: string | undefined;
}
export function Preview({ statement, currency, bond, challengePeriod }: Props) {
  return (
    <div className={styles.outerWrapper}>
      <h2 className={styles.title}>Preview</h2>
      <div className={styles.wrapper}>
        <h3 className={styles.subtitle}>
          <GreyCircle />
          Assertion Statement:
        </h3>
        <div className={styles.statement}>
          <ReactMarkdown
            components={{
              a: (props) => (
                <a {...props} target="_blank" className={styles.link} />
              ),
            }}
          >
            {statement === "" ? "I assert that..." : statement}
          </ReactMarkdown>
        </div>
        <h2 className={styles.subtitle}>
          <GreyCircle /> Timestamp:
        </h2>
        <div className={styles.content}>
          <p>
            {" "}
            <span className={styles.timestampLabel}>UNIX</span>timestamp
          </p>
          <p>
            <span className={styles.timestampLabel}>UTC</span> timestamp
          </p>
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
