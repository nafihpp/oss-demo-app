type CountryPattern = {
  name: string;
  regex: RegExp;
  example?: string;
};

export const PHONE_PATTERNS: CountryPattern[] = [
  {
    name: 'Uganda',
    regex: /^(\+256|256|0)?(7\d{8}|3\d{8})$/,
    example: '+2567XXXXXXXX',
  },
  {
    name: 'UAE',
    regex: /^(\+971|971)5\d{8}$/,
    example: '+9715XXXXXXXX',
  },
  {
    name: 'Greece',
    regex: /^(\+30|30)6\d{8}$/,
    example: '+306XXXXXXXXX',
  },
];


