import { Button } from "antd";
import { statusOptions, typeOptions } from "../../constants/costants";

export const availableColumns = (deleteCallback: (arg0: any) => void) => [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    filters: statusOptions.map(({value, label}) => ({
      text: label,
      value,
    })),
    onFilter: (value: string, record: { status: string }) => record.status.toLowerCase() === value,
    sorter: (a: { status: number; }, b: {
      status: number;
    }) => a.status !== b.status ? a.status < b.status ? -1 : 1 : 0,
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
    sorter: (a: { loadedDate: number; }, b: { loadedDate: number; }) => a.loadedDate - b.loadedDate,
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
    sorter: (a: { type: number; }, b: { type: number; }) => a.type !== b.type ? a.type < b.type ? -1 : 1 : 0,
  },
  {
    title: 'Film Stock',
    dataIndex: 'filmStock',
    key: 'filmStock',
    sorter: (a: { filmStock: number; }, b: {
      filmStock: number;
    }) => a.filmStock !== b.filmStock ? a.filmStock < b.filmStock ? -1 : 1 : 0,
  },
  {
    title: 'Camera',
    dataIndex: 'camera',
    key: 'camera',
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
  },
  {
    title: '',
    key: 'action',
    dataIndex: 'action',
    width: 100,
    render: (_: any, record: any) => (
      <Button onClick={() => deleteCallback(record._id)} type="primary" danger>
        {"Delete"}
      </Button>
    ),
  },
]