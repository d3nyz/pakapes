<script setup lang="ts">
import type { RanksOptions, RanksPage } from "~/assets/types/rank";
defineProps({
  showOptions: {
    type: Boolean,
    required: true
  },
  ranksType: {
    type: String as PropType<RanksOptions['type']>,
    required: false
  },
  ranksDisplayStyle: {
    type: String as PropType<RanksOptions['displayStyle']>,
    default: 'flex'
  },
  showHeaders: {
    type: Boolean as PropType<RanksOptions['showHeaders']>,
    default: true
  },
  ranksPage: {
    type: String as PropType<RanksPage>,
    default: 'list'
  }
});

defineEmits([ 
  'toggleShowOptions', 
  'toggleShowHeaders', 
  'updateRanksType', 
  'updateDisplayStyle' 
]);
</script>

<template>
  <div class="options-wrapper">
    <button 
      @click="$emit('toggleShowOptions')" 
      class="options-toggle" 
      :class="{ 'options-toggle-closed': !showOptions } " 
      tabindex="0">
      <span>▼</span>Attēlošanas opcijas
    </button>
    <div class="options-container" :class="{ 'options-container-hidden': !showOptions }">
      <div>
        <div v-if="ranksPage !== 'test' && ranksType" class="options-container-item">
          <div class="select-container">
            <label for="ranks-type" class="select-container-label">Pakāpju veids</label>
            <select 
              :value="ranksType" 
              name="ranks-type" 
              id="ranks-type"
              @change="$emit('updateRanksType', ($event?.target as HTMLSelectElement)?.value as RanksOptions['type'])"
              >
              <option value="general">Vispārējās</option>
              <option value="navy">Jūras spēku</option>
            </select>
          </div>
        </div>
        <div class="options-container-item">
          <div class="select-container">
            <label for="ranks-list-style" class="select-container-label">Attēlošanas veids</label>
            <select 
              :value="ranksDisplayStyle" 
              name="ranks-list-style" 
              id="ranks-list-style"
              @change="$emit('updateDisplayStyle', ($event?.target as HTMLSelectElement)?.value as RanksOptions['displayStyle'])"
              >
              <option value="flex">Saraksts</option>
              <option value="table">Tabula</option>
            </select>
          </div>
        </div>
        <div class="options-container-item">
          <label class="checkbox" for="show-headers">Rādīt virsrakstus
            <input 
              :checked="showHeaders"
              name="show-headers"
              id="show-headers"
              type="checkbox" 
              @change="$emit('toggleShowHeaders')"
              @keyup.enter="$emit('toggleShowHeaders')"/>
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.options-wrapper {
  position: relative;
  display: block;
}
@media screen and (min-width: 38em) {
  .options-wrapper {
    margin-top: -0.5rem;
  }
}
.options-toggle {
  position: absolute;
  top: -0.55rem;
  right: 1rem;
  z-index: 2;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0 .5rem;
  color: var(--primary-color);
  background-color: var(--content-background-color);
  border: .0625rem dashed var(--primary-color);
  border-radius: .5rem;
  will-change: color, border-color;
  transition: color .3s ease-in-out, border-color .3s ease-in-out;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.options-toggle:hover {
  color: var(--primary-color-shade);
  border-color: var(--primary-color-shade);
}
.options-toggle:focus-visible {
  outline: .0625rem solid var(--color-gunmetal);
  border-style: solid;
  border-color: var(--color-gunmetal);
  color: var(--primary-color-shade);
}
.options-toggle span {
  display: inline-block;
  will-change: transform;
  transition: transform .3s ease-in-out;
  margin-right: .25rem;
}
.options-toggle.options-toggle-closed span {
  transform: rotate(-90deg);
}
.options-container {
  position: relative;
  display: grid;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: var(--content-background-color);
  border: .0625rem dashed var(--divider-color);
  border-radius: 1rem;
  box-shadow: 0 0 .25rem .125rem var(--content-background-color);
  z-index: 1;
  grid-template-rows: 1fr;
  will-change: grid-template-rows, padding, border-color;
  transition: grid-template-rows .3s ease-in-out, padding .3s ease-in-out, border-color .3s ease-in-out;
}
@media screen and (min-width: 38em) {
  .options-wrapper {
    margin-bottom: 1.4rem;
  }
}
.options-container > div {
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.options-container.options-container-hidden {
  grid-template-rows: 0fr;
  padding: 0;
  border-color: var(--color-light-gray);
}
.options-container > div .options-container-item > * {
  margin-top: .5rem;
}
</style>