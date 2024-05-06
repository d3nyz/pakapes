type RanksType = 'general' | 'navy';
type RanksListStyle = 'flex' | 'table';
export type RanksOptions = {
  type: RanksType;
  listStyle: RanksListStyle;
  showHeaders?: boolean;
}