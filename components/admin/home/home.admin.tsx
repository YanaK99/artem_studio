import { VFC } from "react";

import s from "./home.module.css";

export const Home: VFC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.text}>WELCOME</div>
    </div>
  );
};
