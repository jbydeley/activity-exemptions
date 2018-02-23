<template>
	<div class="exempt-button-group">
		<button
			class="c-btn"
			v-if="showLoadMore"
			:aria-label="$t('ariaLoadMore')"
			:disabled="isLoading"
			@click="loadMore">
			{{ $t('btnLoadMore') }}
		</button>

		<button
			class="c-btn c-btn--primary"
			:aria-label="$t('ariaExempt')"
			@click="setExempt">
			{{ $t('btnExempt') }}
		</button>

		<button
			class="c-btn"
			:aria-label="$t('ariaUnexempt')"
			@click="setUnexempt">
			{{ $t('btnUnexempt') }}
		</button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'ExemptButtonGroup',
	props: {
		loadMore: {
			type: Function,
			default: () => {}
		},
		showLoadMore: {
			type: Boolean
		},
		setExempt: {
			type: Function,
			default: () => {}
		},
		setUnexempt: {
			type: Function,
			default: () => {}
		}
	},
	computed: mapGetters([
		'isLoading'
	])
}
</script>

<style scoped>
.exempt-button-group {
	display: inline-block;
}
</style>
