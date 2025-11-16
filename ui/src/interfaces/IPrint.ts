export interface IPrint {
  id: string;
  printNumber: number;
  date: string;
  paperSize: string;
  paperType: string;
  enlarger: string;
  lens: string;
  lensFocalLength: string;
  aperture: string;
  shutterSpeed?: string;
  toner?: string;
  notes?: string;
}
