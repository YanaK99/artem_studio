import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import type { NextPage } from "next";
import { v4 as uuidv4 } from "uuid";

import s from "styles/admin.module.css";
import { alertActions } from "store/alert/actions";
import { Title } from "components/containers/title";
import { Auth } from "components/auth/auth";
import { NavBarC } from "components/admin/navbar";
import { Home } from "components/admin/home";
import { useInitializeFirebase } from "hooks/useInitializeFirabase";
import loadingIcon from "../public/loading.gif";
import Image from "next/image";
import { AdminPages } from "types/admin.types";
import { About } from "components/admin/about";
import { Project } from "components/admin/project";
import { Price } from "components/admin/price";
import { ModalFC } from "components/common/modal";
import { ModalInner } from "components/admin/project/modal-inner/modal-inner.";
import { doc, setDoc } from "firebase/firestore";
import { firebase } from "store/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { dispatchWithTimer } from "../utils/dispatchWithTimer";

const Admin: NextPage = () => {
  const [isAppInitialized, setIsAppInitialized] = useState(false);
  const [page, setPage] = useState<AdminPages | string>(AdminPages.HOME);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [photos, setPhotos] = useState<FileList | undefined>(undefined);

  const dispatch= useDispatch();

  const isUserLogged = useInitializeFirebase(
    isAppInitialized,
    setIsAppInitialized
  );

  const switchHomePageWithReload = () => {
    setLoading(true);
    setPage(AdminPages.HOME);
    setLoading(false);
  };

  const Page = useCallback(
    (page: AdminPages | string) => {
      switch (page) {
        case AdminPages.HOME:
          return <Home />;
        case AdminPages.ABOUT:
          return <About />;
        case AdminPages.PRICE:
          return <Price />;
        default:
          return (
            <Project
              projectName={page as string}
              switchHomePage={switchHomePageWithReload}
            />
          );
      }
    },
    [page]
  );

  const onHideAddModal = () => {
    setAddModal(false);
    setPhotos(undefined);
    setName("");
  };

  const saveProject = async () => {
    if (name && photos) {
      try {
        setLoading(true);
        const projectRef = doc(firebase.firestore!, "projects", name);
        let photosURLs: string[] = [];

        for (let i = 0; i < photos.length; i++) {
          const photoURL = `projects/${name}/${name}${uuidv4()}.jpg`;
          const imageStorageRef = ref(firebase.storage!, photoURL);
          photosURLs.push(photoURL);
          await uploadBytes(imageStorageRef, photos[i]);
        }

        await setDoc(projectRef, {
          name,
          photos: photosURLs,
        });
        setLoading(false);
        dispatchWithTimer(
          () => dispatch(alertActions.setSuccessRequested("Project was added!")),
          () => dispatch(alertActions.setSuccessRequested(""))
        );
      } catch {
        setLoading(false);
        dispatchWithTimer(
          () => dispatch(alertActions.setErrorRequested("Project wasn't added!")),
          () => dispatch(alertActions.setErrorRequested(""))
        );
      }
    }
    onHideAddModal();
  };

  const onAgreeAddModal = () => {
    saveProject();
  };
  const onDeclineAddModal = () => {
    onHideAddModal();
  };

  if (!isAppInitialized || loading) {
    return (
      <div className={s.loading}>
        <Image width={100} height={100} src={loadingIcon} alt="loading" />
      </div>
    );
  }

  return (
    <>
      <Title title="Admin">
        {!isUserLogged ? (
          <Auth />
        ) : (
          <div className={s.wrapper}>
            <NavBarC setPage={setPage} openAddModal={() => setAddModal(true)} />
            {Page(page)}
          </div>
        )}
      </Title>
      {addModal && (
        <ModalFC
          onHide={onHideAddModal}
          show={addModal}
          title="Add project"
          onAgree={onAgreeAddModal}
          onDecline={onDeclineAddModal}
        >
          <ModalInner
            name={name}
            onChange={setName}
            setPhotos={setPhotos}
            photos={photos}
            type="create"
          />
        </ModalFC>
      )}
    </>
  );
};

export default Admin;
