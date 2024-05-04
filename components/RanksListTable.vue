<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ ranks: any, ranksType: string }>();

const imagePath = computed(() => {
  if (props.ranksType === 'navy') {
    return '/images/navy/ribbon-'
  } else {
    return '/images/ribbon-'
  }
})
</script>

<template>
  <table class="list-table no-margin">
    <tr>
      <th>Uzšuve</th>
      <th>Pakāpe</th>
      <th>Saīsinājums</th>
      <th>Kods</th>
    </tr>
    <tr v-for="rank in ranks">
      <td><img :src="imagePath + rank.code.toLowerCase() + '.png'" :alt="rank.code + ' uzšuves attēls'"/></td>
      <td>{{ rank.name }}</td>
      <td>{{ rank.short }}</td>
      <td>{{ rank.code }}</td>
    </tr>
  </table>
</template>