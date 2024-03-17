import { combineReducers } from "@reduxjs/toolkit";
import alertReducer from "./alert/alert.reducer";
import languagesReducer from "./languages/languages.reducer";
import navigationReducer from "./navigation/navigation.reducer";

const reducer = combineReducers({
  navigation: navigationReducer,
  language: languagesReducer,
  alert: alertReducer,
});

export default reducer;
