<script setup lang="ts">
import { ranks } from '~/data/Ranks';

useHead ({
  title: 'NBS dienesta pakāpes - Saraksts'
})

ranks.value.sort((a, b) => a.sort - b.sort);
</script>

<template>
  <div class="content-wrapper">
    <h2 class="content-heading">Nacionālo bruņoto spēku dienesta pakāpes</h2>
    <div class="content">
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
    </div>
  </div>
</template>