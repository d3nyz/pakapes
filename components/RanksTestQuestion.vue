<script setup lang="ts">
import { computed } from 'vue';
import type { Rank } from "~/assets/types/rank";
import type { RanksOptions } from '~/assets/types/ranksOptions';

const props = defineProps<{ 
  rank: Rank, 
  ranksType: RanksOptions['type'],
  unansweredRanksCount: number,
}>();
const emit = defineEmits([
  'incraseQuestionIndex', 
  'updateAnswerInput',
  'showResult', 
  'updateUnansweredRanksCount'
]);

const imagePath = computed(() => {
  if (props.ranksType === 'navy') {
    return '/images/navy/ribbon-'
  } else {
    return '/images/ribbon-'
  }
})

function updateAnswerInput() {
  emit('updateAnswerInput', props.rank.input);
  emit('updateUnansweredRanksCount');
  removeErrorClass();
}
function removeErrorClass() {
  const answerInput = document.getElementById('answer-input');
  answerInput?.classList.remove('error');
}
function showNext() {
  if (props.rank.input !== '') {
    if (props.unansweredRanksCount > 0) {
      emit('incraseQuestionIndex');
    } else {
      emit('showResult');
    }
  } else {
    const answerInput = document.getElementById('answer-input');
    answerInput?.classList.add('error');
    answerInput?.focus();
  }
}
</script>

<template>
  <div v-if="rank" class="question"> 
    <p class="question-text">Kas šī ir par pakāpi?</p>
    <p class="question-text">
      <img 
        :src="imagePath + rank.code.toLowerCase() + '.png'" 
        :alt="rank.code + ' uzšuves attēls'"
      />
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