import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

export const i18n = new VueI18n({
	locale: 'en',
	messages: {
		en: {
			ariaExempt: 'Exempt selected users',
			ariaLoadMore: 'Load additional users',
			ariaSelectUnselectAll: 'Select / Unselect all',
			ariaSelectExemptUser: 'Select {fullName} exempt',
			ariaSelectNotExemptUser: 'Select {fullName} not exempt',
			ariaTableSummary: 'The list of users that can have their exemption status modified.',
			ariaUnexempt: 'Unexempt selected users',
			lblExempt: 'Exempt',
			lblNotExempt: 'Not Exempt',
			lblExemptionCount: 'Exemptions: {exemptionCount}',
			lblLastFirstName: 'Last Name, First Name',
			lblExemptStatus: 'Exempt Status',
			btnExempt: 'Exempt',
			btnUnexempt: 'Unexempt',
			btnLoadMore: 'Load More...',
			toastExempt: 'Saved successfully. Nothing saved | Saved successfully. 1 user exempted. | Saved successfully. {count} users exempted.',
			toastUnexempt: 'Saved successfully. Nothing saved | Saved successfully. 1 user unexempted. | Saved successfully. {count} users unexempted.',
			toastCouldNotLoad: 'Could not load activity exemption data',
		}
	}
})