import { cssVariables } from "@/helpers";
import styles from "./GradientCard.module.css";

export function GradientCard() {
  // get the last 2 characters of a string
  const randomSeed = `${Math.random()}`.slice(-2);
  console.log(randomSeed);
  const style = cssVariables({
    "--random-seed": randomSeed,
  });
  return (
    <div className={styles.wrapper} style={style}>
      <div className={styles.topCircle}></div>
      <div className={styles.bottomCircle}></div>
      GradientCard
    </div>
  );
}
