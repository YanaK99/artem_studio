import { PayloadAction } from "@reduxjs/toolkit";

import { NavigationState } from "..";

export const changeActiveReducer = {
  changeActiveRequested(
    state: NavigationState,
    action: PayloadAction<number | null>
  ) {
    state.active = action.payload;
  },
};
