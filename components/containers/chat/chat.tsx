import { VFC } from "react";

import { Contact } from "components/common/contact";
import s from "./chat.module.css";

export const Chat: VFC = () => {
  return (
    <div className={s.chatWrapper}>
      <div className={s.netsWrapper}>
        <Contact
          title="whatsapp"
          link="https://wa.me/14125790818"
          size="big"
        />
        <Contact
          title="telegram"
          link="https://t.me/Artem_Pecheniuk"
          size="big"
        />
        <Contact
          title="instagram"
          link="https://www.instagram.com/artem_pecheniuk_studio"
          size="big"
        />
        <Contact title="email" link="mailto:artem.pecheniuk.studio@gmail.com" size="big" />
        <Contact title="phone" link="+14125790818" size="big" />
        <Contact title="youtube" link="https://www.youtube.com" size="big" />
      </div>
      <div className={s.heartsWrapper}>
        <img alt="chat" src="/hearts.png" className={s.img} />
      </div>
    </div>
  );
};
