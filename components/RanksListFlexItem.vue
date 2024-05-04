<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ rank: any, rankType: string }>();

const imagePath = computed(() => {
  if (props.rankType === 'navy') {
    return '/images/navy/ribbon-'
  } else {
    return '/images/ribbon-'
  }
})
</script>

<template>
  <div class="ranks-list-flex-item">
    <div class="ranks-list-flex-item-image">
      <img :src="imagePath + rank.code.toLowerCase() + '.png'" :alt="rank.code + ' uzšuves attēls'"/>
    </div>
    <div class="ranks-list-flex-item-text">
      <div class="ranks-list-flex-item-text-name">{{ rank.name }}</div>
      <div class="ranks-list-flex-item-text-description">
        <span>{{ rank.short }}</span>
        <span>{{ rank.code }}</span>
      </div>
    </div>
  </div>
</template>