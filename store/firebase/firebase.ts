import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

export const firebase: FirebaseType = {
  firestore: null,
  storage: null,
};

let firebaseAppInited: FirebaseApp;

export const initializeFirebase = () => {
  if (!firebaseAppInited) {
    const firebaseApp = initializeApp(
      process.env.FIRESTROE_CONF as FirebaseOptions
    );

    const firestore = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
    firebase.firestore = firestore;
    firebase.storage = storage;
    firebaseAppInited = firebaseApp;
    return firebaseApp;
  }
  return firebaseAppInited;
};

type FirebaseType = {
  firestore: Firestore | null;
  storage: FirebaseStorage | null;
};
