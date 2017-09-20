import Vue from 'vue'
import VueI18n from 'vue-i18n'

import App from './App.vue'

import {store} from './store/'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
    	lblExempt: 'Exempt',
    	lblExemptionCount: 'Exemptions: {exemptionCount}',
    	lblLastFirstName: 'Last Name, First Name',
    	lblExemptStatus: 'Exempt Status',
    	btnExempt: 'Exempt',
    	btnUnexempt: 'Unexempt'
    }
  }
})

new Vue({
	i18n,
  el: '#app',
  store,
  render: h => h(App)
})
