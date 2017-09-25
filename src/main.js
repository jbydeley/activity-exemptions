import Vue from 'vue'
import VueI18n from 'vue-i18n'

import 'polyfill/find'

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
			btnUnexempt: 'Unexempt',
			btnLoadMore: 'Load More...'
		}
	}
})
D2L.LE.Web.UI.Desktop.Controls.ManageExemptions.loadVue = function loadVue(id, classlistURL, exemptionsURL, exemptionUpdateURL) {
	new Vue({
		i18n,
		el: `#${id}`,
		store,
		render: h => h(App)
	})

	store.dispatch('loadUsers', {classlistURL, exemptionsURL, exemptionUpdateURL})
}


// new Vue({
// 	i18n,
// 	el: `#app`,
// 	store,
// 	render: h => h(App)
// })

// store.dispatch('loadUsers', {classlistURL: '/d2l/api/le/1.26/6613/classlist', exemptionsURL: '/d2l/api/le/1.26/6613/activities/exemptions/'})