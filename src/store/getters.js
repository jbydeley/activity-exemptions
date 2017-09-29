export const getters = {
	allUsers({users}) {
		return users.map( u => ({
			...u,
			fullName: `${u.LastName}, ${u.FirstName}`
		}));
	},
	
	isUserExempt({exemptions}) {
		return ({Identifier}) => exemptions.some( user => user.UserId == Identifier )
	},

	exemptionCount({exemptions}) {
		return exemptions.length
	},

	allSelected({users}) {
		return users.every( u => u.isSelected )
	},

	hasMoreItems({hasMoreItems}) {
		return hasMoreItems
	},

	isLoading({isLoading}) {
		return isLoading
	},

	showOrgIdColumn({showOrgIdColumn}) {
		return showOrgIdColumn
	}
}