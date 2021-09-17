export type AllergiesType = 'allergy' | 'intolerance';

export interface IAllergiesTypes {
    id: number,
    title: string,
    type: AllergiesType,
}