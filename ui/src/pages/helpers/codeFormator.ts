import { IFilm } from '../../interfaces/IFilm.ts';

export const codeFormator =
  (film: IFilm) =>
    `${film?.code.toString().padStart(4, '0')}${film?.type === 'instant' ? 'I' : film?.type}${film?.color}${film?.iso}`
