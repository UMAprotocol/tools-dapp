import GreyCircle from "@/icons/grey-circle.svg";
import styles from "./Preview.module.css";
export function Preview() {
  return (
    <>
      <h2 className={styles.title}>Preview</h2>
      <div className={styles.wrapper}>
        <h3 className={styles.subtitle}>
          <GreyCircle />
          Assertion Statement:
        </h3>
        <div className={styles.statement}>
          <p>Statement goes here</p>
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
          <p>100 DAI</p>
        </div>
        <h2 className={styles.subtitle}>
          <GreyCircle /> Challenge Period:
        </h2>
        <div className={styles.content}>
          <p>7 days</p>
        </div>
      </div>
    </>
  );
}
