import Arrow from "@/icons/arrow.svg";
import Link from "next/link";
import type { FC, ReactNode, SVGProps } from "react";
import styles from "./Card.module.css";

type Props = {
  title: ReactNode;
  whatItDoes: string[];
  href: string;
  icon: FC<SVGProps<HTMLOrSVGElement>>;
};
export function Card({ title, whatItDoes, href, icon: Icon }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.titleText}>
          <Icon />
          {title}
        </h2>
        <Link href={href} aria-label="go to tool page">
          <Arrow />
        </Link>
      </div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.subtitle}>What does it do?</h3>
        <ul className={styles.whatItDoesList}>
          {whatItDoes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
