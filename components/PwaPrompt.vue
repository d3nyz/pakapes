<script setup lang="ts">
import iconPwa from '~/assets/icons/pwa.vue';
import iconInstall from '~/assets/icons/install.vue';
import iconRestart from '~/assets/icons/restart.vue';
import iconClose from '~/assets/icons/close.vue';
</script>

<template>
  <ClientOnly>
    <Transition name="scale" appear mode="out-in">
      <div
        v-if="$pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh"
        class="pwa-prompt"
        >
        <div class="pwa-prompt-header">
          <span class="pwa-prompt-header-logo">
            <iconPwa />
          </span>
          <button
            class="pwa-prompt-header-button-close"
            @click="$pwa.cancelInstall()"
            >
            <iconClose />
          </button>
        </div>
        <div class="pwa-prompt-content">
          <button 
            class="pwa-prompt-content-button button"
            @click="$pwa.install()"
            >
            <iconInstall class="pwa-prompt-content-button-icon" /> Instalēt
          </button>
        </div>
      </div>
      <div
        v-else-if="$pwa?.offlineReady || $pwa?.needRefresh"
        class="pwa-prompt"
        >
        <div class="pwa-prompt-header">
          <span class="pwa-prompt-header-logo">
            <iconPwa />
          </span>
          <button
            class="pwa-prompt-header-button-close"
            @click="$pwa.cancelPrompt()"
            >
            <iconClose />
          </button>
        </div>
        <div class="pwa-prompt-content">
          <button 
            v-if="$pwa.needRefresh"
            class="pwa-prompt-content-button button"
            @click="$pwa.updateServiceWorker()"
            >
            <iconRestart class="pwa-prompt-content-button-icon" /> Pārlādēt
          </button>
          <p 
            v-else-if="$pwa.offlineReady" 
            class="pwa-prompt-content-text"
            >
            Ir pieejams bez interneta
          </p>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<style>
.pwa-prompt {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  box-shadow: 0 0 .25rem .125rem rgba(0,0,0,0.1);
  z-index: 1;
  overflow: hidden;
}
.pwa-prompt-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: .25rem 1rem;
  font-size: 1rem;
  line-height: 1;
  color: var(--content-text-color-inverted);
  background-color: var(--color-gray-1);
}
.pwa-prompt-header-logo {
  height: 1.5rem;
  font-size: 1.5rem;
}
.pwa-prompt-header-button-close {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  line-height: 1;
  height: 1.5rem;
  width: 1.5rem;
  color: var(--content-text-color-inverted);
  background-color: transparent;
  border: none;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
  outline: none;
  will-change: background-color;
  transition: background-color .3s ease;
}
.pwa-prompt-header-button-close:hover,
.pwa-prompt-header-button-close:focus-visible {
  background-color: var(--color-gunmetal);
}
.pwa-prompt-content {
  display: block;
  padding: 1rem;
  background-color: var(--content-background-color);
}
.pwa-prompt-content-button {
  font-size: 1rem;
  padding: .25rem 1rem;
}
.pwa-prompt-content-button-icon {
  margin-right: .5rem;
}
.pwa-prompt-content-text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.25;
}
</style>