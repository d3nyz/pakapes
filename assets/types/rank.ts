export interface Rank {
  sort: number;
  code: string;
  name: string;
  short: string;
  input?: string;
};

type RanksType = 'general' | 'navy';
type RanksListStyle = 'flex' | 'table';
export type RanksOptions = {
  type: RanksType;
  listStyle: RanksListStyle;
  showHeaders?: boolean;
};

export interface RankCategory {
  sort: number;
  name: string;
  key: string;
};

export interface RankCategoryWithRanks extends RankCategory {
  ranks?: Rank[]
}