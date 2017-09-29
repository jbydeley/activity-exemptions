describe('getters', () => {
	const {getters} = require('store/getters')
	
	describe('allUsers', () => {

		it('should map first name and last name appropriately', () => {
			const {allUsers} = getters

			let state = {
				users: [{
					FirstName: 'John',
					LastName: 'Smith'
				}]
			}

			expect(allUsers(state)[0].fullName).toEqual('John Smith')
		})

		it('should map first name when no last name exists', () => {
			const {allUsers} = getters

			let state = {
				users: [{
					FirstName: 'John'
				}]
			}

			expect(allUsers(state)[0].fullName).toEqual('John')
		})

		it('should map last name when no first name exists', () => {
			const {allUsers} = getters

			let state = {
				users: [{
					LastName: 'Smith'
				}]
			}

			expect(allUsers(state)[0].fullName).toEqual('Smith')
		})

		it('should map anonymous user when no names exist', () => {
			const {allUsers} = getters

			let state = {
				users: [{}]
			}

			expect(allUsers(state)[0].fullName).toEqual('Anonymous User')
		})
	})

	describe('isUserExempt', () => {
		const {isUserExempt} = getters

		it('should return true when user is exempt', () => {
			

			let state = {
				exemptions: [{
					UserId: '175'
				}]
			}

			expect(isUserExempt(state)({ Identifier: 175 })).toEqual(true)
		})

		it('should return false when user is not exempt', () => {
			

			let state = {
				exemptions: [{
					UserId: '176'
				}]
			}

			expect(isUserExempt(state)({ Identifier: 175 })).toEqual(false)
		})

	})

	describe('exemptionCount', () => {

		it('should return the number of exemptions', () => {
			const {exemptionCount} = getters

			let state = {
				exemptions: [1, 2]
			}

			expect(exemptionCount(state)).toEqual(2)
		})

	})

	describe('allSelected', () => {
		const {allSelected} = getters

		it('should return true if all users are selected', () => {
			let state = {
				users: [{
					isSelected: true
				}, {
					isSelected: true
				}]
			}

			expect(allSelected(state)).toEqual(true)
		})

		it('should return false if any users are not selected', () => {
			let state = {
				users: [{
					isSelected: true
				}, {
					isSelected: false
				}]
			}

			expect(allSelected(state)).toEqual(false)
		})
	})

	describe('hasMoreItems', () => {
		const {hasMoreItems} = getters

		it('should return true when true', () => {
			let state = {
				hasMoreItems: true
			}

			expect(hasMoreItems(state)).toEqual(true)
		})

		it('should return false when false', () => {
			let state = {
				hasMoreItems: false
			}

			expect(hasMoreItems(state)).toEqual(false)
		})
	})

	describe('isLoading', () => {
		const {isLoading} = getters

		it('should return true when true', () => {
			let state = {
				isLoading: true
			}

			expect(isLoading(state)).toEqual(true)
		})

		it('should return false when false', () => {
			let state = {
				isLoading: false
			}

			expect(isLoading(state)).toEqual(false)
		})
	})
})