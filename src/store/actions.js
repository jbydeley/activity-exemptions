import axios from 'axios'

import * as types from './mutation-types'

const token = D2L.LP.Web.Authentication.Xsrf.GetXsrfToken();

const d2lAxios = axios.create({
	withCredentials: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
		'X-CSRF-Token': token
	}
})

export const actions = {
	setExempt({commit, state}) {
		const selectedUsers = state.users.filter( u => u.isSelected && !state.exemptions.find( e => e.UserId == u.Identifier ) )

		axios.all(selectedUsers.map( user => {
			d2lAxios.post(`${state.exemptionUpdateURL}&userId=${user.Identifier}`)
				.then( resp => {
					count--
					commit(types.SET_EXEMPT, {id: user.Identifier, isExempt: true}) 
				})
				.catch( e => console.log(`Inner: ${e}`) )
		}))
		.then(axios.spread( () => {
			D2L.LP.Web.UI.Rpc.Connect(
				'GET',
				new D2L.LP.Web.Http.UrlLocation.Create(
					'/d2l/le/manageexemptions/6609/UserExempted'
				)
			)
		}))

		if( count === 0 ) {
			console.log('Success')
		}
	},

	setUnexempt({commit, state}) {
		const selectedUsers = state.users.filter( u => u.isSelected && state.exemptions.find( e => e.UserId == u.Identifier ) )

		selectedUsers.forEach( user => {
			d2lAxios.delete(`${state.exemptionUpdateURL}&userId=${user.Identifier}`)
				.then( resp => commit(types.SET_EXEMPT, {id: user.Identifier, isExempt: false}) )
				.catch( e => console.log(e) )
		})
	},

	toggleSelection({commit}, user) {
		commit(types.SET_USER_SELECTION, { Identifier: user.Identifier, isSelect: !user.isSelected })
	},

	selectAll({commit, state}, user) {
		const isSelect = state.users.some( u => !u.isSelected )
		state.users.forEach( u => commit(types.SET_USER_SELECTION, {Identifier: u.Identifier, isSelect} ))
	},

	loadUsers({commit}, {classlistURL, exemptionsURL, exemptionUpdateURL}) {
		commit(types.SET_CLASSLIST_URL, classlistURL)
		commit(types.SET_EXEMPTIONS_URL, exemptionsURL)
		commit(types.SET_EXEMPTION_UPDATE_URL, exemptionUpdateURL)

		axios.get(classlistURL)
			.then( resp => {
				commit( types.LOAD_USERS, resp.data.Items.map( r => {
					r.isSelected = false
					r.Identifier = parseInt(r.Identifier)
					return r
				}))

				commit( types.LOAD_PAGINGINFO, resp.data.PagingInfo )
			})
			.catch( e => {
				console.log(e)
			})

		axios.get(exemptionsURL)
			.then( resp => {
				commit( types.LOAD_EXEMPTIONS, resp.data )
			})
			.catch( e => {
				console.log(e)
			})
	},

	loadMore({commit, state}) {
		axios.get(`${state.classlistURL}?bookmark=${state.bookmark}`)
			.then( resp => {
				commit( types.LOAD_USERS, resp.data.Items.map( r => {
					r.isSelected = false
					r.Identifier = parseInt(r.Identifier)
					return r
				}) )
				commit( types.LOAD_PAGINGINFO, resp.data.PagingInfo )
			})
			.catch( e => {
				console.log(e)
			})
	}
}