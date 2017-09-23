import {SET_EXEMPT} from '../mutation-types'

export const ImplicitSave = store => {
	store.subscribe( (mutation, state) => {
		if( mutation.type === SET_EXEMPT ) {
			console.log('About to call it')
			D2L.LP.Web.UI.Rpc.Connect(
				'GET',
				new D2L.LP.Web.Http.UrlLocation.Create(
					'/d2l/le/manageexemptions/6609/UserExempted'
				)
			)
		}
	})
}