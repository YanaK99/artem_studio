import { useContext, VFC } from "react";

import { LanguagesContext } from "contexts";
import s from "./logo.module.css";

export const Logo: VFC = () => {
  const languages = useContext(LanguagesContext);
  return <div className={s.text}>{languages.title}</div>;
};
