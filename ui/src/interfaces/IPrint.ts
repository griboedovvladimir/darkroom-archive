export interface IPrint {
  id: string;
  frameId: string;
  printNumber: number;
  printDate: string;
  printSize: string;
  paper: string;
  enlarger: string;
  lens: string;
  lensFocalLength: string;
  aperture: string;
  shutterSpeed?: string;
  developer: string;
  developerTime: string;
  pullPush: string;
  toner?: string;
  notes?: string;
}
