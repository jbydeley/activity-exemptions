export const getters = {
	allUsers({users}) {
		return users.map( u => ({
			...u,
			fullName: `${u.LastName}, ${u.FirstName}`
		}));
	},
	
	isUserExempt(state) {
		return ({Identifier}) => state.exemptions.some( user => user.UserId == Identifier )
	},

	exemptionCount(state) {
		return state.exemptions.length
	},

	allSelected(state) {
		return state.users.every( u => u.isSelected )
	},

	hasMoreItems(state) {
		return state.hasMoreItems
	}
}