import { AppState } from "store";

const error = (state: AppState): string => state.alert.error;
const success = (state: AppState): string => state.alert.success;

export default {
  error,
  success,
};
