import type { RankCategory } from "~/assets/types/rank";
const rankCategories: RankCategory[] = [
  {
    sort: 7,
    name: 'Kareivji',
    key: 'privates'
  },
  {
    sort: 6,
    name: 'Jaunākie instruktori',
    key: 'junior-petty-officers'
  },
  {
    sort: 5,
    name: 'Vecākie instruktori',
    key: 'senior-petty-officers'
  },
  {
    sort: 4,
    name: 'Augstākie instruktori',
    key: 'general-petty-officers'
  },
  {
    sort: 3,
    name: 'Jaunākie virsnieki',
    key: 'junior-officers'
  },
  {
    sort: 2,
    name: 'Vecākie virsnieki',
    key: 'senior-officers'
  },
  {
    sort: 1,
    name: 'Augstākie virsnieki',
    key: 'flag-officers'
  }
]
export default rankCategories