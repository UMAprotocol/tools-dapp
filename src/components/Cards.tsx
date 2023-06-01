import AssertionTool from "@/icons/assertion-tool.svg";
import { Card } from "./Card";
import styles from "./Cards.module.css";

const cards = [
  {
    title: "Assertion Tool",
    whatItDoes: [
      "Create assertions",
      "Preview what your assertions will look like",
      "See the minimum bond for a given currency",
    ],
    href: "/assertion-tool",
    icon: AssertionTool,
  },
];

export function Cards() {
  return (
    <div className={styles.cards}>
      {cards.map((card) => (
        <Card key={card.title} {...card} />
      ))}
    </div>
  );
}
