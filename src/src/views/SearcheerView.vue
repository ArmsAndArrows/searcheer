<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Header from "@/components/Header.vue";
import Answer from "@/components/Answer.vue";
import Punycounter from "@/components/Punycounter.vue";
import CodeInjection from "@/components/CodeInjection.vue";

const parentFilteredData = ref([]);
const route = useRoute();

const updateFilteredData = (filteredData) => {
	if (filteredData && filteredData.length > 0) {
		parentFilteredData.value = filteredData;
	} else {
		parentFilteredData.value = [];
	}
};

watch(route, () => {
	parentFilteredData.value = [];
});
</script>

<template>
	<Header @updateFilteredData="updateFilteredData" />

	<main>
		<div
			v-if="parentFilteredData.length"
			class="answers-wrapper fancy-shadow"
		>
			<Answer
				v-for="(answer, index) in parentFilteredData"
				:key="index"
				:answer="answer"
			/>
		</div>

		<div class="empty-box" v-else-if="route.path === '/'">
			<h1>Start searching</h1>
		</div>

		<!-- Puny Counter page -->
		<div class="busy-box" v-else-if="route.path === '/puny'">
			<Punycounter />
		</div>

		<!-- Code Injection page -->
		<div class="busy-box" v-else-if="route.path === '/code'">
			<CodeInjection />
		</div>

		<!-- Links page -->
		<div class="busy-box" v-else-if="route.path === '/links'">
			<CodeInjection />
		</div>
	</main>
</template>

<style scoped>
main {
	background-image: var(--c-bg);
	background-position: fixed;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.answers-wrapper {
	align-self: center;
	background: var(--c-black-main);
	border: 1px solid var(--c-border);
	border-radius: 1.2rem;
	color: var(--c-white-main);
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	margin: var(--cont-wrap-marg-top) 4rem 4rem;
	padding: 3.2rem;
	width: 79.2rem;
}

.busy-box {
	margin: var(--cont-wrap-marg-top) 4rem 4rem;
	display: flex;
	justify-content: center;
}

h1 {
	color: var(--c-blue-a-40);
	font-size: 6rem;
	font-weight: 300;
	letter-spacing: 1rem;
	text-align: center;
	user-select: none;
}

.empty-box {
	display: grid;
	place-content: center;
	height: 100vh;
}

/* @t RULES */
@media screen and (max-width: 940px) {
	.answers-wrapper {
		gap: 6rem;
		padding: 4.8rem;
		width: 90vw;
	}

	.header-inner-container {
		gap: 3rem;
	}

	.searchbar-input-field::placeholder {
		font-size: 2.6rem;
	}

	.searchbar-wrapper {
		flex-shrink: inherit;
		min-width: 16rem;
		width: 80vw;
	}
}
</style>
