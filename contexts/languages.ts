import React from "react";

import { englishLanguage, russianLanguage } from "languages";

export const languages = {
  en: englishLanguage,
  ru: russianLanguage,
};

export const LanguagesContext = React.createContext(languages.en);
