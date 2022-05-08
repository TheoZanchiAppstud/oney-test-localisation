import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import ChainedBackend from 'i18next-chained-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import translationEN from './en.json';
import translationRU from './fr.json';
import Phrase from 'react-native-phrase-sdk';

const localResources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

let phrase = new Phrase(
  'c708b1c4b9b7ac17e857e73c3d886390',
  'HjRwxh_-3NjSi_0XU9QkwKUWN0EDyGJcK9kA2vBpSRs',
  '1.0.0',
  'i18next',
);

const backendPhrase = resourcesToBackend((language, namespace, callback) => {
  phrase
    .requestTranslation(language)
    .then(remoteResources => {
      callback(null, remoteResources);
    })
    .catch(error => {
      callback(error, null);
    });
});

const backendFallback = resourcesToBackend(localResources);

i18n
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    backend: {
      backends: [backendPhrase, backendFallback],
    },
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
