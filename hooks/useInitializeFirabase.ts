import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

import { initializeFirebase } from 'store/firebase';

export const useInitializeFirebase = (
  isAppInitialized: boolean,
  setIsAppInitialized: (arg: boolean) => void,
) => {
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    const firebaseApp = initializeFirebase();
    const auth = getAuth(firebaseApp);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserLogged(true);
        !isAppInitialized && setIsAppInitialized(true);
      } else {
        setIsUserLogged(false);
        !isAppInitialized && setIsAppInitialized(true);
      }
    });
  }, [isAppInitialized, setIsAppInitialized]);

  return isUserLogged;
};
