<template>
	<div class="exempt-button-group">
		<d2l-button
			v-if="showLoadMore"
			:aria-label="$t('ariaLoadMore')"
			:disabled="isLoading"
			@click="loadMore">
			{{ $t('btnLoadMore') }}
		</d2l-button>

		<d2l-button primary
			v-if="showExempt"
			:aria-label="$t('ariaExempt')"
			@click="setExempt">
			{{ $t('btnExempt') }}
		</d2l-button>

		<d2l-button
			v-if="showExempt"
			:aria-label="$t('ariaUnexempt')"
			@click="setUnexempt">
			{{ $t('btnUnexempt') }}
		</d2l-button>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'ExemptButtonGroup',
	methods: mapActions(['setExempt', 'setUnexempt', 'loadMore']),
	props: {
		showLoadMore: {
			type: Boolean
		},
		showExempt: {
			type: Boolean
		},
		showUnexempt: {
			type: Boolean
		},
		isLoading: {
			type: Boolean
		}
	}
}
</script>

<style scoped>
.exempt-button-group {
	display: inline-block;
}
</style>
