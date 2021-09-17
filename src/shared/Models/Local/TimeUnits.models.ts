export type TimeTypes = 'day' | 'week' | 'month' | 'year';

export interface ITimeUnits {
    id: number;
    title: string;
    type: TimeTypes;
  }