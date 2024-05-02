<script setup lang="ts">
defineProps<{ ranks: any[] }>()
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
      <td><img :src="'/images/ribbon-' + rank.code.toLowerCase() + '.png'" :alt="rank.code + ' uzšuves attēls'"/></td>
      <td>{{ rank.name }}</td>
      <td>{{ rank.short }}</td>
      <td>{{ rank.code }}</td>
    </tr>
  </table>
</template>