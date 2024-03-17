import { FC } from "react";

import s from "./board.module.css";

export const Board: FC = ({ children }) => {
  return <div className={s.board}>{children}</div>;
};
