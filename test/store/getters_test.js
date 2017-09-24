describe('getters', () => {
	let {getters} = require('store/getters')
	
	it('works', () => {
		let {exemptionCount} = getters

		let state = {
			exemptions: [1, 2]
		}

		console.log(exemptionCount)
		expect(exemptionCount(state)).toEqual(2)
	})
})