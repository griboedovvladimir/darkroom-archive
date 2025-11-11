import { IFilm } from "../interfaces/IFilm";
import {
  cameras,
  developerOptions,
  filmStocks,
} from "../constants/costants";

export const formatFilmForm = (filmForm: any): IFilm => {
  const filmStock = filmStocks?.find(
    (filmStock) => filmStock.value === filmForm.filmStock,
  );

  return {
    ...filmForm,
    useBy: filmForm.useBy?.format(),
    loadedDate: filmForm.loadedDate?.format(),
    developedDate: filmForm.developedDate?.format(),
    camera: cameras[filmForm.type]?.find(
      (camera) => camera.value === filmForm.camera,
    )?.label,
    developer: developerOptions?.find(
      (developer) => developer.value === filmForm.developer,
    )?.label,
    filmStock: filmStock?.label,
    iso: filmStock?.iso,
    color: filmStock?.color,
    // TODO - make separate logic for code generation
    // code: `0000${filmForm.type}${filmStock?.color}${filmStock?.iso}`,
  };
};
