import en from './translations/en'
import ru from './translations/ru'
import i18next from 'i18next'

window.i18next = i18next;

const options = {
    fallbackLng: 'en',
    debug: true,
    resources: {
        en,
        ru
    }

}

i18next.init(options);

export default i18next