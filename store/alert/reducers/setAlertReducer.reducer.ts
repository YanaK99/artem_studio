import { PayloadAction } from "@reduxjs/toolkit";

import { AlertState } from "..";

export const setAlertReducer = {
  setErrorRequested(state: AlertState, action: PayloadAction<string>) {
    state.error = action.payload;
  },
  setSuccessRequested(state: AlertState, action: PayloadAction<string>) {
    state.success = action.payload;
  },
};
