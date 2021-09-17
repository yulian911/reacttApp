export interface IPatientProfile {
  id: number;
  date_of_birth: string;
  street: string;
  gender: string;
  height: number;
  body_weight: number;
  pal_ratio: string;
  first_name: string,
  last_name: string,
}

export interface IIce {
  id: number;
  last_name: string;
  address: string;
  first_name: string;
  phone_number: string;
}
