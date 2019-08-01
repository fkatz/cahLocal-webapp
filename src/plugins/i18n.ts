import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'
import LngDetector from 'i18next-browser-languagedetector';

Vue.use(VueI18n)

function loadLocaleMessages (): LocaleMessages {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages: LocaleMessages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
  //silentTranslationWarn: true
})
let cookie = document.cookie;
if(cookie.includes("locale")){
  let locale = cookie.substr(cookie.indexOf("=")+1,2);
  console.log("locale is "+locale);
  i18n.locale = locale;
} else i18n.locale = navigator.language.substring(0,2);
export default i18n
