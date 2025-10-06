import { FilmForm } from '../components/FilmForm';
import { Button, Flex, Form, Modal, Select, Table } from 'antd';
import { useEffect, useState } from 'react';
import { IFilm } from '../../interfaces/IFilm.ts';
import { formatFilmForm } from '../../hooks/formatFilmForm.ts';
import { availableColumns as defaultColumns } from '../constants/availableColumns.tsx';
import { useGetFilmsQuery, useAddFilmMutation } from '../../services/api-service.ts';
import { useNavigate } from 'react-router-dom';
import { FilmFresh } from '../../enums/FilmFresh.tsx';
import { mapFilmFields } from '../../helpers/list.helper.ts';
import styles from './FilmsList.module.css';
import { ColumnsType } from 'antd/es/table';

export const FilmsList = () => {
  const {data: fetchedFilms, isLoading, refetch} = useGetFilmsQuery({});
  const [addFilm] = useAddFilmMutation();

  const [isFormOpened, setIsFormOpened] = useState(false);
  const [form] = Form.useForm();
  const [films, setFilms] = useState<IFilm[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  const availableColumns = defaultColumns()
    .map((column) => ({
    ...column,
    sorter: column.sorter
      ? (a: any, b: any) => column.sorter(a, b)
      : undefined,
  }));
  const defaultSelectedColumns = ['status', 'type', 'filmStock', 'camera'];
  const [columns, setColumns] = useState(
    availableColumns.filter((column) =>
      [...defaultSelectedColumns, 'code'].includes(column.key) || column.key === 'action'));
  const columnsOptions =
    [...availableColumns]
      .filter(({key}) => key !== 'action')
      .map((column) => ({
    value: column.key,
    label: column.title,
  }));
  columnsOptions.shift();


  useEffect(() => {
    if (fetchedFilms) {
      setFilms(fetchedFilms.map((film: IFilm) => mapFilmFields(film)).reverse());
    }
  }, [fetchedFilms]);

  const onSelect = (selectedColumns: string | string[]) => {
    const newColumns =
      availableColumns.filter((column) => selectedColumns.includes(column.key));
    setColumns([availableColumns[0], ...newColumns, availableColumns[availableColumns.length - 1]]);
  }

  const onSave = async () => {
    const addedFilm = formatFilmForm(form.getFieldsValue());
    await addFilm(addedFilm).unwrap();
    refetch();
    setIsFormOpened(false);
  }

  const modalFooterButtons = [<Button key={'key'} type="primary" onClick={onSave}>Save</Button>];

  return (
    <div className="main">
      {isFormOpened && <Modal
				footer={modalFooterButtons}
				open={isFormOpened}
				onCancel={() => setIsFormOpened(false)}
			>
				<FilmForm form={form}/>
			</Modal>}
      <Flex className="topControls" flex={1} justify={'space-between'}>
        <Form.Item label="Show columns">
          <Select
            className={styles.columnSelector}
            mode="tags"
            options={columnsOptions}
            defaultValue={defaultSelectedColumns}
            onChange={onSelect}
          />
        </Form.Item>
        <Button onClick={() => setIsFormOpened(true)} type="primary">Add film</Button>
      </Flex>
      <Table
        className={styles.table}
        dataSource={films}
        columns={columns as ColumnsType<IFilm>}
        loading={isLoading}
        rowKey="code"
        pagination={{
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '50'],
          onShowSizeChange: (_current, size) => {
            setPageSize(size);
          },
        }}
        onRow={(record) => ({onClick: () => navigate(`/edit/${record._id}`)})}
        rowClassName={(record: IFilm) => {
          if (record.fresh === FilmFresh.Danger) return 'row-error';
          if (record.fresh === FilmFresh.Warning) return 'row-warning';
          return '';
        }}
      />
    </div>
  );
}
