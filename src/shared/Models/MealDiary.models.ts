import { MealTypes } from "./Local/Meals.models";
import { IMealProduct } from "./MealProduct.models";

export interface IMealDiary {
  meal_diary_products: IMealProduct[],
  date_time: string,
  note: string,
  type: MealTypes,
}