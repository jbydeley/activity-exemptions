import * as types from './mutation-types'

export const mutations = {
	[types.SET_EXEMPT] (state, {id, isExempt}) {
		isExempt
			? handleIsExempt(id, state)
			: handleIsNotExempt(id, state)

		window.postMessage('update-activity-exemptions', '*')
	},

	[types.SET_USER_SELECTION] (state, {Identifier, isSelect}) {
		const user = state.users.find( u => u.Identifier === Identifier )
		if( !user ) {
			return
		}

		user.isSelected = isSelect
	},

	[types.SET_CLASSLIST_URL] (state, url) {
		state.classlistURL = url
	},

	[types.SET_EXEMPTIONS_URL] (state, url) {
		state.exemptionsURL = url
	},

	[types.SET_EXEMPTION_UPDATE_URL] (state, url) {
		state.exemptionUpdateURL = url
	},

	[types.LOAD_USERS] (state, users) {
		state.users.push(...users)
	},

	[types.LOAD_PAGINGINFO] (state, pagingInfo) {
		state.bookmark = pagingInfo.Bookmark
		state.hasMoreItems = pagingInfo.HasMoreItems
	},

	[types.LOAD_EXEMPTIONS] (state, exemptions) {
		state.exemptions = exemptions
	}
}

function handleIsExempt(userId, state) {
	if( state.exemptions.find( exemption => exemption.UserId === userId ) ) {
		return;
	}

	state.exemptions.push( { UserId: userId } )
}

function handleIsNotExempt(userId, state) {
	const user = state.exemptions.find( exemption => exemption.UserId === userId )
	if( !user ) {
		return;
	}

	state.exemptions.splice( state.exemptions.indexOf( user ), 1 )
}