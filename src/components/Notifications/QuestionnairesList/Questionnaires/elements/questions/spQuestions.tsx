export interface IspQuestions {
  id: number;
  name: string;
  question: string;
}

export const spQuestions: IspQuestions[] = [
  {
    id: 1,
    name: 'mass_loss',
    question: 'Problemy z połykaniem spowodowały utratę mojej masy ciała.',
  },
  {
    id: 2,
    name: 'outdoor_swallow_difficulty',
    question:
      'Moje problemy z połykaniem utrudniają mi spożywanie posiłków poza domem.',
  },
  {
    id: 3,
    name: 'liquid_drink_difficulty',
    question: 'Połykanie płynów wymaga zwiększonego wysiłku.',
  },
  {
    id: 4,
    name: 'solid_food_eat_difficulty',
    question: 'Połykanie pokarmów stałych wymaga zwiększonego wysiłku.',
  },
  {
    id: 5,
    name: 'drugs_swallow_difficulty',
    question: 'Połykanie tabletek wymaga zwiększonego wysiłku.',
  },
  {
    id: 6,
    name: 'swallow_pain',
    question: 'Połykanie jest bolesne.',
  },
  {
    id: 7,
    name: 'swallow_meal_enjoy',
    question:
      'Problemy z połykaniem niekorzystnie wpływają na odczuwanie przyjemności podczas jedzenia.',
  },
  {
    id: 8,
    name: 'food_stuck_in_throat',
    question: 'Podczas połykania jedzenie staje mi w gardle.',
  },
  {
    id: 9,
    name: 'cough_during_meal',
    question: 'Kaszlę podczas jedzenia.',
  },
  {
    id: 10,
    name: 'swollow_stress',
    question: 'Połykanie jest stresujące.',
  },
];
