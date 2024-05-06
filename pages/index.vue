<script setup lang="ts">
import { ref } from 'vue'

import ranks from '~/data/Ranks'
import ranksNavy from '~/data/RanksNavy';

import type { Rank } from '~/assets/types/rank';
import type { RanksOptions } from '~/assets/types/ranksOptions';

useHead ({
  title: 'NBS dienesta pakāpes - Tests'
})

const ranksType: Ref<RanksOptions['type']> = ref('general');
const state: Ref<string> = ref('intro');
const unansweredRanksCount = ref(0);
const currentQuestionIndex = ref(0);

const currentRanks: Ref<Rank[]> = computed(() => {
  let ranksToReturn: Rank[] = [];
  if (ranksType.value === 'navy') {
    ranksToReturn = ranksNavy.ranksNavy;
  } else {
    ranksToReturn = ranks.ranks;
  }
  return ranksToReturn;
})

function startTest() {
  currentRanks.value.forEach(r => r.input = '')
  currentRanks.value.sort(() => Math.random() - 0.5);
  currentQuestionIndex.value = 0;
  unansweredRanksCount.value = currentRanks.value.length;
  state.value = 'question'
}
function incraseQuestionIndex() {
  currentQuestionIndex.value++
}
function updateUnansweredRanksCount() {
  unansweredRanksCount.value = currentRanks.value.filter(r => r.input === '').length
}
function showResult() {
  currentRanks.value.sort((a, b) => a.sort - b.sort);
  state.value = 'result'
}
</script>

<template>
  <div class="content-wrapper">
    <h2 class="content-heading">Nacionālo bruņoto spēku dienesta pakāpju tests</h2>
    <Transition name="blur" mode="out-in">
      <div v-if="state === 'question'" class="content">
        <RanksTestQuestion 
          :rank="currentRanks[currentQuestionIndex]" 
          :ranksType="ranksType" 
          :unansweredRanksCount="unansweredRanksCount" 
          @incraseQuestionIndex="incraseQuestionIndex"
          @updateAnswerInput="currentRanks[currentQuestionIndex].input = $event"
          @updateUnansweredRanksCount="updateUnansweredRanksCount()"
          @showResult="showResult"
        /> 
      </div>
      <div v-else-if="state === 'result'" class="content">
        <RanksTestResultTable 
          :ranks="currentRanks" 
          :ranksType="ranksType" 
        />
        <input class="button" type="button" value="Uz sākumu" accesskey="enter" @click="state = 'intro'"/>
      </div>
      <div v-else class="content">
        <p>Šī testa mērķis ir palīdzēt kandidātam iemācīties atšķirt NBS dienesta pakāpes.</p>
        <div class="test-options">
          <div class="select-container">
            <label for="ranks-type" class="select-container-label">Pakāpju veids</label>
            <select v-model="ranksType" name="ranks-type" id="ranks-type">
              <option value="general">Vispārējās</option>
              <option value="navy">Jūras spēku</option>
            </select>
          </div>
        </div>
        <input class="button" type="button" value="Sākt" accesskey="enter" @click="startTest()"/>
      </div>
    </Transition>
  </div>
</template>

<style>
.blur-enter-active,
.blur-leave-active {
  transition: all 0.3s ease-in-out;
}
.blur-enter-from,
.blur-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>