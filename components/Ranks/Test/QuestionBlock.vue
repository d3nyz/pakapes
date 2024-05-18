<script setup lang="ts">
import type { Rank, RanksOptions } from "~/assets/types/rank";

const props = defineProps({ 
  rank: {
    type: Object as PropType<Rank>,
    required: true
  }, 
  ranksType: {
    type: String as PropType<RanksOptions['type']>,
    default: 'general'
  },
  unansweredRanksCount: {
    type: Number,
    required: true
  }
});

const emit = defineEmits([
  'increaseQuestionIndex', 
  'updateAnswerInput',
  'showResult', 
  'updateUnansweredRanksCount'
]);

const imagePath = computed<string>(() => {
  return getImagePath(props.ranksType);
});

function updateAnswerInput (): void {
  emit('updateAnswerInput', props.rank.input);
  emit('updateUnansweredRanksCount');
  removeErrorClass();
};
function removeErrorClass(): void {
  const answerInput: HTMLElement | null = document.getElementById('answer-input');
  answerInput?.classList.remove('error');
};
function showNext(): void {
  if (props.rank.input !== '') {
    if (props.unansweredRanksCount > 0) {
      emit('increaseQuestionIndex');
    } else {
      emit('showResult');
    }
  } else {
    const answerInput: HTMLElement | null = document.getElementById('answer-input');
    answerInput?.classList.add('error');
    answerInput?.focus();
  }
};
</script>

<template>
  <div v-if="rank" class="question"> 
    <p class="question-text">Kas šī ir par pakāpi?</p>
    <p class="question-text question-image-container">
      <Transition name="scale" mode="out-in">
        <img 
          :src="imagePath + rank.code.toLowerCase() + '.png'" 
          :alt="rank.code + ' uzšuves attēls'"
          :key="rank.sort"
        />
      </Transition>
    </p>
    <input 
      v-model.trim="rank.input"   
      id="answer-input" 
      class="answer-input" 
      type="text" 
      focusable
      minlength="1"
      maxlength="25"
      pattern="[a-zA-ZāĀčČēĒģĢīĪķĶļĻņŅšŠūŪžŽ ]*"
      placeholder="Ievadiet pakāpi..."
      @keyup.enter="showNext()"
      @input="updateAnswerInput()"
    />
    <input 
      v-if="unansweredRanksCount > 0" 
      class="button" 
      type="button" 
      value="Nākamais" 
      accesskey="enter" 
      @click="showNext()" 
    />
    <input 
      v-else 
      class="button" 
      type="button" 
      value="Rezultāts" 
      accesskey="enter" 
      @click="$emit('showResult');" 
    />
  </div>
</template>

<style>
.question-image-container {
  min-height: 2.1875rem;
}
</style>