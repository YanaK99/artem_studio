import Image from "next/image";
import { useEffect, useState, VFC } from "react";
import { Button } from "react-bootstrap";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firebase } from "store/firebase";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";

import { alertActions } from "store/alert/actions";
import { dispatchWithTimer } from "../../../utils/dispatchWithTimer";
import s from "./about.module.css";
import loadingIcon from "../../../public/loading.gif";
import { ModalFC } from "components/common/modal";
import { ModalInner } from "./modal-inner";

export const About: VFC = () => {
  const PHOTO_URI = `about/${uuidv4()}.jpg`;

  const dispatch = useDispatch();

  const [photo, setPhoto] = useState("/");
  const [modalPhoto, setModalPhoto] = useState<File | null>(null);
  const [photoModal, setPhotoModal] = useState(false);

  const [loading, setLoading] = useState(true);

  const aboutRef = doc(firebase.firestore!, "about", "about");
  const imageStorageRef = ref(firebase.storage!, PHOTO_URI);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const aboutSnap = await getDoc(aboutRef);
        setPhoto(aboutSnap.data()?.photo ?? "");

        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const onHide = () => {
    setPhotoModal(false);
  };

  const savePhoto = async () => {
    try {
      setLoading(true);
      if (photo) {
        await deleteObject(ref(firebase.storage!, photo));
      }
      await uploadBytes(imageStorageRef, modalPhoto!);
      await updateDoc(aboutRef, {
        photo: PHOTO_URI,
      });
      setPhoto(PHOTO_URI);
      setLoading(false);
      dispatchWithTimer(
        () => dispatch(alertActions.setSuccessRequested("Photo was changed!")),
        () => dispatch(alertActions.setSuccessRequested(""))
      );
    } catch (e) {
      setLoading(false);
      dispatchWithTimer(
        () =>
          dispatch(
            alertActions.setErrorRequested("Error: Photo wasn't changed!")
          ),
        () => dispatch(alertActions.setErrorRequested(""))
      );
    }
  };

  const onAgree = () => {
    savePhoto();
    setPhotoModal(false);
  };

  const onDecline = () => {
    onHide();
  };

  if (loading) {
    return (
      <div className={s.wrapper}>
        <Image width={100} height={100} src={loadingIcon} alt="loading" />
      </div>
    );
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.info}>
          <div className={s.infoBlock}>
            <div className={s.infoBlockMain}>
              {photo ? (
                <Image
                  width={330}
                  height={400}
                  src={`${process.env.STORAGE_URL}${photo}`}
                  alt="avatar"
                />
              ) : (
                <div className={s.noData}>
                  You can add photo with button below
                </div>
              )}
            </div>
            <div className={s.infoBlockBtn}>
              <Button
                variant="outline-danger"
                onClick={() => setPhotoModal(true)}
              >
                Change Photo
              </Button>
            </div>
          </div>
        </div>
      </div>
      {photoModal && (
        <ModalFC
          onHide={onHide}
          show={photoModal}
          title="Change photo"
          onAgree={onAgree}
          onDecline={onDecline}
        >
          <ModalInner photo={photo} setPhoto={setModalPhoto} />
        </ModalFC>
      )}
    </>
  );
};
