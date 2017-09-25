require('test/find')
describe('mutations', () => {
	const {mutations} = require('store/mutations')
	
	describe('SET_EXEMPT', () => {
		const {SET_EXEMPT} = mutations

		describe('Exempting a User', () => {
			it(`should set a user to exempt if they aren't currently exempt`, () => {
				let state = {
					exemptions: []
				}
				SET_EXEMPT(state, {id: 123, isExempt: true })
				expect(state.exemptions).toContain({UserId: 123})
			})

			it(`should not set a user to exempt if they are currently exempt`, () => {
				let state = {
					exemptions: [{
						UserId: 123
					}]
				}
				SET_EXEMPT(state, {id: 123, isExempt: true })
				expect(state.exemptions).toContain({UserId: 123})
				expect(state.exemptions.length).toEqual(1)
			})
		})

		describe('Unexempting a User', () => {
			it(`should set a user to unexempt if they are currently exempt`, () => {
				let state = {
					exemptions: [{UserId: 123}]
				}
				SET_EXEMPT(state, {id: 123, isExempt: false })
				expect(state.exemptions).not.toContain({UserId: 123})
			})
		})
	})

	describe('SET_USER_SELECTION', () => {
		const {SET_USER_SELECTION} = mutations

		it('should set the isSelected to the passed in state', () => {
			let state = {
				users: [{
					Identifier: 123,
					isSelected: false
				}]
			}

			SET_USER_SELECTION(state, {Identifier: 123, isSelect: true})
			expect(state.users[0].isSelected).toEqual(true)
		})

		it('should not crash if the user is not found', () => {
			let state = {
				users: []
			}

			SET_USER_SELECTION(state, {Identifier: 321, isSelect: true})
			expect(state.users.length).toEqual(0)
		})
	})

	describe('Set URLs', () => {
		let {
			SET_CLASSLIST_URL,
			SET_EXEMPTIONS_URL,
			SET_EXEMPTION_UPDATE_URL
		} = mutations

		it('should set the classlistURL', () => {
			let state = {
				classlistURL: ''
			}

			SET_CLASSLIST_URL(state, 'new-url')
			expect(state.classlistURL).toEqual('new-url')
		})

		it('should set the exemptionsURL', () => {
			let state = {
				exemptionsURL: ''
			}

			SET_EXEMPTIONS_URL(state, 'new-url')
			expect(state.exemptionsURL).toEqual('new-url')
		})

		it('should set the exemptionUpdateURL', () => {
			let state = {
				exemptionUpdateURL: ''
			}

			SET_EXEMPTION_UPDATE_URL(state, 'new-url')
			expect(state.exemptionUpdateURL).toEqual('new-url')
		})
	})

	describe('LOAD_USERS', () => {
		let {LOAD_USERS} = mutations

		it('should set the users into the state', () => {
			let state = {
				users: []
			}

			LOAD_USERS(state, [1, 2, 3])
			expect(state.users.length).toEqual(3)
		})
	})

	describe('LOAD_PAGINGINFO', () => {
		let {LOAD_PAGINGINFO} = mutations

		it('should set the bookmark and hasMoreItems state', () => {
			let state = {
				bookmark: '',
				hasMoreItems: false
			}

			LOAD_PAGINGINFO(state, {Bookmark: '123', HasMoreItems: true})

			expect(state.bookmark).toEqual('123')
			expect(state.hasMoreItems).toEqual(true)
		})
	})

	describe('LOAD_EXEMPTIONS', () => {
		let {LOAD_EXEMPTIONS} = mutations

		it('should set the exemptions in the state', () => {
			let state = {
				exemptions: []
			}

			LOAD_EXEMPTIONS(state, [1, 2, 3])
			expect(state.exemptions.length).toEqual(3)
		})
	})
})