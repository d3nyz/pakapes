<script setup lang="ts">
import type { Rank } from "~/assets/types/rank";
import type { RanksOptions } from '~/assets/types/ranksOptions';

defineProps<{ ranks: Rank[], ranksType: RanksOptions['type'], showHeaders: RanksOptions['showHeaders'] }>();

</script>

<template>
  <TransitionGroup name="list" tag="div" class="ranks-list-flex">
    <h3 :class="{ 'ranks-list-flex-header-hidden': !showHeaders }" class="ranks-list-flex-header" key="header-flag-officers"><div>Augstākie virsnieki</div></h3>
    <RanksListFlexItem v-for="rank in [ranks[0], ranks[1], ranks[2]]" :key="rank.sort" :rank="rank" :rankType="ranksType" />
    <h3 :class="{ 'ranks-list-flex-header-hidden': !showHeaders }" class="ranks-list-flex-header" key="header-senior-officers"><div>Vecākie virsnieki</div></h3>
    <RanksListFlexItem v-for="rank in [ranks[3], ranks[4], ranks[5]]" :key="rank.sort" :rank="rank" :rankType="ranksType" />
    <h3 :class="{ 'ranks-list-flex-header-hidden': !showHeaders }" class="ranks-list-flex-header" key="header-junior-officers"><div>Jaunākie virsnieki</div></h3>
    <RanksListFlexItem v-for="rank in [ranks[6], ranks[7], ranks[8]]" :key="rank.sort" :rank="rank" :rankType="ranksType" />
    <h3 :class="{ 'ranks-list-flex-header-hidden': !showHeaders }" class="ranks-list-flex-header" key="header-general-petty-officers"><div>Augstākie instruktori</div></h3>
    <RanksListFlexItem v-for="rank in [ranks[9], ranks[10]]" :key="rank.sort" :rank="rank" :rankType="ranksType" />
    <h3 :class="{ 'ranks-list-flex-header-hidden': !showHeaders }" class="ranks-list-flex-header" key="header-senior-petty-officers"><div>Vecākie instruktori</div></h3>
    <RanksListFlexItem v-for="rank in [ranks[11], ranks[12]]" :key="rank.sort" :rank="rank" :rankType="ranksType" />
    <h3 :class="{ 'ranks-list-flex-header-hidden': !showHeaders }" class="ranks-list-flex-header" key="header-junior-petty-officers"><div>Jaunākie instruktori</div></h3>
    <RanksListFlexItem v-for="rank in [ranks[13], ranks[14]]" :key="rank.sort" :rank="rank" :rankType="ranksType" />
    <h3 :class="{ 'ranks-list-flex-header-hidden': !showHeaders }" class="ranks-list-flex-header" key="header-privates"><div>Kareivji</div></h3>
    <RanksListFlexItem v-for="rank in [ranks[15], ranks[16]]" :key="rank.sort" :rank="rank" :rankType="ranksType" />
  </TransitionGroup>
</template>

<style>
.ranks-list-flex {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.ranks-list-flex-header {
  display: grid;
  width: 100%;
  padding: .5rem;
  margin: 0; 
  text-align: center;
  font-size: 1.325rem;
  line-height: 1.375rem;
  border-bottom: .0625rem dashed var(--divider-color);
  background-color: var(--section-background-color);
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.3s ease, padding 0.3s ease, border-bottom 0.3s ease;
}
.ranks-list-flex-header > div {
  overflow: hidden;
}
.ranks-list-flex-header.ranks-list-flex-header-hidden {
  grid-template-rows: 0fr;
  padding: 0;
  border-bottom: 0;
}
.ranks-list-flex .ranks-list-flex-header:first-child {
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.ranks-list-flex-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: .5rem;
  border-bottom: .0625rem dashed var(--divider-color);
}
.ranks-list-flex-item:last-child {
  border-bottom: unset;
}
.ranks-list-flex-item-image {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 7.2rem;
}
.ranks-list-flex-item-text {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
}
.ranks-list-flex-item-text-name {
  font-weight: bold;
  flex-grow: 1;
  padding: 0 3rem;
}
.ranks-list-flex-item-text-description {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: .5rem;
  font-size: 1rem;
  min-width: 6rem;
}
.ranks-list-flex-item-text-description span:first-child {
  flex-grow: 1;
}
@media screen and (max-width: 56em) {
  .ranks-list-flex-item-text-name {
    padding: 0 2rem;
  }
}
@media screen and (max-width: 38em) {
  .ranks-list-flex-item-text {
    flex-direction: column;
  }
  .ranks-list-flex-item-text-name {
    padding: 0 1rem;
  }
  .ranks-list-flex-item-text-description {
    line-height: 1;
  }
  .ranks-list-flex-item-text-description span:first-child {
    flex-grow: unset;
  }
}
@media screen and (max-width: 29em) {
  .ranks-list-flex-header {
    font-size: 1.125rem;
    padding: .25rem;
  }
  .ranks-list-flex-item {
    padding: .25rem;
  }
  .ranks-list-flex-item-text-name {
    font-size: 1rem;
    padding: 0 .5rem;
  }
  .ranks-list-flex-item-text-description {
    font-size: .725rem;
  }
}
@media screen and (max-width: 22em) {
  .ranks-list-flex-item {
    flex-direction: column;
  }
}
</style>