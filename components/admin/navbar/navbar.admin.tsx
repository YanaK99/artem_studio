import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, VFC } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { firebase } from "store/firebase";
import { AdminPages } from "types/admin.types";

import loadingIcon from "../../../public/loading.gif";
import s from "./navbar.admin.module.css";

export const NavBarC: VFC<Props> = ({ setPage, openAddModal }) => {
  const [active, setActive] = useState(0);
  const [projectNames, setProjectNames] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectsNames = async () => {
      try {
        setLoading(true);
        const namesSnapshot = await getDocs(
          collection(firebase.firestore!, "projects")
        );
        namesSnapshot.forEach((doc) => {
          setProjectNames((projectNames) => [...projectNames, doc.data().name]);
        });
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };
    fetchProjectsNames();
  }, []);

  const logOutHandler = () => {
    const auth = getAuth();
    signOut(auth);
  };

  const onButtonHandler = (id: number, pageName: string) => {
    setActive(id);
    setPage(pageName);
  };

  return (
    <div className={s.navbarBtns}>
      <div
        className={active === 0 ? s.active : s.nonActive}
        onClick={() => onButtonHandler(0, AdminPages.HOME)}
      >
        Home
      </div>
      <div
        className={active === 1 ? s.active : s.nonActive}
        onClick={() => onButtonHandler(1, AdminPages.ABOUT)}
      >
        About
      </div>
      <div
        className={active === 2 ? s.active : s.nonActive}
        onClick={() => onButtonHandler(2, AdminPages.PRICE)}
      >
        Price
      </div>
      <DropdownButton
        key="dark"
        id="dropdown-variants-dark"
        variant="dark"
        title="Projects"
        menuVariant="dark"
        className={s.dropBtn}
      >
        {loading ? (
          <div className={s.loadingWrapper}>
            <img src="/loading.gif" alt="loading" className={s.loading} />
          </div>
        ) : (
          <>
            {projectNames.map((item, i) => (
              <Dropdown.Item
                eventKey="1"
                className={s.dropBtn}
                onClick={() => onButtonHandler(3, item)}
                key={i}
              >
                {item}
              </Dropdown.Item>
            ))}
          </>
        )}
        <Dropdown.Item
          eventKey="1"
          className={s.dropBtn}
          onClick={openAddModal}
        >
          + Add Project
        </Dropdown.Item>
      </DropdownButton>
      <div onClick={logOutHandler} className={s.nonActive}>
        Log Out
      </div>
    </div>
  );
};

type Props = {
  setPage: (arg: AdminPages | string) => void;
  openAddModal: () => void;
};
