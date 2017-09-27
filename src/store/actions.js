import axios from 'axios'

import {toast, toastc} from 'toast'
import * as types from './mutation-types'

const token = D2L.LP.Web.Authentication.Xsrf.GetXsrfToken()

const d2lAxios = axios.create({
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		'X-CSRF-Token': token
	}
})

export const actions = {
	/*
	 * setExempt( context )
	 * 
	 * setExempt finds all users that are selected and unexempt and attempts
	 * to post to the exemptionUpdateURL with the user's ID. A toast message 
	 * will be 
	 */
	setExempt({commit, state}) {
		const selectedUsers = state.users.filter( u => u.isSelected && !state.exemptions.find( e => e.UserId == u.Identifier ) )
		let errorCount = 0

		axios.all(selectedUsers.map( user => {
			commit(types.SET_EXEMPT, {id: user.Identifier, isExempt: true})
			return d2lAxios.post(`${state.exemptionUpdateURL}&userId=${user.Identifier}`)
				.catch( e => {
					commit(types.SET_EXEMPT, {id: user.Identifier, isExempt: false})
					errorCount++
				})
		}))
		.then(axios.spread( () => {
			const count = selectedUsers.length - errorCount
			toastc('toastExempt', count, {count})
			window.postMessage('update-activity-exemptions', '*')
		}))
	},

	setUnexempt({commit, state}) {
		const selectedUsers = state.users.filter( u => u.isSelected && state.exemptions.find( e => e.UserId == u.Identifier ) )
		let errorCount = 0

		axios.all(selectedUsers.map( user => {
			commit(types.SET_EXEMPT, {id: user.Identifier, isExempt: false})
			return d2lAxios.delete(`${state.exemptionUpdateURL}&userId=${user.Identifier}`)
				.catch( e => {
					commit(types.SET_EXEMPT, {id: user.Identifier, isExempt: true})
					errorCount++
				})
		}))
		.then(axios.spread( () => {
			const count = selectedUsers.length - errorCount
			toastc('toastUnexempt', count, {count})
			window.postMessage('update-activity-exemptions', '*')
		}))
	},

	toggleSelection({commit}, user) {
		commit(types.SET_USER_SELECTION, { Identifier: user.Identifier, isSelect: !user.isSelected })
	},

	selectAll({commit, state}, user) {
		const isSelect = state.users.some( u => !u.isSelected )
		state.users.forEach( u => commit(types.SET_USER_SELECTION, {Identifier: u.Identifier, isSelect} ))
	},

	loadUsers({commit}, {classlistURL, exemptionsURL, exemptionUpdateURL}) {
		commit(types.IS_LOADING, true)
		commit(types.SET_CLASSLIST_URL, classlistURL)
		commit(types.SET_EXEMPTIONS_URL, exemptionsURL)
		commit(types.SET_EXEMPTION_UPDATE_URL, exemptionUpdateURL)

		axios.get(classlistURL)
			.then( resp => {
				commit( types.LOAD_USERS, resp.data.Items.map( r => {
					r.isSelected = false
					return r
				}))

				commit( types.LOAD_PAGINGINFO, resp.data.PagingInfo )
			})
			.catch( e => {
				toast('toastCouldNotLoad')
				console.log(e)
			})

		axios.get(exemptionsURL)
			.then( resp => {
				commit( types.LOAD_EXEMPTIONS, resp.data )
				commit( types.IS_LOADING, false )
			})
			.catch( e => {
				toast('toastCouldNotLoad')
				console.log(e)
			})
	},

	loadMore({commit, state}) {
		commit(types.IS_LOADING, true)
		axios.get(`${state.classlistURL}?bookmark=${state.bookmark}`)
			.then( resp => {
				commit( types.LOAD_MORE_USERS, resp.data.Items.map( r => {
					r.isSelected = false
					return r
				}) )
				commit( types.LOAD_PAGINGINFO, resp.data.PagingInfo )
				commit( types.IS_LOADING, false )
			})
			.catch( e => {
				toast('toastCouldNotLoad')
				console.log(e)
			})
	}
}