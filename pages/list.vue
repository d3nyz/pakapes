<script setup lang="ts">
import { computed } from 'vue';

import { ranks } from '~/data/Ranks';
import { ranksNavy } from '~/data/RanksNavy';

useHead ({
  title: 'NBS dienesta pakāpes - Saraksts'
})

const ranksType = ref('general');
const ranksListStyle = ref('flex');
const showHeaders = ref(true);
const showOptions = ref(true);

const currentRanks = computed(() => {
  let ranksToReturn = [];
  if (ranksType.value === 'navy') {
    ranksToReturn = ranksNavy.value;
  } else {
    ranksToReturn = ranks.value;
  }
  ranksToReturn.sort((a, b) => a.sort - b.sort);
  return ranksToReturn;
})

</script>

<template>
  <div class="content-wrapper">
    <h2 class="content-heading">Nacionālo bruņoto spēku dienesta pakāpes</h2>
    <div class="content">
      <div class="options-wrapper">
        <label 
          @click="showOptions = !showOptions" 
          @keyup.enter="showOptions = !showOptions" 
          class="options-toggle" 
          :class="{ 'options-toggle-closed': !showOptions } " 
          tabindex="0">
          <span>▲</span>Attēlošanas opcijas
        </label>
        <div class="options-container" :class="{ 'options-container-hidden': !showOptions }">
          <div>
            <div class="options-container-item">
              <div class="select-container">
                <label for="ranks-type" class="select-container-label">Pakāpju veids</label>
                <select v-model="ranksType" name="ranks-type" id="ranks-type">
                  <option value="general">Vispārējās</option>
                  <option value="navy">Jūras spēku</option>
                </select>
              </div>
            </div>
            <div class="options-container-item">
              <div class="select-container">
                <label for="ranks-list-style" class="select-container-label">Attēlošanas veids</label>
                <select v-model="ranksListStyle" name="ranks-list-style" id="ranks-list-style">
                  <option value="flex">Saraksts</option>
                  <option value="table">Tabula</option>
                </select>
              </div>
            </div>
            <div v-if="ranksListStyle === 'flex'" class="options-container-item">
              <label class="checkbox">Rādīt virsrakstus
                <input v-model="showHeaders" type="checkbox" @keyup.enter="showHeaders = !showHeaders"/>
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <RanksListFlex v-if="ranksListStyle === 'flex'" :ranks="currentRanks" :ranksType="ranksType" :showHeaders="showHeaders" />
      <RanksListTable v-else :ranks="currentRanks" :ranksType="ranksType" />
    </div>
  </div>
</template>

<style>
.expand-enter-active,
.expand-leave-active {
  transition: height 1s ease-in-out;
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
</style>