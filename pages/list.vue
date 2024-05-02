<script setup lang="ts">
import { ranks } from '~/data/Ranks';

useHead ({
  title: 'NBS dienesta pakāpes - Saraksts'
})

const ranksListStyle = ref('flex');
const showHeaders = ref(true);

ranks.value.sort((a, b) => a.sort - b.sort);
</script>

<template>
  <div class="content-wrapper">
    <h2 class="content-heading">Nacionālo bruņoto spēku dienesta pakāpes</h2>
    <div class="content">
      <div class="list-options">
        <div v-if="ranksListStyle === 'flex'" class="list-options-item">
          <label class="checkbox">Rādīt virsrakstus
            <input v-model="showHeaders" type="checkbox"/>
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
      <RanksListFlex v-if="ranksListStyle === 'flex'" :ranks="ranks" :showHeaders="showHeaders" />
      <RanksListTable v-else :ranks="ranks" />
    </div>
  </div>
</template>