import {  TimeTypes } from "./Local/TimeUnits.models";

export interface IDietPoll {
    period: number,
    unit: TimeTypes,
    additional_info: string,
    diet: number,
}