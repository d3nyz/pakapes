<script setup lang="ts">
import { computed } from 'vue';

import ranks from '~/data/Ranks';
import ranksNavy from '~/data/RanksNavy';

import type { Rank } from '~/assets/types/rank';
import type { RanksOptions } from '~/assets/types/ranksOptions';

useHead ({
  title: 'NBS dienesta pakāpes - Saraksts'
})

const ranksType: Ref<RanksOptions['type']> = ref('general');
const ranksListStyle: Ref<RanksOptions['listStyle']> = ref('flex');
const showHeaders: Ref<RanksOptions['showHeaders']> = ref(true);
const showOptions: Ref<boolean> = ref(true);

const currentRanks: Ref<Rank[]> = computed(() => {
  let ranksToReturn = [];
  if (ranksType.value === 'navy') {
    ranksToReturn = ranksNavy.ranksNavy;
  } else {
    ranksToReturn = ranks.ranks;
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
          <span>▼</span>Attēlošanas opcijas
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
      <RanksListFlex 
        v-if="ranksListStyle === 'flex'" 
        :ranks="currentRanks" 
        :ranksType="ranksType" 
        :showHeaders="showHeaders" 
      />
      <RanksListTable 
        v-else 
        :ranks="currentRanks" 
        :ranksType="ranksType" 
      />
    </div>
  </div>
</template>