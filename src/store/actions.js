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

/*
 * actions
 *
 * See: https://vuex.vuejs.org/en/actions.html
 * Actions are similar to mutations but are allowed to execute arbitrary asynchronise
 * operations. Instead of directly mutating state, they call mutations after the
 * asynchronise operations are complete
 */
export const actions = {
	/*
	 * setExempt( context )
	 *
	 * setExempt finds all users that are selected and unexempt and attempts
	 * to post to the exemptionUpdateURL with the user's ID. A toast message
	 * will be posted back to the LMS
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

	/*
	 * setUnexempt( context )
	 *
	 * setUnexempt finds all users that are selected and exempt and attempts
	 * to send a delete to the exemptionUpdateURL with the user's ID. A toast message
	 * will be posted back to the LMS
	 */
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

	/*
	 * toggleSelection( context, user )
	 *
	 * toggleSelection will set the isSelect for the user
	 */
	toggleSelection({commit}, user) {
		commit(types.SET_USER_SELECTION, { Identifier: user.Identifier, isSelect: !user.isSelected })
	},

	/*
	 * selectAll( context )
	 *
	 * selectAll will set the isSelected for all users. If any users are not
	 * selected, selectAll will set isSelected to true for all users. Otherwise
	 * isSelected will be set to false for all users
	 */
	selectAll({commit, state}) {
		const isSelect = state.users.some( u => !u.isSelected )
		state.users.forEach( u => commit(types.SET_USER_SELECTION, {Identifier: u.Identifier, isSelect} ))
	},

	/*
	 * loadUsers( context, urlList )
	 *
	 * loadUsers will set all the required URLs and load the classlist
	 * and exemption list. While loading, state.isLoading will be set
	 * to true
	 */
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

				if( resp.data.Items.some( u => u.OrgDefinedId != null ) ) {
					commit( types.SHOW_ORGID_COLUMN )
				}
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

	/*
	 * loadMore( context )
	 *
	 * loadMore will contact the LMS and retrieve additional users based on
	 * state.bookmark. These will be added to state.users
	 */
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