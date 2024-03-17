import { FC, useEffect, useState } from "react";
import Image from "next/image";
import CarouselBT from "react-bootstrap/Carousel";
import Router from "next/router";

import s from "./carousel.module.css";
import { initializeFirebase } from "store/firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export const Carousel: FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<
    Array<{
      image: string;
      name: string;
    }>
  >([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const firebaseApp = initializeFirebase();

        const imagesSnapshot = await getDocs(
          collection(getFirestore(firebaseApp), "projects")
        );
        imagesSnapshot.forEach((doc) => {
          const data = doc.data();
          setImages((images) => [
            ...images,
            { image: data.photos[0], name: data.name },
          ]);
        });
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className={s.wrapperLoading}>
        <Image width={100} height={100} src="/loading.gif" alt="loading" />
      </div>
    );
  }

  return (
    <>
      <CarouselBT
        interval={10000}
        controls={false}
        indicators={false}
        pause={false}
        className={s.wrapper}
      >
        {images!.map((slide, i) => (
          <CarouselBT.Item className={s.imageWrapper} key={i}>
            <img
              src={`${process.env.STORAGE_URL}${slide.image}`}
              alt="Slide"
              className={s.image}
            />
            <div
              className={s.nameWrapper}
              onClick={() => Router.push(`projects/${slide.name}`)}
            >
              {slide.name}
            </div>
            <div className={s.shadow}></div>
          </CarouselBT.Item>
        ))}
      </CarouselBT>
      {children}
    </>
  );
};
