import { AllergiesType } from "./Local/Allergies.models";

export interface IAllergyIntolerance {
    type: AllergiesType,
    name: string,
    symptoms: string,
    diagnosed_by: string,
    treatment: string,
}