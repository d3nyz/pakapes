<template>
  <NuxtPwaManifest />
  <div class="flex-wrapper">
    <AppHeader v-once />
    <div class="main">  
      <NuxtPage />
    </div>
    <AppFooter v-once />
    <PwaPrompt />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(-8rem);
}
</style>