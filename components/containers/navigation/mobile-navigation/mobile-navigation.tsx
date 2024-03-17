import { LanguagesContext } from "contexts";
import { useContext, VFC } from "react";
import {
  Container,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { useSelector } from "react-redux";

import languagesSelectors from "store/languages/languages.selectors";
import { LangButtons } from "types/language.types";
import s from "./mobile-navigation.module.css";

export const MobileNavigation: VFC<Props> = ({
  barData,
  active,
  activeFromServer,
  onClickHandler,
  onLanguageHandler,
}) => {
  const languages = useContext(LanguagesContext);
  const language = useSelector(languagesSelectors.language);

  return (
    <Navbar expand={false} className={s.wrapper} variant="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header
            closeButton
            className={s.backGround}
          ></Offcanvas.Header>
          <Offcanvas.Body className={s.backGround}>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {barData.map((btn, i) => (
                <Nav.Link
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
                </Nav.Link>
              ))}
              <Nav.Link>
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
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

type Props = {
  barData: {
    title: string;
    link: string;
    id: number;
  }[];
  active: number | null;
  activeFromServer: number | undefined;
  onClickHandler: (link: string, index: number) => void;
  onLanguageHandler: (lang: LangButtons) => void;
};
