import { FilmForm } from "./components/FilmForm";
import { Button, Flex, Form, Modal, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { IFilm } from "../interfaces/IFilm.ts";
import { formatFilmForm } from "../hooks/formatFilmForm.ts";
import { availableColumns } from "./constants/availableColumns.tsx";
import { useGetFilmsQuery, useAddFilmMutation } from "../services/api-service.ts";
import dayjs from "dayjs";
import { statusOptions } from "../constants/costants.ts";

export const FilmsList = () => {
  const defaultSelectedColumns = ['status', 'type', 'filmStock'];
  const [columns, setColumns] = useState(availableColumns.filter((column) => [...defaultSelectedColumns, 'code'].includes(column.key) || column.key === 'action'));
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [form] = Form.useForm();
  const [films, setFilms] = useState<any[]>([]);
  const columnsOptions = [...availableColumns].filter(({key}) => key !=='action').map((column) => ({
    value: column.key,
    label: column.title,
  }));
  const { data: fetchedFilms, isLoading } = useGetFilmsQuery({});
  const [addFilm] = useAddFilmMutation();
  columnsOptions.shift();
  const onSelect = (selectedColumns: string | string[]) => {
    const newColumns = availableColumns.filter((column) => selectedColumns.includes(column.key));
    setColumns([availableColumns[0], ...newColumns, availableColumns[availableColumns.length - 1]]);
  }

  const mapFilmFields = (film: IFilm) => {
    return {
      ...film,
      loadedDate: film.loadedDate ? dayjs(film.loadedDate) : null,
      developedDate: film.developedDate ? dayjs(film.developedDate) : null,
      useBy: film.useBy ? dayjs(film.useBy) : null,
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
      <Table dataSource={dataSource} columns={columns} loading={isLoading} rowKey="code"/>
    </div>
  );
}
