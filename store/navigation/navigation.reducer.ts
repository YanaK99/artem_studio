import { createSlice } from "@reduxjs/toolkit";

import { changeActiveReducer } from "./reducers";

export type NavigationState = {
  active: number | null;
};

const initialState: NavigationState = {
  active: 0,
};

export const counterSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    ...changeActiveReducer,
  },
});

export default counterSlice.reducer;
