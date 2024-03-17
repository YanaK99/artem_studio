import { buttonsData } from "components/containers/navigation/utils/buttons-data";

export const urlToIndexConverter = (pathname: string) => {
  const foundId = buttonsData('home','about','projects','price','contacts').find((btn) => btn.link === pathname)?.id ?? 0;
  return foundId;
};
