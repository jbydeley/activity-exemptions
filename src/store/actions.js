import axios from 'axios'
import {i18n} from 'i18n'
import * as types from './mutation-types'

function d2lAxios(token) {
	return axios.create({
		withCredentials: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
			'X-CSRF-Token': token
		}
	})
}

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
			return d2lAxios(state.token).post(`${state.exemptionUpdateURL}&userId=${user.Identifier}`)
				.catch( e => {
					commit(types.SET_EXEMPT, {id: user.Identifier, isExempt: false})
					errorCount++
				})
		}))
		.then(axios.spread( () => {
			const count = selectedUsers.length - errorCount
			this.dispatch('toast', i18n.tc('toastExempt', count, {count}))
			this.dispatch('updateExemptionCount')
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
			return d2lAxios(state.token).delete(`${state.exemptionUpdateURL}&userId=${user.Identifier}`)
				.catch( e => {
					commit(types.SET_EXEMPT, {id: user.Identifier, isExempt: true})
					errorCount++
				})
		}))
		.then(axios.spread( () => {
			const count = selectedUsers.length - errorCount
			this.dispatch('toast', i18n.tc('toastUnexempt', count, {count}))
			this.dispatch('updateExemptionCount')
		}))
	},

	/*
	 * searchUsers( context )
	 *
	 * searchUsers calls prepares the search against the classlist api
	 * with a query parameter for loadUsers.
	 */
	searchUsers({commit, state}, searchBy) {
		// Check null searchBy
		if( !searchBy || !/\S/.test(searchBy) ) {
			// If there is already a resulted list of students
			if( state.queryTerm ) {
				this.dispatch('clearResults')
			} else {
				return
			}
		} else {			
			// Check if its the same term
			if( searchBy === state.queryTerm) {
				// Don't need to do anything if its the same term
				return
			}
			commit(types.SET_SHOW_CLEAR_BUTTON, true)
			
			// New search term clear users
			commit(types.LOAD_USERS, [])
			// Set new term for queryTerm
			commit(types.SET_QUERY_TERM, searchBy)
			// Reset paging info
			commit(types.LOAD_PAGINGINFO, {})
			// Call loadUsers to load first page
			this.dispatch('loadUsers')
		}
	},

	/*
	 * clearResults( context )
	 *
	 * clearResults clears the search box and results reloads the original load
	 */
	clearResults({commit, state}) {
		commit(types.SET_SHOW_CLEAR_BUTTON, '')
		// Clear search term
		commit(types.SET_QUERY_TERM, '')
		// Load original list
		commit(types.LOAD_USERS, [])
		this.dispatch('loadUsers')
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
	loadUsers({commit, state}) {
		commit(types.IS_LOADING, true)
		Promise.all([
			axios.get(`${state.classlistURL}?onlyShowShownInGrades=true&searchTerm=${state.queryTerm}`)
				.then( resp => {
					commit( types.LOAD_USERS, resp.data.Items.map( r => {
						r.isSelected = false
						return r
				}))

				commit( types.LOAD_PAGINGINFO, resp.data.PagingInfo )
			})
			.catch( e => {
				this.dispatch('toast', i18n.t('toastCouldNotLoad'))
				console.log(e)
			}),

			axios.get(state.exemptionsURL)
				.then( resp => {
					commit( types.LOAD_EXEMPTIONS, resp.data )
				})
				.catch( e => {
					this.dispatch('toast', i18n.t('toastCouldNotLoad'))
					console.log(e)
				})
		])
		.then( () => commit( types.IS_LOADING, false ))
	},

	/*
	 * loadMore( context )
	 *
	 * loadMore will contact the LMS and retrieve additional users based on
	 * state.bookmark. These will be added to state.users
	 */
	loadMore({commit, state}) {
		commit(types.IS_LOADING, true)
		axios.get(`${state.classlistURL}?onlyShowShownInGrades=true&bookmark=${state.bookmark}&searchTerm=${state.queryTerm}`)
			.then( resp => {
				commit( types.LOAD_MORE_USERS, resp.data.Items.map( r => {
					r.isSelected = false
					return r
				}) )
				commit( types.LOAD_PAGINGINFO, resp.data.PagingInfo )
				commit( types.IS_LOADING, false )
			})
			.catch( e => {
				this.dispatch('toast', i18n.t('toastCouldNotLoad'))
				console.log(e)
			})
	}
}