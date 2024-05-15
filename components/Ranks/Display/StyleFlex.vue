<script setup lang="ts">
import type { Rank, RanksOptions, RanksPage, RankCategoryWithRanks } from "~/assets/types/rank";

import categorizeRanks from "~/utils/categorizeRanks";

const props = defineProps({
  ranks: {
    type: Array as PropType<Rank[]>,
    required: true
  },
  ranksType: {
    type: String as PropType<RanksOptions['type']>,
    default: 'general'
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

const imagePath = computed<string>(() => {
  if (props.ranksType === 'navy') {
    return '/images/navy/ribbon-'
  } else {
    return '/images/ribbon-'
  }
});

const rankCategoriesWithRanks = computed<RankCategoryWithRanks[]>(() => {
  return categorizeRanks(props.ranks as Rank[]);
});

const answerIsCorrect = (input: string | undefined, name: string): boolean => {
  return input?.toLowerCase() === name.toLowerCase();
}
</script>

<template>
  <div 
    class="ranks-display-style-flex" 
    :class="{ 'ranks-test-result-flex': props.ranksPage === 'test',
              'ranks-list-flex': props.ranksPage === 'list' }"
    >
    <template
      v-for="category in rankCategoriesWithRanks" 
      :key="category.key" 
      >

      <h3 
        class="ranks-display-style-flex-category-header" 
        :class="{'category-header-hidden' : !props.showHeaders}">
        <div>{{ category.name }}</div>
      </h3>

      <div 
        v-for="rank in category.ranks" 
        :key="rank.sort" 
        class="ranks-display-style-flex-item"
        >
        <div class="ranks-display-style-flex-item-image">
          <img
            :src="imagePath + rank.code.toLowerCase() + '.png'"
            :alt="rank.code + ' uzšuves attēls'"
          />
        </div>
        <template v-if="props.ranksPage === 'test'">
          <div class="ranks-display-style-flex-item-name">
            {{ rank.name }}
          </div>
          <div class="ranks-display-style-flex-item-context">
            <div class="ranks-display-style-flex-item-context-answer">
                <span
                  class="ranks-display-style-flex-item-context-answer-label" 
                  :class="[ answerIsCorrect(rank.input, rank.name) ? 'result-correct' : 'result-incorrect' ]">
                  {{ answerIsCorrect(rank.input, rank.name) ? '&check;' : '&cross;' }} Atbilde:
                </span>
              {{ rank.input }}
            </div>
          </div>
        </template>
        <div v-else class="ranks-display-style-flex-item-text">
          <div class="ranks-display-style-flex-item-name">{{ rank.name }}</div>
          <div class="ranks-display-style-flex-item-description">
            <span>{{ rank.short }}</span>
            <span>{{ rank.code }}</span>
          </div>
        </div>
      </div>

    </template>
  </div>
</template>

<style>
.ranks-test-result-flex {
  margin: 0 auto 1rem;
}
/* Ranks display style flex header */
.ranks-display-style-flex-category-header {
  display: grid;
  grid-template-rows: 1fr;
  width: 100%;
  padding: .25rem;
  margin: 0; 
  text-align: center;
  font-size: 1.125rem;
  line-height: 1.375rem;
  border-bottom: .0625rem dashed var(--divider-color);
  background-color: var(--section-background-color);
  will-change: grid-template-rows, padding, border-bottom;
  transition: grid-template-rows 0.3s ease, padding 0.3s ease, border-bottom 0.3s ease;
}
@media (min-width: 29rem) {
  .ranks-display-style-flex-category-header {
    font-size: 1.325rem;
    padding: .5rem;
  }
}
.ranks-display-style-flex-category-header > div {
  overflow: hidden;
}
.category-header-hidden {
  grid-template-rows: 0fr;
  padding: 0;
  border-bottom: 0;
}
.ranks-display-style-flex .ranks-display-style-flex-category-header:first-child {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
/* Ranks display style flex item */
.ranks-display-style-flex-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  padding: .25rem;
  border-bottom: .0625rem dashed var(--divider-color);
}
@media (min-width: 29rem) {
  .ranks-display-style-flex-item {
    font-size: 1.125rem;
  }
}
.ranks-display-style-flex-item:last-child {
  border-bottom: unset;
}
.ranks-test-result-flex .ranks-display-style-flex-item > div {
  flex-basis: 100%;
}
@media (min-width: 22rem) {
  .ranks-test-result-flex .ranks-display-style-flex-item > div {
    flex-basis: auto;
  }
}
.ranks-list-flex .ranks-display-style-flex-item {
  flex-direction: column;
  flex-wrap: nowrap;
}
@media (min-width: 22rem) {
  .ranks-list-flex .ranks-display-style-flex-item {
    flex-direction: row;
  }
}
@media (min-width: 29rem) {
  .ranks-list-flex .ranks-display-style-flex-item {
    padding: .5rem;
  }
}
.ranks-display-style-flex-item-image {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 7.2rem;
}
.ranks-test-result-flex .ranks-display-style-flex-item-image {
  flex-grow: 1;
}
@media (min-width: 26rem) {
  .ranks-test-result-flex .ranks-display-style-flex-item-image {
    flex-grow: 0;
  }
}
.ranks-list-flex .ranks-display-style-flex-item-image {
  padding: 0;
}
.ranks-display-style-flex-item-text {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-grow: 1;
}
@media (min-width: 38rem) {
  .ranks-display-style-flex-item-text {
    flex-direction: row;
  }
}
.ranks-display-style-flex-item-name {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0 .5rem;
  margin: .125rem auto;
  font-weight: bold;
}
@media (min-width: 22rem) {
  .ranks-display-style-flex-item-name {
    margin: auto;
  }
}
@media (min-width: 56rem) {
  .ranks-display-style-flex-item-name {
    padding: .75rem 2rem;
    font-size: 1.25rem;
  }
}
.ranks-list-flex .ranks-display-style-flex-item-name {
  font-size: 1rem;
  padding: 0 .5rem;
}
@media (min-width: 29rem) {
  .ranks-list-flex .ranks-display-style-flex-item-name {
    font-size: 1.125rem;
    padding: 0 1rem;
  }
}
@media (min-width: 38rem) {
  .ranks-list-flex .ranks-display-style-flex-item-name {
    padding: 0 2rem;
  }
}
@media (min-width: 56rem) {
  .ranks-list-flex .ranks-display-style-flex-item-name {
    padding: 0 3rem;
  }
}
@media (min-width: 22rem) {
  .ranks-test-result-flex .ranks-display-style-flex-item .ranks-display-style-flex-item-name {
    order: -1;
    flex-basis: 100%;
  }
}
@media (min-width: 40rem) {
  .ranks-test-result-flex .ranks-display-style-flex-item .ranks-display-style-flex-item-name {
    order: 0;
    flex-basis: auto;
  }
}
.ranks-display-style-flex-item-context {
  text-align: center;
}
.ranks-test-result-flex .ranks-display-style-flex-item-context {
  flex-grow: 15;
}
@media (min-width: 40rem) {
  .ranks-test-result-flex .ranks-display-style-flex-item-context {
    flex-grow: 0;
  }
}
.ranks-display-style-flex-item-context-answer {
  position: relative;
  background-color: var(--body-background-color);
  width: fit-content;
  min-width: 5rem;
  padding: .25rem .5rem;
  margin: .6875rem auto .125rem;
  border-radius: .5rem;
  font-size: 1rem;
  line-height: 1.4;
}
.ranks-display-style-flex-item-context-answer-label {
  position: absolute;
  background-color: var(--body-background-color);
  min-width: 4rem;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: .5rem;
  font-size: .7rem;
  line-height: 1.4;
}
.ranks-display-style-flex-item-description {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: .5rem;
  font-size: .725rem;
  line-height: 1;
  min-width: 6rem;
}
@media (min-width: 29rem) {
  .ranks-display-style-flex-item-description {
    font-size: 1rem;
  }
}
@media (min-width: 38rem) {
  .ranks-display-style-flex-item-description {
    line-height: 1.5;
  }
}
.ranks-display-style-flex-item-description span:first-child {
  flex-grow: unset;
}
@media (min-width: 38rem) {
  .ranks-display-style-flex-item-description span:first-child {
    flex-grow: 1;
  }
}
</style>