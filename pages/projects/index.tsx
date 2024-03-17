import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { initializeFirebase } from "store/firebase";
import { Carousel } from "react-bootstrap";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import { NavigationBar } from "components/containers/navigation";
import { urlToIndexConverter } from "utils/urlToIndexConverter";
import { Title } from "components/containers/title";
import s from "styles/projects.module.css";
import { fromArrayToNestedArrays } from "utils/fromArrayToNestedArrays";
import { Card } from "components/card";

const Projects: NextPage<Props> = ({ activeFromServer, images }) => {
  const router = useRouter();

  const { innerWidth: width } = window && window;

  const [projectsPerSlide, setProjectsPerSlide] = useState(
    width > 993 ? 6 : width > 576 ? 4 : 2
  );

  const [index, setIndex] = useState(0);

  const dividedPerSlideDataArray = fromArrayToNestedArrays(
    images as Array<{
      image: string;
      name: string;
    }>,
    projectsPerSlide
  );

  const handleSelect = (selectedIndex: number, e: unknown) => {
    setIndex(selectedIndex);
  };

  const onPrevSlideHandler = () => {
    if (index === 0) {
      setIndex(dividedPerSlideDataArray.length - 1);
    } else {
      setIndex((index) => index - 1);
    }
  };

  const onNextSlideHandler = () => {
    if (index === dividedPerSlideDataArray.length - 1) {
      setIndex(0);
    } else {
      setIndex((index) => index + 1);
    }
  };

  return (
    <Title title="Projects">
      <NavigationBar activeFromServer={activeFromServer}>
        <div className={s.background}>
          <Carousel
            activeIndex={index}
            className={s.wrapper}
            interval={null}
            controls={false}
            onSelect={handleSelect}
          >
            {dividedPerSlideDataArray.map((projectsArray, i) => (
              <Carousel.Item key={i}>
                <div className={s.slide}>
                  {projectsArray.map((project, j) => (
                    <Card key={i + j} data={project} link={router.pathname} />
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <div className={s.prevButton} onClick={onPrevSlideHandler}>
            <img alt="prevArrow" src="/prev.png" />
          </div>
          <div className={s.nextButton} onClick={onNextSlideHandler}>
            <img alt="nextArrow" src="/next.png" />
          </div>
        </div>
      </NavigationBar>
    </Title>
  );
};

export default Projects;

Projects.getInitialProps = async ({ pathname }) => {
  const activeFromServer = urlToIndexConverter(pathname);

  const firebaseApp = initializeFirebase();
  const imagesSnapshot = await getDocs(
    collection(getFirestore(firebaseApp), "projects")
  );
  const images: DocumentData = [];
  imagesSnapshot.forEach((doc) => {
    const data = doc.data();
    images.push({ image: data.photos[0], name: data.name });
  });

  return { activeFromServer: activeFromServer, images };
};

type Props = {
  activeFromServer: number;
  images: DocumentData;
};
