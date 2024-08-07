/* eslint-disable no-void */
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import {en, ar} from './languages';

const resources = {
  ...en,
  ...ar,
};

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export const languages = ['en', 'ar'] as const;

export type Languages = (typeof languages)[number];

export default i18n;
