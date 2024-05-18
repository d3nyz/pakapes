import type { Rank, RanksOptions, RankCategory, RankCategoryWithRanks } from "~/assets/types/rank";

function sortRanks (array: Rank[] | RankCategory[], reverse: boolean = false) {
  array.sort((a, b) => a.sort - b.sort);
  return reverse ? array.reverse() : array;
};

import ranks from '~/data/Ranks';
import ranksNavy from '~/data/RanksNavy';
export function getRanksByType (type: RanksOptions['type']) {
  if (type === 'navy') {
    return ranksNavy;
  } else {
    return ranks;
  }
};

// Create rankCategoriesWithRanks[] from ranks[]
import rankCategories from "~/data/RankCategories";
export function categorizeRanks (ranks: Rank[], reverse: boolean = false) {
  sortRanks(rankCategories, reverse);
  sortRanks(ranks, reverse);

  let arrayToReturn: RankCategoryWithRanks[] = [...rankCategories];

  const ranksIndices: number[][] = reverse 
    ? [[0, 1], [2, 3], [4, 5], [6, 7], [ 8, 9, 10], [11, 12, 13], [14, 15, 16]] 
    : [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10], [11, 12], [13, 14], [15, 16]];

  arrayToReturn.forEach((item, index) => {
    item.ranks = ranksIndices[index].map(i => ranks[i]);
  });
  return arrayToReturn;
};

export function getImagePath (ranksType: RanksOptions['type']) {
  if (ranksType === 'navy') {
    return '/images/navy/ribbon-'
  } else {
    return '/images/ribbon-'
  }
}