<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

let lastScrollTop = 0;
const isScrolled: Ref<boolean> = ref(false);
const isScrolledUp: Ref<boolean> = ref(false);
const isScrolledDown: Ref<boolean> = ref(false);
const mainHeader: Ref<HTMLElement | null> = ref(null);
const headerHeight: Ref<number> = ref(32);

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  isScrolled.value = scrollTop > 0;
  if (scrollTop > lastScrollTop && scrollTop > headerHeight.value) {
    // scrolled down
    isScrolledDown.value = true;
    isScrolledUp.value = false;
  } else {
    // scrolled up
    isScrolledUp.value = true;
    isScrolledDown.value = false;
  }
  lastScrollTop = scrollTop;
};

onMounted(async() => {
  headerHeight.value = mainHeader.value?.offsetHeight || 45;
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <div class="empty-header-placeholder" :style="{ height: `${headerHeight}px` }"></div>
    <header ref="mainHeader" class="header" :class="{ 'header-scrolled': isScrolled, 'header-scrolled-up': isScrolledUp, 'header-scrolled-down': isScrolledDown }">
      <div>
        <nav class="navigation">
          <NuxtLink to="/" class="navigation-link">Sākums</NuxtLink>
          <NuxtLink to="/list" class="navigation-link">Pakāpes</NuxtLink>
          <NuxtLink to="https://www.klustikaravirs.lv/" class="navigation-link" target="_blank" hreflang="lv">Kļūsti karavīrs &#8599;</NuxtLink>
        </nav>
      </div>
    </header>
  </div>
</template>

<style scoped>
.header-placeholder > .header {
  position: relative;
  visibility: hidden;
}
</style>