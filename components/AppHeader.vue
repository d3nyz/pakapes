<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import getBrowserFontSize from '~/utils/getBrowserFontSize';

let lastScrollTop = 0;
const browserFontSize: number = getBrowserFontSize();
const isScrolled: Ref<boolean> = ref(false);
const isScrolledUp: Ref<boolean> = ref(false);
const isScrolledDown: Ref<boolean> = ref(false);
const mainHeader: Ref<HTMLElement | null> = ref(null);
const headerHeight: Ref<number> = ref(45);

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

const headerPlaceholderHeight: Ref<string> = computed(() => {
  return headerHeight.value / browserFontSize + 'rem';
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // There is an anomaly with the headerHeight on screen width 427px-448px it is calculated 2x bigger than the real header height without this construction.
  nextTick().then(() => setTimeout(() => {headerHeight.value = mainHeader.value?.offsetHeight || 45}, 15));
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div>
    <div 
      class="empty-header-placeholder" 
      :style="{ height: `${headerPlaceholderHeight}` }">
    </div>
    <header 
      ref="mainHeader" 
      class="header" 
      :class="{ 'header-scrolled': isScrolled, 'header-scrolled-up': isScrolledUp, 'header-scrolled-down': isScrolledDown }">
      <div>
        <nav class="navigation">
          <NuxtLink to="/" class="navigation-link">Sākums</NuxtLink>
          <NuxtLink to="/list" class="navigation-link">Pakāpes</NuxtLink>
          <NuxtLink 
            to="https://www.klustikaravirs.lv/" 
            class="navigation-link" 
            external 
            target="_blank" 
            hreflang="lv"
            >Kļūsti karavīrs &#8599;
          </NuxtLink>
        </nav>
      </div>
    </header>
  </div>
</template>