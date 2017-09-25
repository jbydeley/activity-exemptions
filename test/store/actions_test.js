import axios from 'axios'
import moxios from 'moxios'
import sinon from 'sinon'

import actions from 'store/actions'

describe('actions', () => {
	describe('setUnexempt', () => {
		beforeEach(() => {
			moxios.install()
		})

		afterEach(() => {
			moxios.uninstall()
		})

		it('should work', () => {

		})
	})
})