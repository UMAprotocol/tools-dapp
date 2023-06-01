import Dashboard from "@/icons/box.svg";
import AssertionTool from "@/icons/assertion-tool.svg";
import styles from "./Banner.module.css";

interface Props {
  page: "dashboard" | "assertion-tool";
  title: React.ReactNode;
  subtitle: React.ReactNode;
}
export function Banner({ page, title, subtitle }: Props) {
  const pageToIcon = {
    dashboard: Dashboard,
    "assertion-tool": AssertionTool,
  };
  const Icon = pageToIcon[page];

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        <Icon className={styles.icon} />
        {title}
      </h1>
      <h2 className={styles.subtitle}>{subtitle}</h2>
    </div>
  );
}
