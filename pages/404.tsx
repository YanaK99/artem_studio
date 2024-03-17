import { NextPage } from "next";
import { useContext } from "react";

import { LanguagesContext } from "contexts";
import { NavigationBar } from "components/containers/navigation";
import { Title } from "components/containers/title";
import s from "../styles/404.module.css";

const Page404: NextPage = () => {
  const languages = useContext(LanguagesContext);
  return (
    <Title title="About">
      <NavigationBar>
        <div className={s.errorMsg}>{languages.error.notFound}</div>
      </NavigationBar>
    </Title>
  );
};

export default Page404;
