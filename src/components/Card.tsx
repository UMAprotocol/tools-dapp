import type { FC, ReactNode, SVGProps } from "react";
import Link from "next/link";
import Arrow from "@/icons/arrow.svg";

type Props = {
  title: ReactNode;
  children: ReactNode;
  href: string;
  icon: FC<SVGProps<HTMLOrSVGElement>>;
};
export function Card({ title, children, href, icon: Icon }: Props) {
  return (
    <div>
      <div>
        <Icon />
        <h2>{title}</h2>
        <Link href={href} aria-label="go to tool page">
          <Arrow />
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
