import type { Rank, RankCategoryWithRanks } from "~/assets/types/rank";

import rankCategories from "~/data/RankCategories";

const rankCategoriesWithRanks = (ranks: Rank[]) => {
  let arrayToReturn: RankCategoryWithRanks[] = [];
  
  rankCategories.sort((a, b) => a.sort - b.sort);
  ranks.sort((a, b) => a.sort - b.sort);
  
  arrayToReturn = [...rankCategories];

  let ranksIndices = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10], [11, 12], [13, 14], [15, 16]];

  arrayToReturn.forEach((item, index) => {
    item.ranks = ranksIndices[index].map(i => ranks[i]);
  });

  return arrayToReturn;
};

export default rankCategoriesWithRanks;