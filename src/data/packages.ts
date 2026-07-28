export interface Package {
  name: string;
  numeral: string;
  price: string;
  items: string[];
  isVip?: boolean;
}

export const packages: Package[] = [
  {
    name: 'Package',
    numeral: 'I',
    price: '999/-',
    isVip: true,
    items: [
      'Hawas Diva',
      'Hawas Ice',
      'Black XS',
      'Armani',
      'White Oud',
    ],
  },
];
