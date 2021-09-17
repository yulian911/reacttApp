export type MealTypes = 'breakfast' | 'second_breakfast' | 'lunch' | 'dinner';

export interface IMealTypes {
    id: number;
    title: string;
    type: MealTypes;
  }