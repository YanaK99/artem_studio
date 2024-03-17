import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState, VFC } from "react";
import { v4 as uuidv4 } from "uuid";

import { alertActions } from "store/alert/actions";
import loadingIcon from "../../../public/loading.gif";
import { firebase } from "store/firebase";
import s from "./project.module.css";
import { Button } from "react-bootstrap";
import { deleteObject, ref, uploadBytes } from "firebase/storage";
import { ModalFC } from "components/common/modal";
import { ModalInner } from "./modal-inner/modal-inner.";
import { dispatchWithTimer } from "../../../utils/dispatchWithTimer";
import { useDispatch } from "react-redux";

export const Project: VFC<Props> = ({ projectName, switchHomePage }) => {
  const [loading, setLoading] = useState(true);
  const [fetchedPhotos, setFetchedPhotos] = useState<string[]>([]);

  const [photoToDelete, setPhotoToDelete] = useState("");
  const [photosToAdd, setPhotosToAdd] = useState<FileList | undefined>(
    undefined
  );

  const dispatch = useDispatch();

  const [deleteOneModal, setDeleteOneModal] = useState(false);
  const [deleteProjectModal, setDeleteProjectModal] = useState(false);
  const [addPhotoModal, setAddPhotoModal] = useState(false);

  const projectRef = doc(firebase.firestore!, "projects", projectName);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const projectSnap = await getDoc(projectRef);
        setFetchedPhotos(projectSnap.data()?.photos ?? []);

        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchAbout();
  }, [projectName]);

  const onDeleteOneFromDB = async (photo: string) => {
    try {
      setLoading(true);
      await deleteObject(ref(firebase.storage!, photo));
      const updatedPhotos = fetchedPhotos.filter((item) => item !== photo);
      await updateDoc(projectRef, {
        photos: updatedPhotos,
      });
      setFetchedPhotos(updatedPhotos);
      setLoading(false);
      dispatchWithTimer(
        () => dispatch(alertActions.setSuccessRequested("Photo was deleted!")),
        () => dispatch(alertActions.setSuccessRequested(""))
      );
    } catch {
      setLoading(false);
      dispatchWithTimer(
        () => dispatch(alertActions.setErrorRequested("Photo wasn't deleted!")),
        () => dispatch(alertActions.setErrorRequested(""))
      );
    }
  };

  const onAgreeDeleteOne = (photo: string) => {
    onDeleteOneFromDB(photo);
    onHide();
  };

  const onDeleteProjectFromDB = async () => {
    try {
      setLoading(true);
      for (let i = 0; i < fetchedPhotos.length; i++) {
        await deleteObject(ref(firebase.storage!, fetchedPhotos[i]));
      }
      await deleteDoc(projectRef);
      setLoading(false);
      switchHomePage();
      dispatchWithTimer(
        () =>
          dispatch(alertActions.setSuccessRequested("Project was deleted!")),
        () => dispatch(alertActions.setSuccessRequested(""))
      );
    } catch {
      setLoading(false);
      dispatchWithTimer(
        () =>
          dispatch(alertActions.setErrorRequested("Project wasn't deleted!")),
        () => dispatch(alertActions.setErrorRequested(""))
      );
    }
  };

  const onAgreeDeleteProject = () => {
    onDeleteProjectFromDB();
    onHide();
  };

  const onAddPhotos = async () => {
    if (photosToAdd) {
      try {
        setLoading(true);
        let photosURLs: string[] = [];

        for (let i = 0; i < photosToAdd.length; i++) {
          const photoURL = `projects/${projectName}/${projectName}${uuidv4()}.jpg`;
          const imageStorageRef = ref(firebase.storage!, photoURL);
          photosURLs.push(photoURL);
          await uploadBytes(imageStorageRef, photosToAdd[i]);
        }

        const updatedPhotos = [...fetchedPhotos, ...photosURLs];
        await updateDoc(projectRef, {
          photos: updatedPhotos,
        });
        setFetchedPhotos(updatedPhotos);
        setLoading(false);
        dispatchWithTimer(
          () =>
            dispatch(alertActions.setSuccessRequested("Photos were added!")),
          () => dispatch(alertActions.setSuccessRequested(""))
        );
      } catch {
        setLoading(false);
        dispatchWithTimer(
          () =>
            dispatch(alertActions.setErrorRequested("Photos weren't added!")),
          () => dispatch(alertActions.setErrorRequested(""))
        );
      }
    }
  };

  const onAgreeAddPhotos = () => {
    onAddPhotos();
    onHide();
  };

  const onHide = () => {
    deleteOneModal && setDeleteOneModal(false);
    deleteProjectModal && setDeleteProjectModal(false);
    addPhotoModal && setAddPhotoModal(false);
    photoToDelete && setPhotoToDelete("");
    photosToAdd && setPhotosToAdd(undefined);
  };

  const onDecline = () => {
    onHide();
  };

  if (loading) {
    return (
      <div className={s.wrapperLoading}>
        <Image width={100} height={100} src={loadingIcon} alt="loading" />
      </div>
    );
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.text}>
          <div className={s.textProjectName}>Project: {projectName}</div>
          <Button
            variant="outline-danger"
            onClick={() => setDeleteProjectModal(true)}
          >
            Delete Project
          </Button>
          <Button variant="primary" onClick={() => setAddPhotoModal(true)}>
            Add Photos
          </Button>
        </div>
        <div className={s.images}>
          {fetchedPhotos.map((item, i) => (
            <div className={s.image} key={i}>
              <img
                alt="image"
                src={`${process.env.STORAGE_URL}${item}`}
                className={s.projectImg}
              />
              <img
                alt="delete"
                src="/delete.png"
                className={s.delete}
                onClick={() => {
                  setPhotoToDelete(item);
                  setDeleteOneModal(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {deleteOneModal && (
        <ModalFC
          onHide={onHide}
          show={deleteOneModal}
          title="Do you really want delete photo?"
          onAgree={() => onAgreeDeleteOne(photoToDelete)}
          onDecline={onDecline}
        />
      )}
      {deleteProjectModal && (
        <ModalFC
          onHide={onHide}
          show={deleteProjectModal}
          title="Do you really want delete project?"
          onAgree={onAgreeDeleteProject}
          onDecline={onDecline}
        />
      )}
      {addPhotoModal && (
        <ModalFC
          onHide={onHide}
          show={addPhotoModal}
          title="Add photos"
          onAgree={onAgreeAddPhotos}
          onDecline={onDecline}
        >
          <ModalInner
            setPhotos={setPhotosToAdd}
            photos={photosToAdd}
            type="add"
          />
        </ModalFC>
      )}
    </>
  );
};

type Props = {
  projectName: string;
  switchHomePage: () => void;
};
