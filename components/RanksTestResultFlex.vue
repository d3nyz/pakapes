<script setup lang="ts">
import type { Rank, RanksOptions, RankCategoryWithRanks } from "~/assets/types/rank";

import rankCategories from "~/data/RankCategories";

const props = defineProps<{ 
  ranks: Rank[], 
  ranksType: RanksOptions['type'],
  showHeaders: RanksOptions['showHeaders']
}>();

const imagePath = computed(() => {
  if (props.ranksType === 'navy') {
    return '/images/navy/ribbon-'
  } else {
    return '/images/ribbon-'
  }
});

const rankCategoriesWithRanks: Ref<RankCategoryWithRanks[]> = computed(() => {
  let arrayToReturn: RankCategoryWithRanks[] = [];
  rankCategories.sort((a, b) => a.sort - b.sort);
  arrayToReturn = [...rankCategories];

  let ranksIndices = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10], [11, 12], [13, 14], [15, 16]];

  arrayToReturn.forEach((item, index) => {
    item.ranks = ranksIndices[index].map(i => props.ranks[i]);
  });

  return arrayToReturn;
});

const answerIsCorrect = (input: string | undefined, name: string): boolean => {
  return input?.toLowerCase() === name.toLowerCase();
}
</script>

<template>
  <div class="ranks-test-result-flex ranks-list-style-flex">
    <template
      v-for="category in rankCategoriesWithRanks" 
      :key="category.key" 
      >
      
      <h3 
        class="ranks-list-style-flex-category-header" 
        :class="{'category-header-hidden' : !props.showHeaders}">
        <div>{{ category.name }}</div>
      </h3>
      
      <div 
        v-for="rank in category.ranks" 
        :key="rank.sort" 
        class="ranks-list-style-flex-item"
        >
        <div class="ranks-list-style-flex-item-image">
          <img
            :src="imagePath + rank.code.toLowerCase() + '.png'"
            :alt="rank.code + ' uzšuves attēls'"
          />
        </div>
        <div class="ranks-list-style-flex-item-name">
          {{ rank.name }}
        </div>
        <div class="ranks-list-style-flex-item-context">
          <div class="ranks-list-style-flex-item-context-answer">
              <label
                class="ranks-list-style-flex-item-context-answer-label" 
                :class="[ answerIsCorrect(rank.input, rank.name) ? 'result-correct' : 'result-incorrect' ]">
                {{ answerIsCorrect(rank.input, rank.name) ? '&check;' : '&cross;' }} Atbilde:
              </label>
            {{ rank.input }}
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
/* Ranks list style flex header */
.ranks-list-style-flex-category-header {
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

  @media (min-width: 29rem) {
    font-size: 1.325rem;
    padding: .5rem;
  }
}
.ranks-list-style-flex-category-header > div {
  overflow: hidden;
}
.category-header-hidden {
  grid-template-rows: 0fr;
  padding: 0;
  border-bottom: 0;
}
.ranks-list-style-flex .ranks-list-style-flex-category-header:first-child {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
/* Ranks list style flex item */
.ranks-list-style-flex-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: .25rem;
  border-bottom: .0625rem dashed var(--divider-color);
}
.ranks-list-style-flex-item > div {
  flex-basis: 100%;

  @media (min-width: 22rem) {
    flex-basis: auto;
  }
}
.ranks-list-style-flex-item-image {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 7.2rem;
  padding: .5rem 0;
}
.ranks-test-result-flex .ranks-list-style-flex-item-image {
  flex-grow: 1;

  @media (min-width: 26rem) {
    flex-grow: 0;
  }
}
.ranks-list-style-flex-item-name {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: .25rem .5rem;
  font-weight: bold;

  @media (min-width: 56rem) {
    padding: 1rem 2rem;
    font-size: 1.25rem;
  }
}
@media (min-width: 22rem) {
  .ranks-test-result-flex .ranks-list-style-flex-item-name {
    order: -1;
    flex-basis: 100%;
  }
}
@media (min-width: 40rem) {
  .ranks-test-result-flex .ranks-list-style-flex-item-name {
    order: 0;
    flex-basis: auto;
  }
}
.ranks-list-style-flex-item-context {
  text-align: center;
}
.ranks-test-result-flex .ranks-list-style-flex-item-context {
  flex-grow: 15;

  @media (min-width: 40rem) {
    flex-grow: 0;
    width: 12rem;
  }
}
.ranks-list-style-flex-item-context-answer {
  position: relative;
  background-color: var(--body-background-color);
  width: fit-content;
  min-width: 5rem;
  padding: .25rem .5rem;
  margin: .6875rem auto;
  border-radius: .5rem;
  font-size: 1rem;
  line-height: 1.4;
}
.ranks-list-style-flex-item-context-answer-label {
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
</style>