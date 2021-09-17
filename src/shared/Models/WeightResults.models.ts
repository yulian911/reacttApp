export interface IWeightResults {
  id: number
  lbm: number // Masa beztłuszczowa
  bmr: number // Bazowe zuzycie energii
  fat_percentage: number // Tłuszcz %
  water_percentage: number // Woda %
  bone_mass: number // Masa szkieletu
  muscle_mass: number // Masa mięśni
  visceral_fat: number // Tłuszcz trzewny
  bmi: number // BMI
  ideal_weight: number // Idealna waga
  protein_percentage: number // Białko %
  weight: number // Waga
  user_scale_results_id: number
}
