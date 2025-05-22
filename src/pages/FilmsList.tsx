import { FilmForm } from "./components/FilmForm";
import { Button, Flex, Form, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { IFilm } from "../interfaces/IFilm.ts";
import { formatFilmForm } from "../hooks/formatFilmForm.ts";
import { availableColumns as defaultColumns } from "./constants/availableColumns.tsx";
import { useGetFilmsQuery, useAddFilmMutation, useDeleteFilmMutation } from "../services/api-service.ts";
import dayjs from "dayjs";
import { statusOptions } from "../constants/costants.ts";

export const FilmsList = () => {
  const defaultSelectedColumns = ['status', 'type', 'filmStock'];
  const [deleteFilm] = useDeleteFilmMutation();
  const onHandleDelete = async (id: any) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this film?',
      onOk: async () => {
        await deleteFilm(id).unwrap();
        refetch();
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  }
  const availableColumns = defaultColumns(onHandleDelete);
  const [columns, setColumns] = useState(availableColumns.filter((column) => [...defaultSelectedColumns, 'code'].includes(column.key) || column.key === 'action'));
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [form] = Form.useForm();
  const [films, setFilms] = useState<any[]>([]);
  const columnsOptions = [...availableColumns].filter(({key}) => key !=='action').map((column) => ({
    value: column.key,
    label: column.title,
  }));
  const { data: fetchedFilms, isLoading, refetch } = useGetFilmsQuery({});
  const [addFilm] = useAddFilmMutation();
  columnsOptions.shift();
  const onSelect = (selectedColumns: string | string[]) => {
    const newColumns = availableColumns.filter((column) => selectedColumns.includes(column.key));
    setColumns([availableColumns[0], ...newColumns, availableColumns[availableColumns.length - 1]]);
  }

  const mapFilmFields = (film: IFilm) => {

    return {
      ...film,
      loadedDate: film.loadedDate ? dayjs(film.loadedDate).format('MM/YYYY') : null,
      developedDate: film.developedDate ? dayjs(film.developedDate).format('MM/YYYY') : null,
      useBy: film.useBy ? dayjs(film.useBy).format('MM/YYYY') : null,
      status: statusOptions.find((status) => status.value === film.status)?.label,
      code: `${film.code.toString().padStart(4, '0')}${film.type === 'instant' ? 'I': film.type}${film.color}${film.iso}`,
    };
  }

  const onSave = async () => {
    const addedFilm = formatFilmForm(form.getFieldsValue());
    setFilms([...films, addedFilm]);
    setIsFormOpened(false);
    const res = await addFilm(addedFilm).unwrap();
    setFilms([...films, mapFilmFields(res)]);
  }

  const modalFooterButtons = [
    <Button key={'key'} type="primary" onClick={onSave}>Save</Button>
  ];

  useEffect(() => {
    if (fetchedFilms) {
      const formattedFilms = fetchedFilms.map((film: any) => mapFilmFields(film));
      setFilms(formattedFilms);
    }
  }, [fetchedFilms]);

  const dataSource = films.map((film) => ({
    ...film,
    frameCount: film.frames?.length,
  }));

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
        <Select style={{minWidth: '300px'}} mode="tags" options={columnsOptions} defaultValue={defaultSelectedColumns}
                onChange={onSelect}/>
        </Form.Item>
        <Button onClick={() => setIsFormOpened(true)} type="primary">Add film</Button>
      </Flex>
      <Table  style={{ maxWidth: 1000 }} dataSource={dataSource} columns={columns} loading={isLoading} rowKey="code"/>
    </div>
  );
}
