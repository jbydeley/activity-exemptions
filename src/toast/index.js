import {i18n} from 'i18n'

export const toastc = function(message, count, args = {}) {
	if( D2L && D2L.LP && D2L.LP.Web ) {
		D2L.LP.Web.UI.Rpc.Connect(
			'GET',
			new D2L.LP.Web.Http.UrlLocation.Create(
				'/d2l/le/manageexemptions/UserExempted',
				{
					message: i18n.tc(message, count, args)
				}
			)
		)
	}
}

export const toast = function(message, args = {}) {
	if( D2L && D2L.LP && D2L.LP.Web ) {
		D2L.LP.Web.UI.Rpc.Connect(
			'GET',
			new D2L.LP.Web.Http.UrlLocation.Create(
				'/d2l/le/manageexemptions/UserExempted',
				{
					message: i18n.t(message, args)
				}
			)
		)
	}
}