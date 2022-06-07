import i18next, {Resource} from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';
import merge from 'lodash.merge';

export const BASE_NAMESPACE = 'translations';

export const localesEN = {
  [BASE_NAMESPACE]: translationEN,
};

export const localesFR = {
  [BASE_NAMESPACE]: translationFR,
};

export const localResources: Resource = {
  en: localesEN,
  fr: localesFR,
};

i18next.use(initReactI18next).init({
  ns: [BASE_NAMESPACE],
  defaultNS: BASE_NAMESPACE,
  debug: true,
  lng: 'en',
  fallbackLng: 'en',
  resources: localResources,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

async function getLokaliseTranslations(): Promise<Resource> {
  // Fetch keys and translations
  const loakliseTranslations = await (
    await fetch('http://localhost:8080/locales/en.json')
  ).json();

  console.log(loakliseTranslations);

  return {
    en: loakliseTranslations,
  };
}

getLokaliseTranslations().then((lokaliseResources: Resource) => {
  console.log('Lokalise resources loaded!');
  Object.entries(lokaliseResources).map(([lng, lngResources]) => {
    console.log(`Add lokalise ${lng} resources at runtime...`);
    i18next.addResources(
      lng,
      BASE_NAMESPACE,
      merge(localResources[lng][BASE_NAMESPACE], lngResources),
    );
  });
  console.log(i18next);
  i18next.changeLanguage('en');
});

export default i18next;
