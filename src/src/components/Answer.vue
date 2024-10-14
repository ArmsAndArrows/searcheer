<script setup lang="ts">
import { ref, computed } from "vue";
import IconChevron from "./Icons/Icon-chevron.vue";
import IconClipboard from "./Icons/Icon-clipboard.vue";

interface Answer {
  title: string,
  answer: string;
}

const props = defineProps<{
  answer: Answer;
}>();

const isExpanded = ref<boolean>(false);

const toggleChevron = (): void => {
  isExpanded.value = !isExpanded.value;
};

const textToCopy = computed<string>(() => props.answer.answer);

const copyToClipboard = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(textToCopy.value);
    console.log("Text copied to clipboard!");
  } catch (err) {
    console.error("Could not copy text: ", err);
  }
};

const formattedAnswer = computed<string>(() => {
  return props.answer.answer.replace(/\n/g, "<br>");
});
</script>

<template>
  <div class="answer">
    <div class="answer-top-part">
      <p class="answer-title">{{ props.answer.title }}</p>
      <div class="answer-buttons-container">
        <button class="answer-btn-copy" @click="copyToClipboard">
          <IconClipboard /><span>Copy</span>
        </button>
        <button @click="toggleChevron" class="answer-btn-chevron">
          <IconChevron :class="{ 'icon-rotate': true, 'icon-rotate-180': isExpanded }" />
        </button>
      </div>
    </div>
    <div v-if="isExpanded" class="answer-btm-part">
          <span v-html="formattedAnswer"></span>
    </div>
  </div>
</template>

<style scoped>
.answer {
  display: grid;
  gap: 2.4rem;
  padding-bottom: 2.4rem;
  border-bottom: 1px solid var(--c-gray-a-50);
  width: 100%;
}

.answer:last-of-type {
  border-bottom: none;
}

.answer-top-part {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.answer-title {
  font-size: 3.2rem;
  font-weight: bold;
  
}

.answer-buttons-container {
  display: flex;
  justify-content: space-between;
  min-width: 20rem;

  gap: 0.8rem;
}

.answer-buttons-container button > svg {
  width: 2rem;
}

.answer-buttons-container button:hover {
  background: var(--с-answer-button);
  cursor: pointer;
}

.answer-buttons-container button:active {
  background: var(--с-answer-button);
  color: var(--с-answer-button);
  transition: none;
}

.answer-buttons-container button:active > svg {
  stroke: var(--с-answer-button);
}

.answer-btn-copy,
.answer-btn-chevron {
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--c-gray-a-50);
  border-radius: 0.8rem;
  width: 4rem;
  height: 4rem;
  padding: 1rem;
}
.icon-rotate {
  rotate: 0deg;
  transition: rotate 0.2s linear;
}
.icon-rotate-180 {
  rotate: 180deg;
  transition: rotate 0.2s ease;
}
.answer-btn-copy {
  flex-grow: 1;
}
.answer-btn-copy {
  gap: 0.8rem;
}

.answer-btn-copy span {
  font-size: 2rem;
  font-family: "Black Han Sans", Inter;
}

.answer-btm-part span {
  font-size: 2.2rem;
  color: var(--c-white-a-80);
}

svg {
  stroke: var(--c-white-main);
}

@media screen and (max-width: 430px) {
  .answer-title{
    text-decoration: underline;
  }
  .answer-top-part {
    flex-direction: column;
    justify-self: center;
    align-items: stretch;
    width: 100%;
    gap: 3.2rem;
  }

}
</style>