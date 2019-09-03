import en from './translations/en'
import ru from './translations/ru'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

window.i18next = i18next;

const options = {
    fallbackLng: 'en',
    debug: true,
    resources: {
        en,
        ru
    }

}

i18next
    .use(LanguageDetector)
    .init(options);

export default i18next