<script setup lang="ts">
import ranks from '~/data/Ranks';
import ranksNavy from '~/data/RanksNavy';

import type { Rank, RanksOptions, RanksPage } from '~/assets/types/rank';

useHead ({
  title: 'NBS dienesta pakāpes - Saraksts'
})

const ranksType: Ref<RanksOptions['type']> = ref('general');
const ranksDisplayStyle: Ref<RanksOptions['displayStyle']> = ref('flex');
const showHeaders: Ref<RanksOptions['showHeaders']> = ref(true);
const showOptions: Ref<boolean> = ref(true);
const ranksPage: RanksPage = 'list';

const currentRanks = computed<Rank[]>(() => {
  let ranksToReturn = [];
  if (ranksType.value === 'navy') {
    ranksToReturn = ranksNavy;
  } else {
    ranksToReturn = ranks;
  }
  ranksToReturn.sort((a, b) => a.sort - b.sort);
  return ranksToReturn;
})
</script>

<template>
  <div class="content-wrapper">
    <RanksHeaderBlock />
    <div class="content">
      <RanksDisplayOptionsBlock
        :showOptions="showOptions"
        :ranksType="ranksType"
        :ranksDisplayStyle="ranksDisplayStyle"
        :showHeaders="showHeaders"
        :ranksPage="ranksPage"
        @toggleShowOptions="showOptions = !showOptions"
        @updateRanksType="ranksType = $event"
        @updateDisplayStyle="ranksDisplayStyle = $event"
        @toggleShowHeaders="showHeaders = !showHeaders"
      />
      <RanksDisplayStyleFlex 
        v-if="ranksDisplayStyle === 'flex'" 
        :ranks="currentRanks" 
        :ranksType="ranksType" 
        :showHeaders="showHeaders"
        :ranksPage="ranksPage"
      />
      <RanksDisplayStyleTable 
        v-else 
        :ranks="currentRanks" 
        :ranksType="ranksType"
        :showHeaders="showHeaders"
        :ranksPage="ranksPage"
      />
    </div>
  </div>
</template>