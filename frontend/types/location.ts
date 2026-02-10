export type AllowedLocation =
  | 'Mzuzu University'
  | 'Mzuzu Central Hospital'
  | 'Luwinga'
  | 'Area 1B'
  | 'KAKA';



export interface LocationValidationResponse {
  isValid: boolean;
  message?: string;
}
