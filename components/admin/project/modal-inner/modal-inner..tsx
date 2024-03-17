import React, { ChangeEvent, useState, VFC } from "react";
import { Form } from "react-bootstrap";

import s from "./modal-inner.module.css";

export const ModalInner: VFC<Props> = ({
  name,
  photos,
  type,
  onChange,
  setPhotos,
}) => {
  const [preload, setPreload] = useState<Array<string | ArrayBuffer>>([]);

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.currentTarget?.files && event?.currentTarget?.files.length > 0) {
      if (photos) {
        // @ts-ignore
        setPhotos([...photos, ...event?.currentTarget?.files]);
      } else {
        setPhotos(event?.currentTarget?.files);
      }

      for (let i = 0; i < event?.currentTarget?.files.length; i++) {
        var oFReader = new FileReader();
        oFReader.readAsDataURL(event?.currentTarget?.files[i]);
        oFReader.onload = function (oFREvent) {
          setPreload((preload) => [...preload, oFREvent?.target?.result!]);
        };
      }
    }
  };

  const deleteOneImg = (index: number) => {
    const newPreload = [...preload];
    newPreload.splice(index, 1);
    setPreload(newPreload);

    if (photos) {
      const newFiles = [...photos];
      newFiles.splice(index, 1);
      // @ts-ignore
      setPhotos(newFiles);
    }
  };

  return (
    <div className={s.body}>
      {type === "create" && (
        <Form.Control
          placeholder="Enter name..."
          value={name ?? ""}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={s.input}
        />
      )}
      <div className={s.images}>
        {preload.length > 0 &&
          preload.map((item, i) => (
            <div className={s.image} key={i}>
              <img alt="image" src={item as string} className={s.projectImg} />
              <img
                alt="delete"
                src="/delete.png"
                className={s.delete}
                onClick={() => deleteOneImg(i)}
              />
            </div>
          ))}
        <div className={s.imageAdd}>
          <img alt="add" src="/add.png" />
          <input
            type={"file"}
            onChange={handlePhoto}
            name="img"
            id="img"
            multiple
          />
          <label htmlFor="img" className={s.imgLabel}></label>
        </div>
      </div>
    </div>
  );
};

type Props = {
  name?: string;
  photos: FileList | undefined;
  type: "create" | "add";
  onChange?: (arg: string) => void;
  setPhotos: (arg: FileList | undefined) => void;
};
