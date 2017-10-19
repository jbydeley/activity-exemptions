import {i18n} from 'i18n'

export const getters = {
	allUsers({users}) {
		return users.map( u => ({
			...u,
			fullName: getFullName(u)
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

	canSeeOrgIdColumn({users}) {
		return users.some( u => u.OrgDefinedId != null )
	},

	canSeeFirstName({users}) {
		return users.some( u => u.FirstName != null )
	},

	canSeeLastName({users}) {
		return users.some( u => u.LastName != null )
	},

	localId({localId}) {
		return localId
	},

	showClearButton({showClearButton}) {
		return showClearButton
	}
}

function getFullName(user) {
	 if( user.LastName && user.FirstName ) {
		 return `${user.FirstName} ${user.LastName}`
	 }

	 if( user.LastName ) {
		 return user.LastName
	 }

	 if( user.FirstName ) {
		 return user.FirstName
	 }

	 return i18n.t('lblAnonymousUser')
}