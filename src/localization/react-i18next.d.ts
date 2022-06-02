import {BASE_NAMESPACE, localesEN} from './i18n';

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof BASE_NAMESPACE;
    resources: typeof localesEN;
  }
}
