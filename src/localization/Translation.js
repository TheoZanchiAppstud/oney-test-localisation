import AsyncStorage from '@react-native-community/async-storage';
import React, {createContext, useState, useEffect} from 'react';
import LocalizedStrings from 'react-native-localization';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import fr from './fr.json';
import Phrase from 'react-native-phrase-sdk';

const DEFAULT_LANGUAGE = 'en';
const APP_LANGUAGE = 'appLanguage';
const languages = {en, fr};
const translations = new LocalizedStrings(languages);

let phrase = new Phrase(
  'c708b1c4b9b7ac17e857e73c3d886390',
  'HjRwxh_-3NjSi_0XU9QkwKUWN0EDyGJcK9kA2vBpSRs',
  '1.0.0',
  'i18next',
);

export const LocalizationContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
});

export const LocalizationProvider = ({children}) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  const setLanguage = language => {
    translations.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE, language);
  };

  useEffect(() => {
    getPhraseLanguages();
  }, []);

  async function getPhraseLanguages() {
    try {
      const phraseResult = await phrase.requestTranslation('fr');
      console.log('bonjour', phraseResult);
    } catch (e) {
      console.log('error', e);
    }
  }

  const initializeAppLanguage = async () => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    if (currentLanguage) {
      setLanguage(currentLanguage);
    } else {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        locale => locale.languageCode,
      );
      phoneLocaleCodes.some(code => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    }
  };
  return (
    <LocalizationContext.Provider
      value={{
        translations,
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};
