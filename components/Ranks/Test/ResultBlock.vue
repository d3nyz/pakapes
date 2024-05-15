<script setup lang="ts">
import type { Rank, RanksOptions, RanksPage } from "~/assets/types/rank";

const ranksDisplayStyle: Ref<RanksOptions['displayStyle']> = ref('flex');
const showHeaders: Ref<RanksOptions['showHeaders']> = ref(false);
const showOptions: Ref<boolean> = ref(false);
const ranksPage: RanksPage = 'test';

const props = defineProps<{
  ranks: Rank[],
  ranksType: RanksOptions['type']
}>();

defineEmits(['setState']);
</script>

<template>
  <div class="ranks-test-result">
    <RanksDisplayOptionsBlock
      :showOptions="showOptions"
      :ranksDisplayStyle="ranksDisplayStyle"
      :showHeaders="showHeaders"
      :ranksPage="ranksPage"
      @toggleShowOptions="showOptions = !showOptions"
      @updateDisplayStyle="ranksDisplayStyle = $event"
      @toggleShowHeaders="showHeaders = !showHeaders"
    />
    <Transition name="blur" mode="out-in" tag="div" class="ranks-test-result-container">
      <RanksDisplayStyleFlex 
        v-if="ranksDisplayStyle === 'flex'" 
        :ranks="props.ranks" 
        :ranksType="props.ranksType" 
        :showHeaders="showHeaders"
        :ranksPage="ranksPage"
      />
      <RanksDisplayStyleTable
        v-else
        :ranks="props.ranks" 
        :ranksType="props.ranksType"
        :showHeaders="showHeaders"
        :ranksPage="ranksPage"
      />
    </Transition>
    <input class="button" type="button" value="Uz sākumu" accesskey="enter" @click="$emit('setState', 'intro')"/>
  </div>
</template>