export interface LanguageInterface {
  navbar: {
    home: string;
    about: string;
    projects: string;
    contacts: string;
    price: string;
  };
  languages: {
    en: string;
    ru: string;
  };
  title: string;
  about: {
    text: string;
  };
  price: {
    header: string;
    foot: string;
    meter: string;
    currency: string;
    meterPlaceholder: string;
    footPlaceholder: string;
  };
  project: {
    back: string;
  };
  error: {
    notFound: string;
  };
}

export type LangButtons = "EN" | "RU";
