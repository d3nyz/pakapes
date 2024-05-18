<script setup lang="ts">
import type { Rank, RanksOptions, RanksPage, RankCategoryWithRanks } from "~/assets/types/rank";

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
  },
  reverse: {
    type: Boolean,
    default: false
  }
});

const imagePath = computed<string>(() => {
  return getImagePath(props.ranksType);
});

const rankCategoriesWithRanks = computed<RankCategoryWithRanks[]>(() => {
  return categorizeRanks(props.ranks as Rank[], props.reverse);
});

const answerIsCorrect = (input: string | undefined, name: string): boolean => {
  return input?.toLowerCase() === name.toLowerCase();
}
</script>

<template>
  <div class="ranks-display-style-table-wrapper">
    <TransitionGroup name="table-fade" tag="table"
      class="ranks-display-style-table table-fade"
      :class="{
        'ranks-test-result-table': ranksPage === 'test', 
        'ranks-list-table': ranksPage === 'list'}"
        >
      <tr key="table-header">
        <th>Uzšuve</th>
        <th>Pakāpe</th>
        <th v-if="ranksPage === 'test'">Atbilde</th>
        <template v-else>
          <th>Saīsinājums</th>
          <th>Kods</th>
        </template>
      </tr>

      <template v-for="category in rankCategoriesWithRanks" :key="category.key">
        <tr v-if="props.showHeaders"
          class="ranks-display-style-table-category-header"
          :class="{ 'category-header-hidden' : !props.showHeaders }">
          <td :colspan="ranksPage === 'test' ? 3 : 4">{{ category.name }}</td>
        </tr>

        <tr v-for="rank in category.ranks" :key="rank.sort">
          <td>
            <img 
              :src="imagePath + rank.code.toLowerCase() + '.png'" 
              :alt="rank.code + ' uzšuves attēls'"
            />
          </td>
          <td>{{ rank.name }}</td>
          <td v-if="ranksPage === 'test'">
            {{ rank.input }}
            <span 
              :class="[ answerIsCorrect(rank.input, rank.name) ? 'result-correct' : 'result-incorrect' ]">
              {{ answerIsCorrect(rank.input, rank.name) ? '&check;' : '&cross;' }}
            </span>
          </td>
          <template v-else>
            <td>{{ rank.short }}</td>
            <td>{{ rank.code }}</td>
          </template>
        </tr>
      </template>
    </TransitionGroup>
  </div>
</template>

<style>
.ranks-display-style-table-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
}
.ranks-display-style-table {
  width: 100%;
}
.ranks-test-result-table {
  margin-bottom: 1rem;
}
.ranks-display-style-table th {
  border-bottom: .0625rem dashed var(--divider-color);
}
.ranks-display-style-table th, .ranks-display-style-table td {
  padding: .25rem 1rem;
  border-right: .0625rem dashed var(--divider-color);
}
.ranks-display-style-table th:last-child, .ranks-display-style-table td:last-child {
  border-right: none;
}
.ranks-display-style-table td img {
  vertical-align: middle;
}
/* Category header */
.ranks-display-style-table-category-header {
  font-weight: bold;
  background-color: var(--section-background-color);
}
.ranks-display-style-table-category-header.category-header-hidden {
  display: none;
}
</style>