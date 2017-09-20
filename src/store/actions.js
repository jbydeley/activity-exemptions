import axios from 'axios'

import * as types from './mutation-types'

export const actions = {
	setExempt({commit}) {
		commit(types.SET_EXEMPT, {isExempt: true})
	},

	setUnexempt({commit}) {
		commit(types.SET_EXEMPT, {isExempt: false})
	},

	toggleSelection({commit}, user) {
		commit(types.SET_USER_SELECTION, { Identifier: user.Identifier, isSelect: !user.isSelected })
	},

	selectAll({commit, state}, user) {
		const isSelect = state.users.some( u => !u.isSelected )
		state.users.forEach( u => commit(types.SET_USER_SELECTION, {Identifier: u.Identifier, isSelect} ))
	},

	loadUsers({commit}) {
		axios.get('/d2l/api/le/1.26/6613/classlist')
			.then( resp => {
				commit( types.LOAD_USERS, resp.data.Items.map( r => {
					r.isExempt = false
					r.isSelected = false
					return r
				}))

				commit( types.LOAD_PAGINGINFO, resp.data.PagingInfo )
			})
			.catch( e => {
				console.log(e)
				this.errors.push(e)
			})

		axios.get('/d2l/api/le/1.26/6613/activities/exemptions/?activityId=https://ids.brightspace.com/activities/lti/Dev-2')
			.then( resp => {
				commit( types.LOAD_EXEMPTIONS, resp.data )
			})
			.catch( e => {
				this.errors.push(e)
			})
	}
}