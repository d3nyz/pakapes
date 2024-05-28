<script setup lang="ts">
import iconInstall from '~/assets/icons/install.vue';
const runtimeConfig = useRuntimeConfig();
</script>
<template>
  <footer class="footer">
    <ClientOnly>
      <button
        v-if="$pwa && !$pwa?.isPWAInstalled"
        class="footer-pwa-button"
        @click="$pwa.install()"
        >
        <iconInstall />
      </button>
    </ClientOnly>
    v{{ runtimeConfig.public.version }} © 2024 <NuxtLink to="https://d3n.id.lv/" external target="_blank">D3N</NuxtLink></footer>
</template>

<style>
.footer-pwa-button {
  height: 1.25rem;
  padding: 0;
  margin-right: .25rem;
  border: 0;
  border-radius: .25rem;
  outline: 0.125rem solid transparent;
  background-color: transparent;
  color: var(--primary-color);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  vertical-align: text-bottom;
  will-change: color, outline-color;
  transition: color 0.3s ease, outline-color 0.3s ease;
}
.footer-pwa-button:hover {
  color: var(--primary-color-shade);
}
.footer-pwa-button:focus-visible {
  outline-color: var(--color-gunmetal);
}
</style>