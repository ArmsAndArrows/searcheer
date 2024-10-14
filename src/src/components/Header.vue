<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import jsonData from "../assets/answers.json";
import IconSearch from "./Icons/Icon-search.vue";
import IconMic from "./Icons/Icon-mic.vue";

interface Answer {
	title: string;
	answer: string;
}

type SpeechRecognition = any;

declare global {
	interface Window {
		SpeechRecognition: any;
		webkitSpeechRecognition: any;
	}
}

type Emits = {
	(event: "updateFilteredData", data: Answer[]): void;
	(event: "searchTriggered", data: Answer[]): void;
};

const searchQuery = ref<string>("");
const inputEl = ref<HTMLInputElement | null>(null);
const router = useRouter();

watch(searchQuery, (newVal: string) => {
	if (newVal.trim() === "") {
		router.replace("/");
	}
});

const emit = defineEmits<Emits>();

const filteredAnswers = ref<Answer[]>([]);

const flattenedAnswers = Array.from(Object.values(jsonData).flat()) as Answer[];
flattenedAnswers.sort((a, b) => a.title.localeCompare(b.title, "ru"));

onMounted(() => {
	inputEl.value?.focus();
});

const handleSearchClick = () => {
	if (searchQuery.value.length > 1) {
		filteredAnswers.value = flattenedAnswers.filter((answer) => {
			const title = answer.title?.toLowerCase() || "";
			const answerText = answer.answer?.toLowerCase() || "";
			return (
				title.includes(searchQuery.value.toLowerCase()) ||
				answerText.includes(searchQuery.value.toLowerCase())
			);
		});

		emit("updateFilteredData", filteredAnswers.value);
		emit("searchTriggered", filteredAnswers.value);
	} else {
		filteredAnswers.value = [];
		emit("updateFilteredData", filteredAnswers.value);
	}
};

const handleKeyPress = (event: KeyboardEvent) => {
	if (event.key === "Enter") {
		handleSearchClick();
	}
};

// Speech recognition
const startRecognition = () => {
	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;
	if (!SpeechRecognition) {
		alert("Your browser does not support speech recognition.");
		return;
	}

	const recognition = new SpeechRecognition();

	recognition.onstart = () => {
		console.log("Voice recognition started. Speak now...");
	};
	recognition.lang = "ru-RU";
	recognition.onresult = (event: SpeechRecognition) => {
		const transcript: string = event.results[0][0].transcript;
		searchQuery.value = transcript;
		handleSearchClick();
	};

	recognition.onerror = (event: SpeechRecognition) => {
		console.error("Error occurred in recognition:", event.error);
	};

	recognition.start();
};

const shadowHeader = () => {
	const header = document.querySelector(".header") as HTMLElement | null;
	if (header) {
		const shouldAddClass = window.scrollY >= 50;
		header.classList.toggle("scroll-header", shouldAddClass);
	}
};

window.addEventListener("scroll", shadowHeader);
</script>

<template>
	<header class="header">
		<div class="header-inner-container">
			<div class="logo-wrapper">
				<RouterLink to="/">
					<img src="../assets/icons/Logo-searcheer.svg" alt="Logo" />
				</RouterLink>
			</div>
			<div class="searchbar-wrapper">
				<!-- Search button -->
				<button
					@click="handleSearchClick"
					class="searchbar-button searchbar-button--search"
				>
					<IconSearch />
				</button>
				<!-- Input field for search -->
				<input
					v-model="searchQuery"
					ref="inputEl"
					class="searchbar-input-field"
					type="text"
					placeholder="Search..."
					@keypress="handleKeyPress"
				/>
				<!-- Mic button (optional functionality) -->
				<button
					class="searchbar-button searchbar-button--mic"
					@click="startRecognition"
				>
					<IconMic />
				</button>
			</div>
			<div class="link-wrapper">
				<RouterLink to="/puny">puny_counter</RouterLink>
				<RouterLink to="/code">code_utils</RouterLink>
			</div>
		</div>
	</header>
</template>

<style scoped>
header {
	align-items: center;
	background: var(--c-black-main);
	color: var(--c-white-main);
	display: flex;
	height: 12rem;
	justify-content: center;
	padding: 0 2rem;
	position: fixed;
	width: 100%;
	z-index: 1000;
	transition: 0.2s all ease;
}

.header-inner-container {
	align-items: center;
	display: flex;
	gap: 5.4rem;
	max-width: 120rem;
	width: 100%;
}

.logo-wrapper {
	align-items: center;
	display: flex;
	flex-shrink: 1;
	justify-content: center;
	min-width: 10rem;
	user-select: none;
	width: 14.9rem;
}

.searchbar-wrapper {
	background: var(--c-searchbar-bg);
	border-radius: 1.2rem;
	display: flex;
	flex-grow: 1;
	flex-shrink: 0;
	gap: 1.2rem;
	height: 6.4rem;
	justify-content: space-between;
	min-width: 16rem;
	padding: 1.2rem;
}

.searchbar-button--mic {
	stroke: var(--c-blue-a-40);
}

.searchbar-button--search {
	stroke: var(--c-blue-main);
}

.searchbar-wrapper input {
	align-items: center;
	border: none;
	color: var(--c-blue-main);
	display: flex;
	font-size: 3.2rem;
	width: 100%;
}

.searchbar-button {
	max-width: 4rem;
}

.searchbar-button--mic svg:focus,
.searchbar-button--mic svg:hover {
	cursor: pointer;
	stroke: var(--c-blue-main);
}

.searchbar-input-field button {
	display: grid;
	place-items: center;
}

.searchbar-input-field::placeholder {
	color: var(--c-blue-a-40);
	font-size: 3.2rem;
}

.searchbar-input-field:focus::placeholder {
	color: transparent;
}

.link-wrapper {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	justify-content: center;
	width: 14.9rem;
}

.link-wrapper a {
	color: var(--c-blue-main);
	font-family: "Black Han Sans";
	font-size: 1.6rem;
	text-decoration: none;
	user-select: none;
}

.link-wrapper a:hover {
	color: var(--c-green-main);
}

.scroll-header {
	box-shadow: 0px 2px 12px var(--header-shadow);
}

/* @t RULES */
@media screen and (max-width: 940px) {
	.header-inner-container {
		gap: 3rem;
	}

	.searchbar-wrapper {
		flex-shrink: inherit;
	}
}

@media screen and (max-width: 430px) {
	.searchbar-input-field::placeholder {
		font-size: 2.6rem;
	}

	.searchbar-wrapper {
		min-width: 16rem;
	}
}
</style>
