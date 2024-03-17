import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signInWithEmailAndPass = (
  email: string,
  password: string,
  setIsAuthenticating: (arg: boolean) => void
) => {
  setIsAuthenticating(true);

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setIsAuthenticating(false);
    })
    .catch(() => {
      setIsAuthenticating(false);
    });
};
