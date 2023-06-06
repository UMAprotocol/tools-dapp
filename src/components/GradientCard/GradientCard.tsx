import styles from "./GradientCard.module.css";

export function GradientCard() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topCircle}></div>
      <div className={styles.bottomCircle}></div>
      GradientCard
    </div>
  );
}
