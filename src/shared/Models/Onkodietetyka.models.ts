import { IAllergyIntolerance } from "./AllergyIntolerance.models";
import { IBaseDisease } from "./BaseDisease.models";
import { ICoexistingDiseases } from "./CoexistingDiseases.models";
import { IDietPoll } from "./DietPoll.models";
import { IDrugsDiary } from "./DrugsDiary.models";
import { IMealDiary } from "./MealDiary.models";
import { ISpecialistClinicCare } from "./SpecialistClinicCare.models";

export interface IOnkodietetyka {
    user: number,
    body_mass: string,
    body_mass_3m: string,
    body_mass_6m: string,

    new_tastes_problem: number,
    new_nutrition_way_problem: number,
    new_supplememnts_problem: number,
    new_nutrition_way_help: string,
    
    meal_completion: number,
    physical_activity: number,

    is_used_diet: boolean,
    is_base_disease: boolean,
    is_coexisting_diseases: boolean,
    is_specialist_clinic_care: boolean,
    is_allergy_intolerance: boolean,

    base_disease: IBaseDisease | null,
    coexisting_diseases: ICoexistingDiseases[],
    specialist_clinic_care: ISpecialistClinicCare[],
    allergy_intolerance: IAllergyIntolerance[],
    used_diet_data: IDietPoll[],

    drugs_diary: IDrugsDiary[],
    meal_diary: IMealDiary[],
}