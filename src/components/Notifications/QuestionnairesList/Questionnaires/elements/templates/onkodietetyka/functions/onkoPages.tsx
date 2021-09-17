export const onkoPages: any[] = [
  {
    id: 1,
    title: 'Metryczka',
  },
  {
    id: 2,
    title: 'Trudnosci w wprowadzaniu zmian',
    name: 'new_tastes_problem',
    question:
      'Czy wprowadzanie nowych smaków produktów do diety sprawia Ci czasem problem?',
  },
  {
    id: 3,
    title: 'Trudnosci w wprowadzaniu zmian',
    name: 'new_nutrition_way_problem',
    question:
      'Czy jesteś gotowy całkowicie zmienić dotychczasowy sposób żywienia?',
  },
  {
    id: 4,
    title: 'Trudnosci w wprowadzaniu zmian',
    name: 'new_supplememnts_problem',
    question:
      'Czy wprowadzanie koniecznych suplementów diety sprawi Ci problem?',
  },
  {
    id: 5,
    title: 'Trudnosci w wprowadzaniu zmian',
    question:
      'Jak myślisz co mogłoby Ci pomóc w zmianie dotychczasowych nawyków oraz przejściu na nowy model żywienia?',
  },
  {
    id: 6,
    title: 'Stan zdrowia',
  },
  {
    id: 7,
    title: 'Spożycie posiłków',
    question: 'Spożycie pokarmów wciągu ostatniego tygodnia:',
    name: 'meal_completion',

    radioBtns: [
      {
        value: 25,
        text: '0-25%',
      },
      {
        value: 50,
        text: '26-50%',
      },
      {
        value: 75,
        text: '51-75%',
      },
      {
        value: 100,
        text: '76-100%',
      },
    ],
  },
  {
    id: 8,
    title: 'Aktywność fizyczna',
    question: 'Wskaz rodzaj średniej aktywności w ciągu ostatniego miesiąca.',
    name: 'physical_activity',
  },
  {
    id: 9,
    title: 'Przyjmowane leki i suplementy',
  },
  {
    id: 10,
    title: '3-dniowy dzienniczek żywieniowy',
  },
  {
    id: 11,
    title: 'Alergie i nietolerncje pokarmowe',
  },
];
