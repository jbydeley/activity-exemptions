<template>
	<div class="c-search">
		<!--
		This innocent looking form is needed because Release Conditions contains
		a form element that traps the enter key forcing the Release Condition
		creation dialog to appear when the user presses enter.
		-->
		<form onsubmit="return false;" @keydown.enter.prevent>
			<input
				class="c-search__input"
				v-model="searchText"
				type="search"
				maxlength="60"
				:placeholder="$t('lblSearchPlaceholder')"
				@keyup.enter.prevent="searchUsers"
				spellcheck="false"
				autocomplete="off">

			<button
				v-if="showSearchButton"
				:aria-label="$t('ariaSearchButton')"
				class="c-search__search-button"
				@keyup.enter.prevent="searchUsers"
				@click="searchUsers">
			</button>

			<button
				v-else
				:aria-label="$t('btnClearSearch')"
				class="c-search__clear-button"
				@keyup.enter.prevent="clearResults"
				@click="clearResults">
			</button>
		</form>

		<button v-if="submittedText" class="c-search__clear-button-text" @click="clearResults">{{ $t('btnClearSearch') }}</button>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'UserSearch',
	data() {
		return {
			searchText: '',
			submittedText: ''
		}
	},
	computed: {
		showSearchButton() {
			if( !this.submittedText ) {
				return true
			}

			return this.submittedText !== this.searchText
		}	
	},
	methods: {
		clearResults() {
			this.searchText = ''
			this.submittedText = ''
			this.$store.dispatch('clearResults')
		},
		searchUsers() {
			this.submittedText = this.searchText
			this.$store.dispatch('searchUsers', this.searchText)
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../css/_colors';

.c-search {
	position: absolute;
	float: right;
	right: 7px;

	[dir="rtl"] & {
		left: 7px;
		right: auto;
	}

	@at-root #{&}__input {
		border-radius: 0.3rem;
		border-style: solid;
		box-sizing: border-box;
		display: inline-block;
		height: auto;
		margin: 0;
		vertical-align: middle;
		width: 100%;
		transition-duration: 0.5s;
		transition-timing-function: ease;
		transition-property: background-color, border-color;
		color: $d2l-color-ferrite;
		font-family: inherit;
		font-size: 0.95rem;
		font-weight: 400;
		letter-spacing: 0.01rem;
		line-height: 1.4rem;
		appearance: none;
		-webkit-appearance: textfield;
		padding: calc(0.3rem - 1px) calc(1rem - 1px);
		background-color: $d2l-color-white;
		border-color: $d2l-color-mica;
		border-width: 2px;
		box-shadow: inset 0 2px 0 0 rgba(185, 194, 208, 0.2);
		
		&::placeholder {
			color: $d2l-color-mica;
		}

		&:hover,
		&:focus {
			border-color: $d2l-color-celestine;
			border-width: 2px;
			outline-width: 0;
		}

		&::-webkit-search-cancel-button,
		&::-ms-clear {
			display: none;
			width: 0;
			height: 0;
		}
	}

	@at-root #{&}__search-button {
			border: none;
			background-color: transparent;
			background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%2F%3E%3Cpath%20d%3D%22M10.384%2015.764l-.46.46a2.5%202.5%200%200%201-.712%202.126l-2.818%202.82a2.498%202.498%200%200%201-3.54.004%202.502%202.502%200%200%201%20.004-3.54l2.82-2.82c.58-.58%201.373-.82%202.126-.713l.46-.457a7.5%207.5%200%200%201%206.257-11.636c4.143%200%207.5%203.357%207.5%207.5a7.5%207.5%200%200%201-11.636%206.257zm4.137-.757a5.5%205.5%200%201%200%200-11%205.5%205.5%200%200%200%200%2011z%22%20fill%3D%22%23565a5c%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
			background-position: right center;
			background-repeat: no-repeat;
			cursor: pointer;
			height: 1.2rem;
			margin: 0;
			opacity: 0.7;
			padding: 0;
			position: absolute;
			right: 0.5rem;
			text-indent: -10000px;
			top: 0.45rem;
			width: 1.3rem;
			outline: none;

			[dir="rtl"] & {
				left: 0.5rem;
				right: auto;
			}
		}

		@at-root #{&}__clear-button {
			border: none;
			background-color: transparent;
			background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%200h24v24H0z%22%2F%3E%3Cpath%20d%3D%22M12%209.88l5.438-5.437a1.494%201.494%200%200%201%202.123-.003c.59.59.584%201.535-.003%202.123L14.12%2012l5.437%205.438a1.498%201.498%200%201%201-2.118%202.12L12%2014.12l-5.437%205.437a1.494%201.494%200%200%201-2.123.004%201.496%201.496%200%200%201%20.003-2.122L9.88%2012%204.444%206.563A1.496%201.496%200%200%201%204.44%204.44a1.495%201.495%200%200%201%202.123.003L12%209.88z%22%20fill%3D%22%23565a5c%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
			background-position: right center;
			background-repeat: no-repeat;
			cursor: pointer;
			height: 1.2rem;
			margin: 0;
			opacity: 0.7;
			padding: 0;
			position: absolute;
			right: 0.5rem;
			text-indent: -10000px;
			top: 0.45rem;
			width: 1.3rem;

			[dir="rtl"] & {
				left: 0.5rem;
				right: auto;
			}
		}

	@at-root #{&}__clear-button-text {
		background: none!important;
		color: inherit;
		border: none;
		padding: 0!important;
		font: inherit;
		cursor: pointer;
		color: $d2l-color-celestine;
		text-decoration: underline;
		font-size: .9rem;
		float: right;

		[dir="rtl"] & {
			float: left;
		}

		&::-moz-focus-inner {
			outline: none;
		}

		&:hover {
			background-color: $d2l-color-celestine-minus-1;
		}

		&:focus {
			border-color: rgba(0, 111, 191, 0.4);
			box-shadow: 0 0 0 4px rgba(0, 111, 191, 0.3);
		}
	}
}
</style>
