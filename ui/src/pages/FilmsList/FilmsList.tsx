import { FilmForm } from "../components/FilmForm/index.ts";
import { Button, Flex, Form, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { IFilm } from "../../interfaces/IFilm.ts";
import { formatFilmForm } from "../../hooks/formatFilmForm.ts";
import { availableColumns as defaultColumns } from "../constants/availableColumns.tsx";
import { useGetFilmsQuery, useAddFilmMutation, useDeleteFilmMutation } from "../../services/api-service.ts";
import dayjs from "dayjs";
import { statusOptions } from "../../constants/costants.ts";
import { FilmStatus } from "../../constants/fiimStatus.ts";
import { useHandleDelete } from "../hooks/useHandleDelete.tsx";

enum FilmFresh {
  Danger = 'danger',
  Warning = 'warning',
}

const isFresh = (film: IFilm) => {
  if (film.status === FilmStatus.Unexposed || film.status === FilmStatus.Exposed || film.status === FilmStatus.Loaded) {
    return dayjs(film.useBy).isBefore(dayjs())
      ? FilmFresh.Danger
      : dayjs(film.useBy).isBefore(dayjs().add(3, 'month'))
        ? FilmFresh.Warning
        : undefined;
  }
  return undefined;
};

export const FilmsList = () => {
  const { data: fetchedFilms, isLoading, refetch } = useGetFilmsQuery({});
  const [deleteFilm] = useDeleteFilmMutation();
  const [addFilm] = useAddFilmMutation();

  const [isFormOpened, setIsFormOpened] = useState(false);
  const [form] = Form.useForm();
  const [films, setFilms] = useState<any[]>([]);
  
  const onHandleDelete = (id: string) => useHandleDelete(id, deleteFilm, refetch);

  const availableColumns = defaultColumns(onHandleDelete).map((column) => ({
    ...column,
    sorter: column.sorter
      ? (a: any, b: any) => column.sorter(a, b)
      : undefined,
  }));
  const defaultSelectedColumns = ['status', 'type', 'filmStock'];
  const [columns, setColumns] = useState(availableColumns.filter((column) => [...defaultSelectedColumns, 'code'].includes(column.key) || column.key === 'action'));
  const columnsOptions = [...availableColumns].filter(({ key }) => key !== 'action').map((column) => ({
    value: column.key,
    label: column.title,
  }));
  columnsOptions.shift();

  const formatDate = (date: string) => date ? dayjs(date).format('MM/YYYY') : null;

   useEffect(() => {
    if (fetchedFilms) {
      const formattedFilms = fetchedFilms.map((film: any) => mapFilmFields(film));
      setFilms(formattedFilms.reverse());
    }
  }, [fetchedFilms]);

  const mapFilmFields = (film: IFilm) => {
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

  const onSelect = (selectedColumns: string | string[]) => {
    const newColumns = availableColumns.filter((column) => selectedColumns.includes(column.key));
    setColumns([availableColumns[0], ...newColumns, availableColumns[availableColumns.length - 1]]);
  }

  const onSave = async () => {
    const addedFilm = formatFilmForm(form.getFieldsValue());
    await addFilm(addedFilm).unwrap();
    refetch();
    setIsFormOpened(false);
  }

  const modalFooterButtons = [
    <Button key={'key'} type="primary" onClick={onSave}>Save</Button>
  ];

  return (
    <div className="main">
      {isFormOpened && <Modal
        footer={modalFooterButtons}
        open={isFormOpened}
        onCancel={() => setIsFormOpened(false)}
      >
        <FilmForm form={form} />
      </Modal>}
      <Flex className="topControls" flex={1} justify={"space-between"}>
        <Form.Item label="Show columns">
          <Select style={{ minWidth: '300px' }} mode="tags" options={columnsOptions} defaultValue={defaultSelectedColumns}
            onChange={onSelect} />
        </Form.Item>
        <Button onClick={() => setIsFormOpened(true)} type="primary">Add film</Button>
      </Flex>
      <Table
        style={{ maxWidth: '80vw' }}
        dataSource={films}
        columns={columns}
        loading={isLoading}
        rowKey="code"
        rowClassName={(record: any) => {
          if (record.fresh === FilmFresh.Danger) return 'row-error';
          if (record.fresh === FilmFresh.Warning) return 'row-warning';
          return '';
        }}
      />
    </div>
  );
}
