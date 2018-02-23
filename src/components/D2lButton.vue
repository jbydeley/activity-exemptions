<template>
	<button
		class="d2l-button" :class="{ primary }">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: 'D2lButton',
	props: {
		primary: {
			type: Boolean
		}
	}
}
</script>

<style src="../css/button.css" scoped></style>
