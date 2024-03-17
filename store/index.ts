import { configureStore, Action } from "@reduxjs/toolkit";

import reducer from "./reducer";

const index = configureStore({
  reducer,
});

export type AppDispatch = typeof index.dispatch;
export type AppState = ReturnType<typeof index.getState>;

export default index;
