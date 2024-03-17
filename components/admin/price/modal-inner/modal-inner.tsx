import { useState, VFC } from "react";
import { Form } from "react-bootstrap";

import s from "./modal-inner.module.css";

export const ModalInner: VFC<Props> = ({ price, onChange }) => {
  return (
    <div className={s.body}>
      <Form.Control
        type="number"
        placeholder="enter price"
        value={price}
        onChange={(e) =>
          onChange(e.target.value.length > 0 ? +e.target.value : e.target.value)
        }
        className={s.input}
      />
    </div>
  );
};

type Props = {
  price: number | string;
  onChange: (arg: number | string) => void;
};
