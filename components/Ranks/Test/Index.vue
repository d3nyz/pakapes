<script setup lang="ts">
import type { Rank, RanksOptions } from '~/assets/types/rank';

import ranks from '~/data/Ranks'
import ranksNavy from '~/data/RanksNavy';
const ranksType: Ref<RanksOptions['type']> = ref('general');
const currentRanks = computed<Rank[]>(() => {
  if (ranksType.value === 'navy') {
    return ranksNavy;
  } else {
    return ranks;
  }
});

type TestState = 'intro' | 'question' | 'result';
const state: Ref<TestState> = ref('intro');

const unansweredRanksCount: Ref<number> = ref(0);
const currentQuestionIndex: Ref<number> = ref(0);
function startTest() {
  currentRanks.value.forEach(r => r.input = '');
  currentRanks.value.sort(() => Math.random() - 0.5);
  currentQuestionIndex.value = 0;
  unansweredRanksCount.value = currentRanks.value.length;
  state.value = 'question';
};
function increaseQuestionIndex() {
  currentQuestionIndex.value++;
}
function updateUnansweredRanksCount() {
  unansweredRanksCount.value = currentRanks.value.filter(r => r.input === '').length;
};
function showResult() {
  currentRanks.value.sort((a, b) => a.sort - b.sort);
  state.value = 'result';
};
</script>

<template>
  <div class="ranks-test content">
    <Transition name="blur" mode="out-in">
      <RanksTestQuestionBlock
        v-if="state === 'question'"
        :rank="currentRanks[currentQuestionIndex]" 
        :ranksType="ranksType" 
        :unansweredRanksCount="unansweredRanksCount" 
        @increaseQuestionIndex ="increaseQuestionIndex"
        @updateAnswerInput="currentRanks[currentQuestionIndex].input = $event"
        @updateUnansweredRanksCount="updateUnansweredRanksCount"
        @showResult="showResult"
      /> 
      <RanksTestResultBlock
        v-else-if="state === 'result'"
        :ranks="currentRanks" 
        :ranksType="ranksType"
        @setState="state = $event"
      />
      <RanksTestIntroBlock
        v-else
        :ranksType="ranksType"
        @updateRanksType="ranksType = $event"
        @startTest="startTest"
        />
    </Transition>
  </div>
</template>