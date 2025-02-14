import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./translations/en";
import hi from "./translations/hi";
import ta from "./translations/ta";
import te from "./translations/te";
import kn from "./translations/kn";
import ml from "./translations/ml";
import mr from "./translations/mr";
import gu from "./translations/gu";
import pa from "./translations/pa";
import bn from "./translations/bn";
import or from "./translations/or";
import as from "./translations/as";
import san from "./translations/san";
import ks from "./translations/ks";
import kon from "./translations/kon";
import mni from "./translations/mni";
import ne from "./translations/ne";
import sd from "./translations/sd";
import ur from "./translations/ur";
import brx from "./translations/brx";
import sat from "./translations/sat";
import mai from "./translations/mai";
import doi from "./translations/doi";

import { languages } from "./languages";

export const supportedLanguages = Object.entries(languages).map(
  ([code, name]) => ({
    code,
    name,
  })
);

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  ta: { translation: ta },
  te: { translation: te },
  kn: { translation: kn },
  ml: { translation: ml },
  mr: { translation: mr },
  gu: { translation: gu },
  pa: { translation: pa },
  bn: { translation: bn },
  or: { translation: or },
  as: { translation: as },
  san: { translation: san },
  ks: { translation: ks },
  kon: { translation: kon },
  mni: { translation: mni },
  ne: { translation: ne },
  sd: { translation: sd },
  ur: { translation: ur },
  brx: { translation: brx },
  sat: { translation: sat },
  mai: { translation: mai },
  doi: { translation: doi },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
