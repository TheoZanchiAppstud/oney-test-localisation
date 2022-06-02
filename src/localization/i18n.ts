import i18n, {Resource} from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';
import lokaliseTranslationEN from './en_lokalise.json';
import lokaliseTranslationFR from './fr_lokalise.json';
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

i18n.use(initReactI18next).init({
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
  await new Promise(resolve => setTimeout(resolve, 3000));
  return {
    en: lokaliseTranslationEN,
    fr: lokaliseTranslationFR,
  };
}

getLokaliseTranslations().then((lokaliseResources: Resource) => {
  console.log('Lokalise resources loaded!');
  Object.entries(lokaliseResources).map(([lng, lngResources]) => {
    console.log(`Add lokalise ${lng} resources at runtime...`);
    i18n.addResources(
      lng,
      BASE_NAMESPACE,
      merge(localResources[lng][BASE_NAMESPACE], lngResources),
    );
  });
  console.log(i18n);
  i18n.changeLanguage('en');
});
