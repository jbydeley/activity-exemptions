import Vue from 'vue'
import Vuex from 'vuex'

import {ImplicitSave} from './plugins/implicitSave.plugin'

Vue.use(Vuex)

import {getters} from './getters'
import {mutations} from './mutations'
import {actions} from './actions'

const debug = process.env.NODE_ENV !== 'production'

export const store = new Vuex.Store({
	plugins: debug ? [] : [ImplicitSave],
	state: {
		users: [],
		exemptions: [],
		bookmark: '',
		hasMoreItems: true,
		classlistURL: '',
		exemptionsURL: '',
		exemptionUpdateURL: '',
		isLoading: true
	},
	getters,
	mutations,
	actions
})