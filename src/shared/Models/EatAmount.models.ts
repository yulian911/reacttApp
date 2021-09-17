import { MealTypes } from "./Local/Meals.models";

export interface IEatAmount {
    id: number,
    type: MealTypes,
    percent: number,
    date: string,
    user: number,
}