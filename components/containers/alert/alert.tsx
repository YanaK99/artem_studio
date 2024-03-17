import { FC } from "react";
import { useSelector } from "react-redux";

import alertSelectors from "store/alert/alert.selectors";
import s from "./alert.module.css";

export const Alert: FC = ({ children }) => {
  const error = useSelector(alertSelectors.error);
  const success = useSelector(alertSelectors.success);

  return (
    <>
      {error ||
        (success && (
          <div className={error ? s.wrapperError : s.wrapperSuccess}>
            {error ? error : success}
          </div>
        ))}
      {children}
    </>
  );
};
