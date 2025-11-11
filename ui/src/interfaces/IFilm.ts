import { IFrame } from "./IFrame";

export interface IFilm {
  code?: number;
  id: string;
  _id?: string;
  iso?: number;
  color?: string;
  process?: string;
  status: string;
  loadedDate: string;
  developedDate: string;
  type: string;
  filmStock: string;
  camera: string;
  location: string;
  scanner: string;
  useBy: string;
  format: string;
  developer: string;
  developerTime: string;
  pullPush: string;
  notes: string;
  frames?: IFrame[];
  createdAt?: string;
  updatedAt?: string;
  fresh?: "danger" | "warning";
}
