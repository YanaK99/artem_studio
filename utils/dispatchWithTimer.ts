import { Dispatch } from "react";

export const dispatchWithTimer = (
  dispatchOn: () => void,
  dispatchOff: () => void
) => {
  dispatchOn();
  setTimeout(() => {
    dispatchOff();
  }, 2000);
};
