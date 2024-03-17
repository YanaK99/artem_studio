import { AppState } from "store";

const active = (state: AppState): number | null => state.navigation.active;

export default {
  active,
};
