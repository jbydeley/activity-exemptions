export const getters = {
	allUsers({users}) {
		return users.map( u => ({
			...u,
			fullName: `${u.LastName}, ${u.FirstName}`
		}));
	},
	
	isUserExempt(state) {
		return ({Identifier}) => state.exemptions.some( e => e.UserId == Identifier )
	},

	exemptionCount(state) {
		return state.exemptions.length
	},

	allSelected(state) {
		return state.users.filter( u => u.isSelected ).length === state.users.length;
	}
}