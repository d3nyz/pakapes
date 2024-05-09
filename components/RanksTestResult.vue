<script setup lang="ts">
import type { Rank } from "~/assets/types/rank";
import type { RanksOptions } from "~/assets/types/ranksOptions";

const ranksListStyle: Ref<RanksOptions['listStyle']> = ref('flex');
const showHeaders: Ref<RanksOptions['showHeaders']> = ref(true);
const showOptions: Ref<boolean> = ref(true);

const props = defineProps<{
  ranks: Rank[],
  ranksType: RanksOptions['type']
}>();
</script>

<template>
  <div class="ranks-test-result">
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
      <Transition name="blur" mode="out-in" tag="div" class="ranks-test-result-container">
        <RanksTestResultFlex v-if="ranksListStyle === 'flex'" :ranks="props.ranks" :ranksType="props.ranksType" :showHeaders="showHeaders"/>
        <RanksTestResultTable
          v-else
          :ranks="props.ranks" 
          :ranksType="props.ranksType" 
        />
      </Transition>
  </div>
</template>