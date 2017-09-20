import {SET_EXEMPT} from '../mutation-types';

export const ImplicitSave = store => {
	store.subscribe( (mutation, state) => {
		if( mutation.type === SET_EXEMPT ) {
			console.log(state.users.filter( u => u.isSelected ))
		}
	})
}