import { FC } from "react";

import s from './header.module.css';

export const Header: FC = ({ children }) => {
  return <div className={s.header}>{children}</div>;
};
