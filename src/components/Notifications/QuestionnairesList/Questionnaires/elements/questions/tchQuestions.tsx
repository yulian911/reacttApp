export interface ItchQuestions {
  id: number;
  name: string;
  category: string;
  question: string;
  comment?: string;
}

export const tchQuestions: ItchQuestions[] = [
  {
    id: 1,
    name: 'bitter_problem',
    category: 'Spadek zwyczajowego smaku',
    question: 'Problemy ze smakiem gorzkim.',
  },
  {
    id: 2,
    name: 'sour_problem',
    category: 'Spadek zwyczajowego smaku',
    question: 'Problemy ze smakiem kwaśnym.',
  },
  {
    id: 3,
    name: 'salty_problem',
    category: 'Spadek zwyczajowego smaku',
    question: 'Problemy ze smakiem słonym.',
  },
  {
    id: 4,
    name: 'sweet_problem',
    category: 'Spadek zwyczajowego smaku',
    question: 'Problemy ze smakiem słodkim.',
  },
  {
    id: 5,
    name: 'umami_problem',
    category: 'Spadek zwyczajowego smaku',
    question: 'Problemy ze smakiem umami*',
    comment:
      '*smak bulionu lub potraw z glutaminianem sodu (wzmacniaczem smaku) np. kostki rosołowe',
  },
  {
    id: 6,
    name: 'meat_problem',
    category: 'Dyskomfort',
    question: 'Trudności z jedzeniem mięsa.',
  },
  {
    id: 7,
    name: 'fat_food_problem',
    category: 'Dyskomfort',
    question: 'Trudności z jedzeniem tłustych pokarmów.',
  },
  {
    id: 8,
    name: 'lowered_appetite',
    category: 'Dyskomfort',
    question: 'Zmniejszony apetyt.',
  },
  {
    id: 9,
    name: 'hot_meal_problem',
    category: 'Dyskomfort',
    question: 'Trudności z jedzeniem gorących potraw.',
  },
  {
    id: 10,
    name: 'food_smell_anxiety',
    category: 'Dyskomfort',
    question: 'Niepokój związany z zapachem jedzenia.',
  },
  {
    id: 11,
    name: 'nausea_hypersensitivity',
    category: 'Dyskomfort',
    question: 'Poczucie mdłości lub nadwrażliwość.',
  },
  {
    id: 12,
    name: 'bitter_taste_in_mouth',
    category:
      'Phantogeusia (omamy smakowe) i parageusia (nieprawidłowe odczuwanie smaków)',
    question: 'Gorzki posmak w ustach.',
  },
  {
    id: 13,
    name: 'everything_is_bitter',
    category:
      'Phantogeusia (omamy smakowe) i parageusia (nieprawidłowe odczuwanie smaków)',
    question: 'Wszystko jest gorzkie.',
  },
  {
    id: 14,
    name: 'unpleasant_taste_in_mouth',
    category:
      'Phantogeusia (omamy smakowe) i parageusia (nieprawidłowe odczuwanie smaków)',
    question: 'Zły/ nieprzyjemny posmak w ustach.',
  },
  {
    id: 15,
    name: 'food_not_taste_as_should',
    category: 'Ogólne zmiany smaku ',
    question: 'Jedzenie nie smakuje tak jak powinno.',
  },
  {
    id: 16,
    name: 'everything_taste_bad',
    category: 'Ogólne zmiany smaku ',
    question: 'Wszystko smakuje źle.',
  },
  {
    id: 17,
    name: 'eat_difficulty',
    category: 'Ogólne zmiany smaku ',
    question: 'Mam trudności z jedzeniem.',
  },
  {
    id: 18,
    name: 'no_taste_or_smell',
    category: 'Ogólne zmiany smaku ',
    question: 'Nie można wyczuć zapachu lub smaku jedzenia.',
  },
];
