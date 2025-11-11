import { IPrint } from "./IPrint";

export interface IFrame {
  id: string;
  format?: string;
  frameCount?: number;
  lens?: string;
  lensFocalLength?: string;
  apertureValue?: string;
  focus?: string;
  date?: string;
  shooterSpeed?: string;
  location?: string;
  filter?: string;
  tripod?: boolean;
  flashlight?: boolean;
  notes?: string;
  prints?: IPrint[];
}
