import * as types from './mutation-types'

export const mutations = {
	[types.SET_EXEMPT] (state, {isExempt}) {
		const selectedUsers = state.users.filter( u => u.isSelected )

		selectedUsers.forEach( u => {
			const user = state.exemptions.find( e => e.UserId == u.Identifier )
			if( !user && isExempt ) {
				state.exemptions.push({
					UserId: parseInt(u.Identifier),
					ActivityId: 'https://ids.brightspace.com/activities/lti/Dev-2',
					LogHistory: null
				})
			} else if ( !isExempt ) {
				state.exemptions.splice( state.exemptions.indexOf( user ), 1)
			}
		})
	},

	[types.SET_USER_SELECTION] (state, {Identifier, isSelect}) {
		const user = state.users.find( u => u.Identifier === Identifier )
		user.isSelected = isSelect
	},

	[types.LOAD_USERS] (state, users) {
		state.users = users
	},

	[types.LOAD_PAGINGINFO] (state, pagingInfo) {
		state.bookmark = pagingInfo.Bookmark
		state.hasMoreItems = pagingInfo.HasMoreItems
	},

	[types.LOAD_EXEMPTIONS] (state, exemptions) {
		state.exemptions = exemptions
	}
}