<script setup lang="ts">
import {watchEffect, ref} from 'vue'
import {ranks} from '@/data/Ranks'

useHead ({
  title: 'NBS dienesta pakāpes - Tests'
})

const state: Ref<string> = ref('intro')
let unansweredRanksCount = 0
const currentQuestionIndex = ref(0);

watchEffect(() => {
  unansweredRanksCount = ranks.value.filter(r => r.input === '').length
});

function startTest() {
  ranks.value.forEach(r => r.input = '')
  ranks.value.sort(() => Math.random() - 0.5);
  currentQuestionIndex.value = 0;
  state.value = 'question'
}
function showNext() {
  if (currentQuestionIndex.value < ranks.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    showResult();
  }
}
function showResult() {
  ranks.value.sort((a, b) => a.sort - b.sort);
  state.value = 'result'
}
</script>

<template>
  <div class="content-wrapper">
    <h2 class="content-heading">Nacionālo bruņoto spēku dienesta pakāpju tests</h2>
    <Transition name="blur" mode="out-in">
      <div v-if="state === 'question'" class="content">
        <div class="question"> 
          <p class="question-text">Kas šī ir par pakāpi?</p>
          <p class="question-text"><img :src="'/images/ribbon-' + ranks[currentQuestionIndex].code.toLowerCase() + '.png'" :alt="ranks[currentQuestionIndex].code + ' uzšuves attēls'"/></p>
          <input class="answer-input" type="text" v-model.trim="ranks[currentQuestionIndex].input" focusable @keypress="e => e.key === 'Enter' && showNext()"/>
          <input v-if="unansweredRanksCount > 0" class="button" type="button" value="Nākamais" accesskey="enter" @click="showNext()" />
          <input v-else class="button" type="button" value="Rezultāts" accesskey="enter" @click="showResult()" />
        </div>
      </div>
      <div v-else-if="state === 'result'" class="content">
        <table class="list-table">
          <tr>
            <th>Uzšuve</th>
            <th>Pakāpe</th>
            <th>Atbilde</th>
          </tr>
          <tr v-for="rank in ranks">
            <td><img :src="'/images/ribbon-' + rank.code.toLowerCase() + '.png'" :alt="rank.code + ' uzšuves attēls'"/></td>
            <td>{{ rank.name }}</td>
            <td>{{ rank.input }} 
              <label v-if="rank.input.toLowerCase() === rank.name.toLowerCase()" class="result-correct">&check;</label>
              <label v-else class="result-incorrect">&cross;</label>
            </td>
          </tr>
        </table>
        <input class="button" type="button" value="Uz sākumu" accesskey="enter" @click="state = 'intro'"/>
      </div>
      <div v-else class="content">
        <p>Šī testa mērķis ir palīdzēt kandidātam iemācīties atšķirt NBS dienesta pakāpes.</p>
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