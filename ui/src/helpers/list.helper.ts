import { IFilm } from "../interfaces/IFilm.ts";
import { FilmStatus } from "../constants/fiimStatus.ts";
import dayjs from "dayjs";
import { FilmFresh } from "../enums/FilmFresh.tsx";
import { statusOptions } from "../constants/costants.ts";

export const isFresh = (film: IFilm) => {
  if (film.status === FilmStatus.Unexposed || film.status === FilmStatus.Loaded) {
    return dayjs(film.useBy).isBefore(dayjs())
      ? FilmFresh.Danger
      : dayjs(film.useBy).isBefore(dayjs().add(3, 'month'))
        ? FilmFresh.Warning
        : undefined;
  }
  return undefined;
};

const formatDate = (date: string) => date ? dayjs(date).format('MM/YYYY') : null;

export const  mapFilmFields = (film: IFilm) => {
  return {
    ...film,
    loadedDate: formatDate(film.loadedDate),
    developedDate: formatDate(film.developedDate),
    useBy: formatDate(film.useBy),
    status: statusOptions.find((status) => status.value === film.status)?.label,
    code: `${film.code.toString().padStart(4, '0')}${film.type === 'instant' ? 'I' : film.type}${film.color}${film.iso}`,
    fresh: isFresh(film),
    frameCount: film.frames?.length,
  };
}