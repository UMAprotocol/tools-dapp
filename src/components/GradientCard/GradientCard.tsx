import { cssVariables, randomBetween } from "@/helpers";
import CardBackgroundIcon from "@/icons/card-background.svg";
import styles from "./GradientCard.module.css";

export function GradientCard() {
  const hue = randomBetween(0, 360);
  const complementaryHue = (hue + 180) % 360;
  const saturation = randomBetween(86, 93);
  const lightness = randomBetween(68, 72);
  const backgroundIconWidth = randomBetween(80, 200);
  const backgroundIconTop = randomBetween(-80, 80);
  const backgroundIconLeft = randomBetween(-80, 80);

  const style = cssVariables({
    "--hue": `${hue}`,
    "--complementary-hue": `${complementaryHue}`,
    "--saturation": `${saturation}%`,
    "--lightness": `${lightness}%`,
    "--background-icon-width": `${backgroundIconWidth}%`,
    "--background-icon-top": `${backgroundIconTop}%`,
    "--background-icon-left": `${backgroundIconLeft}%`,
  });

  return (
    <div className={styles.wrapper} style={style}>
      <CardBackgroundIcon className={styles.backgroundIcon} />
      <div className={styles.topCircle}></div>
      <div className={styles.bottomCircle}></div>
      GradientCard
    </div>
  );
}
