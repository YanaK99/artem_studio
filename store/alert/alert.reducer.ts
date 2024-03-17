import { createSlice } from "@reduxjs/toolkit";

import { setAlertReducer } from "./reducers";

export type AlertState = {
  error: string;
  success: string;
};

const initialState: AlertState = {
  error: "",
  success: "",
};

export const counterSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    ...setAlertReducer,
  },
});

export default counterSlice.reducer;
