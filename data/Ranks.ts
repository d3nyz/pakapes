interface Rank {
  sort: number;
  code: string;
  name: string;
  short: string;
  input: string;
}
const ranks = ref<Rank[]> ([
  {
    sort: 17,
    code: 'OR-2',
    name: 'Kareivis',
    short: 'kar.',
    input: ''
  },
  {
    sort: 16,
    code: 'OR-3',
    name: 'Dižkareivis',
    short: 'dkar.',
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
    name: 'Virsseržants',
    short: 'vsrž.',
    input: ''
  },
  {
    sort: 12,
    code: 'OR-7',
    name: 'Štāba virsseržants',
    short: 'štvsrž.',
    input: ''
  },
  {
    sort: 11,
    code: 'OR-8',
    name: 'Galvenais virsseržants',
    short: 'gsrž.',
    input: ''
  },
  {
    sort: 10,
    code: 'OR-9',
    name: 'Augstākais virsseržants',
    short: 'avsrž.',
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
    name: 'Kapteinis',
    short: 'kpt.',
    input: ''
  },
  {
    sort: 6,
    code: 'OF-3',
    name: 'Majors',
    short: 'maj.',
    input: ''
  },
  {
    sort: 5,
    code: 'OF-4',
    name: 'Pulkvežleitnants',
    short: 'plt.',
    input: ''
  },
  {
    sort: 4,
    code: 'OF-5',
    name: 'Pulkvedis',
    short: 'plkv.',
    input: ''
  },
  {
    sort: 3,
    code: 'OF-6',
    name: 'Brigādes ģenerālis',
    short: 'brģen.',
    input: ''
  },
  {
    sort: 2,
    code: 'OF-7',
    name: 'Ģenerālmajors',
    short: 'ģmaj.',
    input: ''
  },
  {
    sort: 1,
    code: 'OF-8',
    name: 'Ģenerālleitnants',
    short: 'ģlt.',
    input: ''
  }
])

export {ranks}