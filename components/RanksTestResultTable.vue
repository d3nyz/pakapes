<script setup lang="ts">
import { computed } from 'vue';
import type { Rank } from "~/assets/types/rank";
import type { RanksOptions } from '~/assets/types/ranksOptions';

const props = defineProps<{ 
  ranks: Rank[], 
  ranksType: RanksOptions['type'] 
}>();

const imagePath = computed(() => {
  if (props.ranksType === 'navy') {
    return '/images/navy/ribbon-'
  } else {
    return '/images/ribbon-'
  }
})
</script>

<template>
  <table class="list-table">
    <tr>
      <th>Uzšuve</th>
      <th>Pakāpe</th>
      <th>Atbilde</th>
    </tr>
    <tr v-for="rank in ranks">
      <td>
        <img 
          :src="imagePath + rank.code.toLowerCase() + '.png'" 
          :alt="rank.code + ' uzšuves attēls'"
        />
      </td>
      <td>{{ rank.name }}</td>
      <td>
        {{ rank.input }} 
        <label 
          v-if="rank.input && rank.input.toLowerCase() === rank.name.toLowerCase()" 
          class="result-correct">
          &check;
        </label>
        <label 
          v-else class="result-incorrect">
          &cross;
        </label>
      </td>
    </tr>
  </table>
</template>