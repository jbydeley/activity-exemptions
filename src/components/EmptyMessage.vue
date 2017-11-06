<template>
	<div>
		<div class="no-results" v-if="showEmptySearch">
			<div class="not-found" v-html="$t('lblNoResultsFound', {queryTerm})"></div>
			<div>{{ $t('lblCheckSpelling') }}</div>
		</div>
		<div class="no-results" v-else-if="showNoUsers">
			<div class="not-found">{{ $t('lblNoUsers') }}</div>
			<div>{{ $t('lblNoPermission') }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'EmptyMessage',
		props: {
			queryTerm: String,
			showEmptySearch: Boolean,
			showNoUsers: Boolean
		}
	}
</script>

<style scoped>
.no-results {
  margin: 21px 0;
}

.not-found {
  font-size: 23px;
  padding-bottom: 21px;
}
</style>
