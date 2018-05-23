import Vue from "vue";
import Vuex from "vuex";
import { i18n } from "i18n";

import UserSearchComponent from "../../src/components/UserSearch.vue";

describe("UserSearch", () => {
	let UserSearch;
	beforeAll(() => {
		i18n.locale = "en";
		Vue.use(Vuex);
	});

	describe("search icon", () => {
		let selector = ".vui-input-search-button";
		let searchUsersParam;
		beforeEach(() => {
			searchUsersParam = "";
			const actions = {
				searchUsers: ({}, text) => (searchUsersParam = text)
			};

			const getters = {
				showNoUsers: state => false,
				showSearchButton: state => searchText =>
					!searchUsersParam || searchText !== searchUsersParam,
				showClearButton: state => false
			};
			const store = new Vuex.Store({
				actions,
				getters
			});
			const Constructor = Vue.extend(UserSearchComponent);
			UserSearch = new Constructor({
				store,
				i18n
			}).$mount();
			console.log("Mounted");
		});

		it("should exist by default", done => {
			Vue.nextTick(() => {
				console.log(UserSearch.$el);
				const btn = UserSearch.$el.querySelector(selector);
				expect(btn).not.toBeNull();
				done();
			});
		});

		it("should exist when text entered", done => {
			searchUsersParam = "to search";

			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector);
				expect(btn).not.toBeNull();
				done();
			});
		});

		it("should not exist when search performed and text unchanged", done => {
			searchUsersParam = "completed";
			UserSearch.searchText = "completed";
			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector);
				expect(btn).toBeNull();
				done();
			});
		});

		it("should set submittedText and call searchUsers with term", done => {
			UserSearch.searchText = "completed";
			searchUsersParam = "";
			const btn = UserSearch.$el.querySelector(selector);
			btn.click();
			Vue.nextTick(() => {
				expect(UserSearch.searchText).toBe("completed");
				expect(searchUsersParam).toBe("completed");
				expect(searchUsersParam).toBe("completed");
				done();
			});
		});
	});

	describe("clear icon", () => {
		const selector = ".vui-input-search-clear-button";
		let searchUsersParam;
		let clearResultsCalled;
		beforeEach(() => {
			clearResultsCalled = false;
			const actions = {
				clearResults: () => (clearResultsCalled = true)
			};

			const getters = {
				showNoUsers: state => false,
				showSearchButton: state => searchText =>
					!searchUsersParam || searchText !== searchUsersParam,
				showClearButton: state => searchUsersParam != ""
			};

			const store = new Vuex.Store({
				actions,
				getters
			});

			const Constructor = Vue.extend(UserSearchComponent);
			UserSearch = new Constructor({
				store,
				i18n
			}).$mount();
		});

		it("should not exist by default", done => {
			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector);
				expect(btn).toBeNull();
				done();
			});
		});

		it("should not exist if search performed and text changed", done => {
			searchUsersParam = "completed";
			UserSearch.searchText = "changed";
			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector);
				expect(btn).toBeNull();
				done();
			});
		});

		it("should exist if search performed and text unchanged", done => {
			UserSearch.searchText = "completed";
			searchUsersParam = "completed";

			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector);
				expect(btn).not.toBeNull();
				done();
			});
		});
	});

	describe("clear button", () => {
		let selector = ".clear-results-button";
		let searchUsersParam;
		let clearResultsCalled;
		beforeEach(() => {
			clearResultsCalled = false;
			const actions = {
				clearResults: () => (clearResultsCalled = true)
			};

			const getters = {
				showNoUsers: state => false,
				showSearchButton: state => searchText =>
					!searchUsersParam || searchText !== searchUsersParam,
				showClearButton: state => searchUsersParam != ""
			};

			const store = new Vuex.Store({
				actions,
				getters
			});

			const Constructor = Vue.extend(UserSearchComponent);
			UserSearch = new Constructor({
				store,
				i18n
			}).$mount();
		});

		it("should exist if search occurred", done => {
			searchUsersParam = "completed";
			UserSearch.searchText = "completed";
			Vue.nextTick(() => {
				const btn = UserSearch.$el.querySelector(selector);

				expect(btn).not.toBeNull();
				btn.click();
				done();
			});
		});
	});
});
