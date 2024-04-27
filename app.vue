<template>
  <NuxtPwaManifest />
  <div class="flex-wrapper">
    <Header />
    <div class="main">  
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(-8rem);
}
</style>