import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export const i18n = new VueI18n({
	fallbackLocale: 'en',
	messages: {
		'ar-sa': require('lang/ar-SA.json'),
		'de-de': require('lang/de-DE.json'),
		'en': require('lang/en.json'),
		'es-mx': require('lang/es-MX.json'),
		'fr-ca': require('lang/fr-CA.json'),
		'ja-jp': require('lang/ja-JP.json'),
		'ko-kr': require('lang/ko-KR.json'),
		'nb-no': require('lang/nb-NO.json'),
		'nl-nl': require('lang/nl-NL.json'),
		'pt-br': require('lang/pt-BR.json'),
		'sv-se': require('lang/sv-SE.json'),
		'tr-tr': require('lang/tr-TR.json'),
		'zh-cn': require('lang/zh-CN.json'),
		'zh-tw': require('lang/zh-TW.json')
	}
})
