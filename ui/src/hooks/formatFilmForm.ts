import { IFilm } from "../interfaces/IFilm.ts";
import { Cameras, developerOptions, filmStocks } from "../constants/costants.ts";

export const formatFilmForm = (filmForm: any): IFilm => {
  const filmstock = filmStocks?.find((filmStock) => filmStock.value === filmForm.filmStock);

  return {
    ...filmForm,
    useBy: filmForm.useBy?.format(),
    loadedDate: filmForm.loadedDate?.format(),
    developedDate: filmForm.developedDate?.format(),
    camera: Cameras[filmForm.type]?.find((camera) => camera.value === filmForm.camera)?.label,
    developer: developerOptions?.find((developer) => developer.value === filmForm.developer)?.label,
    filmStock: filmstock?.label,
    iso: filmstock?.iso,
    color: filmstock?.color,
    frames: [],
    // TODO - make separate logic for code generation
    // code: `0000${filmForm.type}${filmstock?.color}${filmstock?.iso}`,
  };
}