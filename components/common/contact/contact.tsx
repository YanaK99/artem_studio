import { VFC } from "react";

import s from "./contact.module.css";

export const Contact: VFC<Props> = ({ title, link, size = "big" }) => {
  return (
    <a
      href={
        title === "email"
          ? `mailto:${link}`
          : title === "phone"
          ? `tel:${link}`
          : link
      }
      target="_blank"
      rel="noreferrer"
    >
      <div className={size === "big" ? s.netBig : s.netSmall}>
        <img alt={title} src={`/${title}.png`} />
      </div>
    </a>
  );
};

type Props = {
  title: string;
  link: string;
  size?: "small" | "big";
};
