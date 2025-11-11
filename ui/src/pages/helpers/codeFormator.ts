import { cameras } from "../../constants/costants";
import { IFilm } from "../../interfaces/IFilm";

export const filmCodeFormator = (film: IFilm) =>
  `${film?.code?.toString().padStart(4, "0")}${film?.type === "instant" ? "I" : film?.type}${film?.color}${film?.iso}`;

export const frameCodeFormator = (film: IFilm, frame?: string) =>
  `${filmCodeFormator(film)}-${frame}${cameras[film?.type]?.find((camera) => camera.label === film.camera)?.formatCode}`;
