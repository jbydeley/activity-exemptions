import Vue from 'vue'

import 'polyfill/find'

import App from 'App.vue'
import {createStore} from 'store/index'
import * as types from 'store/mutation-types'
import {i18n} from 'i18n'

Vue.config.performance = process.env.NODE_ENV !== "production"

function loadVue(
	id,
	classlistURL,
	exemptionsURL,
	exemptionUpdateURL,
	token,
	sendToast = (msg) => {},
	updateExemptionCount = () => {}
	) {

	if( !D2LManageExemptions.instances[id] ) {
		const store = createStore(
			sendToast,
			updateExemptionCount
		)

		store.commit(types.SET_TOKEN, token)
		store.commit(types.SET_CLASSLIST_URL, classlistURL)
		store.commit(types.SET_EXEMPTIONS_URL, exemptionsURL)
		store.commit(types.SET_EXEMPTION_UPDATE_URL, exemptionUpdateURL)
		store.commit(types.SET_LOCAL_ID, id)
		D2LManageExemptions.instances[id] = new Vue({
			i18n,
			el: `#${id}`,
			store,
			render: h => h(App)
		})

	}

	D2LManageExemptions.instances[id].$store.dispatch('loadUsers')
}

window.D2LManageExemptions = {
	instances: {},
	loadVue
}

