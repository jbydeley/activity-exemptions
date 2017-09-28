import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export const i18n = new VueI18n({
	locale: 'en',
	messages: {
		'ar-SA': require('lang/ar-SA.json'),
		'ar': require('lang/ar.json'),
		'de-DE': require('lang/de-DE.json'),
		'de': require('lang/de.json'),
		'en-CA': require('lang/en-CA.json'),
		'en-GB': require('lang/en-GB.json'),
		'en-US': require('lang/en-GB.json'),
		'en': require('lang/en.json'),
		'es-MX': require('lang/es-MX.json'),
		'es': require('lang/es.json'),
		'fr-CA': require('lang/fr-CA.json'),
		'fr': require('lang/fr.json'),
		'ja-JP': require('lang/ja-JP.json'),
		'ja': require('lang/ja.json'),
		'ko-KR': require('lang/ko-KR.json'),
		'ko': require('lang/ko.json'),
		'nb-NO': require('lang/nb-NO.json'),
		'nb': require('lang/nb.json'),
		'nl-NL': require('lang/nl-NL.json'),
		'nl': require('lang/nl.json'),
		'pt-BR': require('lang/pt-BR.json'),
		'pt': require('lang/pt.json'),
		'sv-SE': require('lang/sv-SE.json'),
		'sv': require('lang/sv.json'),
		'tr-TR': require('lang/tr-TR.json'),
		'tr': require('lang/tr.json'),
		'zh-CN': require('lang/zh-CN.json'),
		'zh-TW': require('lang/zh-TW.json'),
		'zh': require('lang/zh.json')
	}
})
