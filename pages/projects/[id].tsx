import Router, { useRouter } from "next/router";
import { useContext } from "react";

import { NavigationBar } from "components/containers/navigation";
import { Title } from "components/containers/title";
import { LanguagesContext } from "contexts";

import s from "./project.module.css";
import { NextPage } from "next";
import { initializeFirebase } from "store/firebase";
import {
  doc,
  DocumentData,
  getDoc,
  getFirestore,
} from "firebase/firestore";

const Project: NextPage<Props> = ({ images }) => {
  const router = useRouter();
  const languages = useContext(LanguagesContext);

  const onBackHandler = () => {
    Router.push(`/projects`);
  };

  return (
    <Title title="Project">
      <NavigationBar>
        <div className={s.scrollWrapper}>
          <div className={s.back} onClick={onBackHandler}>
            <i
              className="bi bi-caret-left-fill"
              style={{ fontSize: "20px" }}
            ></i>
            <span>{languages.project.back}</span>
          </div>
          <div className={s.scrollWithRadius}>
            <div className={s.scroll}>
              {images.map((item: string, i: number) => (
                <img
                  className={s.image}
                  alt="projectImage"
                  src={`${process.env.STORAGE_URL}${item}`}
                  key={i}
                />
              ))}
            </div>
          </div>
        </div>
      </NavigationBar>
    </Title>
  );
};

Project.getInitialProps = async ({ query }) => {
  const firebaseApp = initializeFirebase();
  const projectRef = doc(getFirestore(firebaseApp), "projects", `${query.id}`);
  const projectSnap = await getDoc(projectRef);

  return {
    images: projectSnap.data()?.photos ?? [],
  };
};

type Props = {
  images: DocumentData;
};

export default Project;
