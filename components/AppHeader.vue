<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isScrolled: Ref<boolean> = ref(false);

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  isScrolled.value = scrollTop > 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <!-- Temporary solution to push content down by header size (to fix header over content on mobile) -->
    <div class="header-placeholder">
      <div class="header">
        <nav class="navigation">
          <NuxtLink to="/" class="navigation-link">Sākums</NuxtLink>
          <NuxtLink to="/list" class="navigation-link">Pakāpes</NuxtLink>
          <NuxtLink to="https://www.klustikaravirs.lv/" class="navigation-link" target="_blank" hreflang="lv">Kļūsti karavīrs &#8599;</NuxtLink>
        </nav>
      </div>
    </div>
    <header class="header" :class="{ 'header-scrolled': isScrolled }">
      <nav class="navigation">
        <NuxtLink to="/" class="navigation-link">Sākums</NuxtLink>
        <NuxtLink to="/list" class="navigation-link">Pakāpes</NuxtLink>
        <NuxtLink to="https://www.klustikaravirs.lv/" class="navigation-link" target="_blank" hreflang="lv">Kļūsti karavīrs &#8599;</NuxtLink>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.header-placeholder > .header {
  position: relative;
  visibility: hidden;
}
</style>