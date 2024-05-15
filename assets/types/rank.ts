export interface Rank {
  sort: number;
  code: string;
  name: string;
  short: string;
  input?: string;
};

type RanksType = 'general' | 'navy';
type RanksDisplayStyle = 'flex' | 'table';
export type RanksOptions = {
  type: RanksType;
  displayStyle: RanksDisplayStyle;
  showHeaders?: boolean;
};

export type RanksPage = 'test' | 'list';

export interface RankCategory {
  sort: number;
  name: string;
  key: string;
};

export interface RankCategoryWithRanks extends RankCategory {
  ranks?: Rank[]
}