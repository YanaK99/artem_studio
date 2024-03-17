import type { NextPage } from "next";

import { Title } from "components/containers/title";
import { NavigationBar } from "components/containers/navigation";
import { Logo } from "components/common/logo";
import s from "styles/index.module.css";
import { urlToIndexConverter } from "utils/urlToIndexConverter";

const Home: NextPage<Props> = ({ activeFromServer }) => {
  return (
    <Title title="Home">
      <NavigationBar activeFromServer={activeFromServer}>
        <div className={s.logo}>
          <Logo />
        </div>
      </NavigationBar>
    </Title>
  );
};

export default Home;

Home.getInitialProps = async ({ pathname }) => {
  const activeFromServer = urlToIndexConverter(pathname);

  return { activeFromServer: activeFromServer };
};

type Props = {
  activeFromServer: number;
};
