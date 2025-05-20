import { Button, Flex } from "antd";
import { Link } from "react-router-dom";

export const availableColumns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: (a: { status: number; }, b: { status: number; }) => a.status - b.status,
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
  },
  {
    title: 'Film Stock',
    dataIndex: 'filmStock',
    key: 'filmStock',
    sorter: (a: { filmStock: number; }, b: { filmStock: number; }) => a.filmStock - b.filmStock,
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
    render: (_, record: any) => (
      <Flex gap={10}>
      <Link to={`/edit/${record._id}`}>Edit</Link>
        <Button onClick={() => console.log(record)}>
          {"Delete"}
        </Button>
      </Flex>
    ),
  },
]