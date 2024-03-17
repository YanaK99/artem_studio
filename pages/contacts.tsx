import type { NextPage } from "next";

import { Board } from "components/containers/board";
import { NavigationBar } from "components/containers/navigation";
import { Title } from "components/containers/title";
import { urlToIndexConverter } from "utils/urlToIndexConverter";
import s from "styles/contacts.module.css";
import { Contact } from "components/common/contact";

const Contacts: NextPage<Props> = ({ activeFromServer }) => {
  return (
    <Title title="Contacts">
      <NavigationBar activeFromServer={activeFromServer}>
        <Board>
          <div className={s.wrapper}>
            <div className={s.nets}>
              <div className={s.netsConstact}>
                <Contact
                  title="whatsapp"
                  link="https://wa.me/14125790818"
                  size="small"
                />
                <span>+14125790818</span>
              </div>
              <div className={s.netsConstact}>
                <Contact
                  title="telegram"
                  link="https://t.me/Artem_Pecheniuk"
                  size="small"
                />
                <span>@Artem_Pecheniuk</span>
              </div>
              <div className={s.netsConstact}>
                <Contact
                  title="instagram"
                  link="https://www.instagram.com/artem_pecheniuk_studio"
                  size="small"
                />
                <span>@artem_pecheniuk_studio</span>
              </div>
              <div className={s.netsConstact}>
                <Contact
                  title="email"
                  link="artem.pecheniuk.studio@gmail.com"
                  size="small"
                />{" "}
                <span>artem.pecheniuk.studio@gmail.com</span>
              </div>
              <div className={s.netsConstact}>
                <Contact title="phone" link="+14125790818" size="small" />{" "}
                <span>+14125790818</span>
              </div>
            </div>
          </div>
        </Board>
      </NavigationBar>
    </Title>
  );
};

export default Contacts;

Contacts.getInitialProps = async ({ pathname }) => {
  const activeFromServer = urlToIndexConverter(pathname);

  return { activeFromServer: activeFromServer };
};

type Props = {
  activeFromServer: number;
};
