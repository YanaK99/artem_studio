import React, { VFC } from "react";
import Router from "next/router";
import { navigationActions } from "store/navigation/actions";

import s from "./card.module.css";
import { useDispatch } from "react-redux";

export const Card: VFC<Props> = ({ data, link }) => {
  const dispatch = useDispatch();

  const onCLickHandler = () => {
    Router.push(`${link}/${data.name}`);
    dispatch(navigationActions.changeActiveRequested(null));
  };

  return (
    <div className={s.imageWrapper} onClick={onCLickHandler}>
      <img
        alt="project"
        src={`${process.env.STORAGE_URL}${data.image}`}
        className={s.project}
      />
      <div className={s.name}>{data.name}</div>
      <div className={s.shadow}></div>
    </div>
  );
};

type Props = {
  data: {
    name: number;
    image: string;
  };
  link: string;
};
