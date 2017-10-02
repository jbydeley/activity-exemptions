import Vue from 'vue'

import 'polyfill/find'

import App from 'App.vue'
import {createStore} from 'store/index'
import * as types from 'store/mutation-types'
import {i18n} from 'i18n'

D2L.LE.Web.UI.Desktop.Controls.ManageExemptions.loadVue = function loadVue(
	id,
	classlistURL,
	exemptionsURL,
	exemptionUpdateURL,
	token,
	sendToast = (msg) => {},
	updateExemptionCount = () => {}) {

	const store = createStore(
		sendToast,
		updateExemptionCount
	)

	new Vue({
		i18n,
		el: `#${id}`,
		store,
		render: h => h(App)
	})

	store.commit(types.SET_TOKEN, token)
	store.commit(types.SET_CLASSLIST_URL, classlistURL)
	store.commit(types.SET_EXEMPTIONS_URL, exemptionsURL)
	store.commit(types.SET_EXEMPTION_UPDATE_URL, exemptionUpdateURL)

	store.dispatch('loadUsers')
}
