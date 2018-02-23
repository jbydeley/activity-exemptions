import Vue from "vue"
import Vuex from "vuex"
import { i18n } from "i18n"

import UserSearchComponent from "../../src/components/UserSearch.vue"

describe("UserSearch", () => {
	let UserSearch
	beforeAll(() => {
		i18n.locale = "en"
		Vue.use(Vuex)
	})

	describe("search icon", () => {
		let selector = ".c-search__search-button"
		let searchUsersParam
		beforeEach(() => {
			searchUsersParam = ""
			const actions = {
				searchUsers: ({}, text) => (searchUsersParam = text)
			}
			const store = new Vuex.Store({
				actions
			})
			const Constructor = Vue.extend(UserSearchComponent)
			UserSearch = new Constructor({
				store,
				i18n
			}).$mount()
		})

		it("should exist by default", done => {
			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector)
				expect(btn).not.toBeNull()
				done()
			})
		})

		it("should exist when text entered", done => {
			UserSearch.searchText = "to search"

			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector)
				expect(btn).not.toBeNull()
				done()
			})
		})

		it("should not exist when search performed and text unchanged", done => {
			UserSearch.searchText = "completed"
			UserSearch.submittedText = "completed"
			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector)
				expect(btn).toBeNull()
				done()
			})
		})

		it("should set submittedText and call searchUsers with term", done => {
			UserSearch.searchText = "completed"
			UserSearch.submittedText = ""
			const btn = UserSearch.$el.querySelector(selector)
			btn.click()
			Vue.nextTick(() => {
				expect(UserSearch.searchText).toBe("completed")
				expect(UserSearch.submittedText).toBe("completed")
				expect(searchUsersParam).toBe("completed")
				done()
			})
		})
	})

	describe("clear icon", () => {
		const selector = ".c-search__clear-button"
		let clearResultsCalled
		beforeEach(() => {
			clearResultsCalled = false
			const actions = {
				clearResults: () => (clearResultsCalled = true)
			}
			const store = new Vuex.Store({
				actions
			})
			const Constructor = Vue.extend(UserSearchComponent)
			UserSearch = new Constructor({
				store,
				i18n
			}).$mount()
		})

		it("should not exist by default", done => {
			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector)
				expect(btn).toBeNull()
				done()
			})
		})

		it("should not exist if search performed and text changed", done => {
			UserSearch.submittedText = "completed"
			UserSearch.searchText = "changed"
			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector)
				expect(btn).toBeNull()
				done()
			})
		})

		it("should exist if search performed and text unchanged", done => {
			UserSearch.searchText = "completed"
			UserSearch.submittedText = "completed"

			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector)
				expect(btn).not.toBeNull()
				done()
			})
		})

		it("should clear search and dispatch clearResults", done => {
			UserSearch.searchText = "completed"
			UserSearch.submittedText = "completed"
			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector)
				btn.click()

				expect(UserSearch.searchText).toBe("")
				expect(UserSearch.submittedText).toBe("")
				expect(clearResultsCalled).toBeTruthy()
				done()
			})
		})
	})

	describe("clear button", () => {
		let selector = ".c-search__clear-button-text"
		let clearResultsCalled
		beforeEach(() => {
			clearResultsCalled = false
			const actions = {
				clearResults: () => (clearResultsCalled = true)
			}
			const store = new Vuex.Store({
				actions
			})
			const Constructor = Vue.extend(UserSearchComponent)
			UserSearch = new Constructor({
				store,
				i18n
			}).$mount()
		})

		it("should exist if search occurred", done => {
			UserSearch.submittedText = "completed"
			UserSearch.searchText = "completed"
			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector)

				expect(btn).not.toBeNull()
				btn.click()
				done()
			})
		})

		it("should clear search when clicked", done => {
			UserSearch.submittedText = "completed"
			UserSearch.searchText = "completed"

			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector)
				btn.click()

				expect(UserSearch.searchText).toBe("")
				expect(UserSearch.submittedText).toBe("")
				expect(clearResultsCalled).toBeTruthy()
				done()
			})
		})
	})
})