import type { NextPage } from "next";
import { useContext } from "react";

import { Board } from "components/containers/board";
import { Title } from "components/containers/title";
import s from "styles/about.module.css";
import { NavigationBar } from "components/containers/navigation";
import { urlToIndexConverter } from "utils/urlToIndexConverter";
import { LanguagesContext } from "contexts";
import { initializeFirebase } from "store/firebase";
import { doc, DocumentData, getDoc, getFirestore } from "firebase/firestore";

const About: NextPage<Props> = ({ activeFromServer, aboutData }) => {
  const languages = useContext(LanguagesContext);
  return (
    <Title title="About">
      <NavigationBar activeFromServer={activeFromServer}>
        <Board>
          <div className={s.boardWrapper}>
            <div className={s.textWrapper}>{languages.about.text}</div>
            <div className={s.photoWrapper}>
              <div className={s.imgWraper}>
                <img className={s.image} alt="avatar" src={`${process.env.STORAGE_URL}${aboutData.photo}`} />
              </div>
            </div>
          </div>
        </Board>
      </NavigationBar>
    </Title>
  );
};

export default About;

About.getInitialProps = async ({ pathname }) => {
  const activeFromServer = urlToIndexConverter(pathname);

  const firebaseApp = initializeFirebase();
  const aboutRef = doc(getFirestore(firebaseApp), "about", "about");
  const aboutSnap = await getDoc(aboutRef);

  return {
    activeFromServer: activeFromServer,
    aboutData: aboutSnap.data() ?? { photo: "/" },
  };
};

type Props = {
  activeFromServer: number;
  aboutData: DocumentData;
};
