import Vue from "vue";
import { i18n } from "i18n";

import EmptyMessageComponent from "../../src/components/EmptyMessage.vue";

describe("EmptyMessage", () => {
	let EmptyMessage;
	beforeAll(() => {
		i18n.locale = "en";
	});

	beforeEach(() => {
		const Constructor = Vue.extend(EmptyMessageComponent);
		EmptyMessage = new Constructor({
		i18n
		}).$mount();
	});

	it("should show nothing if showEmptySearch and showNoUsers are false", done => {
		Vue.nextTick(() => {
		const text = EmptyMessage.$el.textContent;
		expect(text).toBe("");
		done();
		});
	});

	it("should show check spelling if showEmptySearch is true", done => {
		EmptyMessage.showEmptySearch = true;
		EmptyMessage.queryTerm = "missing";
		Vue.nextTick(() => {
		const text = EmptyMessage.$el.textContent;
		expect(text).toContain("No results found for missing.");
		done();
		});
	});

	it("should show no users when showNoUsers is true", done => {
		EmptyMessage.showNoUsers = true;
		Vue.nextTick(() => {
		const text = EmptyMessage.$el.textContent;
		expect(text).toContain("No users found.");
		done();
		});
	});
});
