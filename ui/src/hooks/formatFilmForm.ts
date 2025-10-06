import { IFilm } from "../interfaces/IFilm.ts";
import { cameras, developerOptions, filmStocks } from "../constants/costants.ts";

export const formatFilmForm = (filmForm: any): IFilm => {
  const filmStock = filmStocks?.find((filmStock) => filmStock.value === filmForm.filmStock);

  return {
    ...filmForm,
    useBy: filmForm.useBy?.format(),
    loadedDate: filmForm.loadedDate?.format(),
    developedDate: filmForm.developedDate?.format(),
    camera: cameras[filmForm.type]?.find((camera) => camera.value === filmForm.camera)?.label,
    developer: developerOptions?.find((developer) => developer.value === filmForm.developer)?.label,
    filmStock: filmStock?.label,
    iso: filmStock?.iso,
    color: filmStock?.color,
    frames: [],
    // TODO - make separate logic for code generation
    // code: `0000${filmForm.type}${filmStock?.color}${filmStock?.iso}`,
  };
}