import Image from "next/image";
import { ChangeEvent, useState, VFC } from "react";
import { Button, Form } from "react-bootstrap";

import s from "./modal-inner.module.css";

export const ModalInner: VFC<Props> = ({ photo, setPhoto }) => {
  const [preload, setPreload] = useState<string | ArrayBuffer | null>(null);
  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.currentTarget?.files && event?.currentTarget?.files.length > 0) {
      setPhoto(event?.currentTarget?.files[0]);

      var oFReader = new FileReader();
      oFReader.readAsDataURL(event?.currentTarget?.files[0]);
      oFReader.onload = function (oFREvent) {
        setPreload(oFREvent?.target?.result!);
      };
    }
  };

  return (
    <div className={s.body}>
      {preload ? (
        <Image width={250} height={300} src={preload as string} alt="avatar" />
      ) : (
        <Image width={250} height={300} src={`${process.env.STORAGE_URL}${photo}`} alt="avatar" />
      )}
      <div className={s.imgHeader}>
        <input type={"file"} onChange={handlePhoto} name="img" id="img" />
        <label htmlFor="img" className={s.imgLabel}></label>
        <Button variant="outline-dark">Change photo</Button>
      </div>
    </div>
  );
};

type Props = {
  photo: string;
  setPhoto: (arg: File) => void;
};
