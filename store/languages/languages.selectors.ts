import { AppState } from "store";
import { LangButtons } from "types/language.types";

const language = (state: AppState): LangButtons => state.language.language;

export default {
  language,
};
