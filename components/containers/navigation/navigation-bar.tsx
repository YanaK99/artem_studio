import Router from "next/router";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { navigationActions } from "store/navigation/actions";
import { languagesActions } from "store/languages/actions";
import navigationSelectors from "store/navigation/navigation.selectors";
import languagesSelectors from "store/languages/languages.selectors";
import { LangButtons } from "types/language.types";
import { LanguagesContext } from "contexts";
import s from "./navigation.module.css";
import { buttonsData } from "./utils/buttons-data";
import { MobileNavigation } from "./mobile-navigation";

export const NavigationBar = ({
  children,
  activeFromServer,
}: React.PropsWithChildren<Props>) => {
  const languages = useContext(LanguagesContext);
  const dispatch = useDispatch();

  const active = useSelector(navigationSelectors.active);
  const language = useSelector(languagesSelectors.language);
  const barData = buttonsData(
    languages.navbar.home,
    languages.navbar.about,
    languages.navbar.projects,
    languages.navbar.price,
    languages.navbar.contacts
  );

  const onClickHandler = (link: string, index: number) => {
    Router.push(link);
    dispatch(navigationActions.changeActiveRequested(index));
  };

  const onLanguageHandler = (lang: LangButtons) => {
    dispatch(languagesActions.changeLanguageRequested(lang));
  };

  return (
    <>
      <div className={s.wrapper}>
        {barData.map((btn, i) => (
          <div
            className={
              activeFromServer
                ? activeFromServer === btn.id
                  ? s.active
                  : s.nonActive
                : active === btn.id
                ? s.active
                : s.nonActive
            }
            key={i}
            onClick={() => onClickHandler(btn.link, i)}
          >
            {btn.title}
          </div>
        ))}
        <div className={s.langs}>
          <span
            onClick={() => onLanguageHandler("EN")}
            className={language === "EN" ? s.active : s.nonActive}
          >
            {languages.languages.en}
          </span>
          <span className={s.nonActive}> / </span>
          <span
            onClick={() => onLanguageHandler("RU")}
            className={language === "RU" ? s.active : s.nonActive}
          >
            {languages.languages.ru}
          </span>
        </div>
      </div>
      <MobileNavigation
        barData={barData}
        onClickHandler={onClickHandler}
        activeFromServer={activeFromServer}
        active={active}
        onLanguageHandler={onLanguageHandler}
      />
      {children}
    </>
  );
};

type Props = {
  activeFromServer?: number;
};
