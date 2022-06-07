import 'i18next';
import {BASE_NAMESPACE, localesEN} from './i18nProvider';

declare module 'i18next' {
  export interface I18nTranslationKeys {
    defaultNS: typeof BASE_NAMESPACE;
    resources: typeof localesEN;
  }
}
