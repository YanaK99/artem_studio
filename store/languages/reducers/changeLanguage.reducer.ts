import { PayloadAction } from "@reduxjs/toolkit";
import { LangButtons } from "types/language.types";

import { LanguageState } from "..";

export const changeLanguageReducer = {
  changeLanguageRequested(
    state: LanguageState,
    action: PayloadAction<LangButtons>
  ) {
    state.language = action.payload;
  },
};
