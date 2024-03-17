import { languages, LanguagesContext } from "contexts";
import { FC } from "react";
import { useSelector } from "react-redux";

import languageSelectors from "store/languages/languages.selectors";

export const LanguageProvider: FC = ({ children }) => {
  const language = useSelector(languageSelectors.language);
  return (
    <LanguagesContext.Provider
      value={language === "EN" ? languages.en : languages.ru}
    >
      {children}
    </LanguagesContext.Provider>
  );
};
