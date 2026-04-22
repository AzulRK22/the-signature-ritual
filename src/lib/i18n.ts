import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip: move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Welcome to The Signature Experience": "Welcome to The Signature Experience",
      "From hype to signature.": "From hype to signature.",
      "Begin Your Journey": "Begin Your Journey",
      // Add more keys as needed
    }
  },
  es: {
    translation: {
      "Welcome to The Signature Experience": "Bienvenido a The Signature Experience",
      "From hype to signature.": "De la hype a la firma.",
      "Begin Your Journey": "Comienza Tu Viaje",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // language to use, more info here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already does escaping
    }
  });

export default i18n;