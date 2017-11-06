<template>
	<div class="vui-input-search-container">
		<!--
		This innocent looking form is needed because Release Conditions contains
		a form element that traps the enter key forcing the Release Condition
		creation dialog to appear when the user presses enter.
		-->
		<form onsubmit="return false;" @keydown.enter.prevent>
			<input
				v-model="searchText"
				type="search"
				maxlength="60"
				:placeholder="$t('lblSearchPlaceholder')"
				v-if="!showNoUsers"
				@keyup.enter.prevent.stop="searchUsers(searchText)"
				ref="searchInput"
				spellcheck="false"
				autocomplete="off">

			<button
				v-if="showSearchButton(searchText)"
				:aria-label="$t('ariaSearchButton')"
				class="vui-input-search-button"
				@keypress.space.enter.prevent="searchUsers(searchText)"
				@click="searchUsers(searchText)">
			</button>

			<button
				v-else-if="!showNoUsers"
				:aria-label="$t('btnClearSearch')"
				class="vui-input-search-clear-button"
				@keypress.space.enter.prevent="searchUsers(searchText)"
				@click="clearResults">
			</button>
		</form>

		<div class="clear-results-container">
			<button v-if="showClearButton" class="clear-results-button" @click="clearResults">{{ $t('btnClearSearch') }}</button>
		</div>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'UserSearch',
	data() {
		return {
			searchText: ''
		}
	},
	computed: mapGetters([
		'showNoUsers',
		'showSearchButton',
		'showClearButton'
	]),
	methods: {
		...mapActions(['searchUsers']),
		clearResults() {
			this.searchText = ''
			this.$store.dispatch('clearResults')
		}
	}
}
</script>

<style src="../css/user-search.css" scoped></style>
