describe('mutations', () => {
	let {mutations} = require('store/mutations')
	
	it('works', () => {
		let {SET_CLASSLIST_URL} = mutations

		let state = {
			classlistURL: ''
		}

		SET_CLASSLIST_URL(state, 'new-url')
		expect(state.classlistURL).toEqual('new-url')
	})
})