interface Rank {
  sort: number;
  code: string;
  name: string;
  short: string;
  input: string;
}
const ranksNavy = ref<Rank[]> ([
  {
    sort: 17,
    code: 'OR-2',
    name: 'Matrozis',
    short: 'mtr.',
    input: ''
  },
  {
    sort: 16,
    code: 'OR-3',
    name: 'Dižmatrozis',
    short: 'dmtr.',
    input: ''
  },
  {
    sort: 15,
    code: 'OR-4',
    name: 'Kaprālis',
    short: 'kpr.',
    input: ''
  },
  {
    sort: 14,
    code: 'OR-5',
    name: 'Seržants',
    short: 'srž.',
    input: ''
  },
  {
    sort: 13,
    code: 'OR-6',
    name: 'Bocmanis',
    short: 'bcm.',
    input: ''
  },
  {
    sort: 12,
    code: 'OR-7',
    name: 'Štāba bocmanis',
    short: 'štbcm.',
    input: ''
  },
  {
    sort: 11,
    code: 'OR-8',
    name: 'Galvenais bocmanis',
    short: 'gbcm.',
    input: ''
  },
  {
    sort: 10,
    code: 'OR-9',
    name: 'Augstākais bocmanis',
    short: 'abcm.',
    input: ''
  },
  {
    sort: 9,
    code: 'OF-0',
    name: 'Leitnants',
    short: 'lt.',
    input: ''
  },
  {
    sort: 8,
    code: 'OF-1',
    name: 'Virsleitnants',
    short: 'vlt.',
    input: ''
  },
  {
    sort: 7,
    code: 'OF-2',
    name: 'Kapteiņleitnants',
    short: 'kptlt.',
    input: ''
  },
  {
    sort: 6,
    code: 'OF-3',
    name: 'Komandleitnants',
    short: 'klt.',
    input: ''
  },
  {
    sort: 5,
    code: 'OF-4',
    name: 'Komandkapteinis',
    short: 'kkpt.',
    input: ''
  },
  {
    sort: 4,
    code: 'OF-5',
    name: 'Jūras kapteinis',
    short: 'jkpt.',
    input: ''
  },
  {
    sort: 3,
    code: 'OF-6',
    name: 'Flotiles admirālis',
    short: 'fadm.',
    input: ''
  },
  {
    sort: 2,
    code: 'OF-7',
    name: 'Kontradmirālis',
    short: 'kadm.',
    input: ''
  },
  {
    sort: 1,
    code: 'OF-8',
    name: 'Viceadmirālis',
    short: 'vadm.',
    input: ''
  }
])

export {ranksNavy}