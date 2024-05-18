<script setup lang="ts">
import type { Rank, RanksOptions, RanksPage } from '~/assets/types/rank';

useHead ({
  title: 'NBS dienesta pakāpes - Saraksts'
})

const ranksType: Ref<RanksOptions['type']> = ref('general');
const ranksDisplayStyle: Ref<RanksOptions['displayStyle']> = ref('flex');
const showHeaders: Ref<RanksOptions['showHeaders']> = ref(true);
const showOptions: Ref<boolean> = ref(true);
const reverse: Ref<boolean> = ref(false);
const ranksPage: RanksPage = 'list';

const currentRanks = computed<Rank[]>(() => {
  return getRanksByType(ranksType.value);
});

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
        @toggleReverse="reverse = !reverse"
      />
      <Transition name="fade-top" mode="out-in">
        <RanksDisplayStyleFlex 
          v-if="ranksDisplayStyle === 'flex'"
          :key="ranksType+'-flex'" 
          :ranks="currentRanks" 
          :ranksType="ranksType" 
          :showHeaders="showHeaders"
          :reverse="reverse"
          :ranksPage="ranksPage"
        />
        <RanksDisplayStyleTable 
          v-else 
          :key="ranksType+'-table'"
          :ranks="currentRanks" 
          :ranksType="ranksType"
          :showHeaders="showHeaders"
          :reverse="reverse"
          :ranksPage="ranksPage"
        />
      </Transition>
    </div>
  </div>
</template>