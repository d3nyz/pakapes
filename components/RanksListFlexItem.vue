<script setup lang="ts">
defineProps<{ rank: any }>();
</script>

<template>
  <div class="ranks-list-flex-item">
    <div class="ranks-list-flex-item-image">
      <img :src="'/images/ribbon-' + rank.code.toLowerCase() + '.png'" :alt="rank.code + ' uzšuves attēls'"/>
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