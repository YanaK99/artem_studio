import { createSlice } from "@reduxjs/toolkit";
import { LangButtons } from "types/language.types";

import { changeLanguageReducer } from "./reducers";

export type LanguageState = {
  language: LangButtons;
};

const initialState: LanguageState = {
  language: "EN",
};

export const counterSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    ...changeLanguageReducer,
  },
});

export default counterSlice.reducer;
