import Image from "next/image";
import { useState, VFC } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { signInWithEmailAndPass } from "utils/signInWithEmailAndPass";

import s from "./auth.module.css";
import loading from "../../public/loading.gif";

export const Auth: VFC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const onSubmitHandler = () => {
    if (login && password) {
      signInWithEmailAndPass(login, password, setIsAuthenticating);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FloatingLabel>
      </div>
      <Button
        variant="outline-secondary"
        className={s.button}
        disabled={isAuthenticating}
        onClick={onSubmitHandler}
      >
        {isAuthenticating ? (
          <Image width={30} height={30} src={loading} alt="loading" />
        ) : (
          "Login"
        )}
      </Button>
    </div>
  );
};
