import Vue from 'vue'

import 'polyfill/find'

import App from './App.vue'
import {store} from './store/'

import {i18n} from 'i18n'

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