import { getAllCameraOptions, statusOptions, typeOptions } from '../../constants/costants';

//TODO: Move type to common types file
export type FilmListSorter = { status: number } & { loadedDate: number } & { type: number } & { filmStock: number };

//TODO: Change keys to enyum values
export const getAvailableColumns = () => [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    defaultFilteredValue: [
      statusOptions[0].value, 
      statusOptions[1].value, 
 
    ],
    filters: statusOptions.map(({value, label}) => ({
      text: label,
      value,
    })),
    onFilter: (value: string, record: { status: string }) => record.status.toLowerCase() === value,
    sorter: (a: FilmListSorter, b: FilmListSorter) => a.status !== b.status ? a.status < b.status ? -1 : 1 : 0,
  },
  {
    title: 'Use By',
    dataIndex: 'useBy',
    key: 'useBy',
  },
  {
    title: 'Loaded Date',
    dataIndex: 'loadedDate',
    key: 'loadedDate',
    sorter: (a: FilmListSorter, b: FilmListSorter) => a.loadedDate - b.loadedDate,
  },
  {
    title: 'Developed Date',
    dataIndex: 'developedDate',
    key: 'developedDate',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    onFilter: (value: string, record: { type: string | string[]; }) => record.type.includes(value as string),
    filters: typeOptions.map(({value, label}) => ({
      text: label,
      value,
    })),
    sorter: (a: FilmListSorter, b: FilmListSorter) => a.type !== b.type ? a.type < b.type ? -1 : 1 : 0,
  },
  {
    title: 'Film Stock',
    dataIndex: 'filmStock',
    key: 'filmStock',
    sorter: (a: FilmListSorter, b: FilmListSorter) =>
      a.filmStock !== b.filmStock ? a.filmStock < b.filmStock ? -1 : 1 : 0,
  },
  {
    title: 'Camera',
    dataIndex: 'camera',
    key: 'camera',
    filters: getAllCameraOptions().map(({value, label}) => ({
      text: label,
      value,
    })),
    onFilter: (value: string, record: {
      camera: string
    }) => record.camera === getAllCameraOptions().find(option => option.value === Number(value))?.label
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Frame count',
    dataIndex: 'frameCount',
    key: 'frameCount',
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
  }
]