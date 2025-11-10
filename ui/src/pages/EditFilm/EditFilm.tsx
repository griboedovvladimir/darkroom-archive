import { Breadcrumb, Button, Flex, Form, notification, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { formatFilmForm } from '../../hooks/formatFilmForm.ts';
import { useDeleteFilmMutation, useGetFilmByIdQuery, useUpdateFilmMutation } from '../../services/api-service';
import { FilmForm } from '../components/FilmForm';
import { Frames } from '../components/Frames/Frames.tsx';
import { QRCodeCreater } from '../components/QRCodeCreater/QRCodeCreater.tsx';
import { filmCodeFormator } from '../helpers/codeFormator.ts';
import { handleDelete } from '../helpers/handleDelete.tsx';

export const EditFilm = () => {
  const {id} = useParams();
  const {data: fetchedFilm, isLoading, refetch} = useGetFilmByIdQuery(id);
  const [update, {isSuccess, isError}] = useUpdateFilmMutation();
  const [deleteFilm] = useDeleteFilmMutation();

  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onHandleDelete = (id: string | undefined) => {
    handleDelete(id, deleteFilm, 'film').then(()=> {navigate('/')})
  };
  const onSave = async () => {
    await update({
      id: fetchedFilm._id,
      data: {
        ...fetchedFilm,
        ...formatFilmForm(form.getFieldsValue()),
      }
    });

    refetch();
  }

  const openSuccessNotification = () => {
    notification.success({
      message: 'Success!',
      description: 'Changes saved successfully.',
      placement: 'topRight',
    });
  };

  useEffect(() => {
    if (isSuccess) {
      openSuccessNotification();
    }

    if (isError) {
      notification.error({
        message: 'Error',
        description: 'Failed to save changes.',
        placement: 'topRight',
      });
    }
  }, [isSuccess, isError]);

  const code = filmCodeFormator(fetchedFilm);
  const breadcrumb = [{title: 'Film list', href: '/'}, {title: `Film ${code}`}];

  return (
    <>
      {isLoading && <Spin size="large" fullscreen/>}
      {!isLoading && <>
        <Breadcrumb items={breadcrumb} />
        <Flex align="top" gap={20} justify={'space-between'}>
          <Flex gap={20} >
          <QRCodeCreater code={code} />
            <Title level={1}>Film {code}</Title>
          </Flex>
          <Button type="primary" danger onClick={() => onHandleDelete(id)}>Delete</Button>
        </Flex>
        <FilmForm form={form} film={fetchedFilm} />
        <Flex justify="flex-end">
          <Button type="primary" onClick={onSave}>Save</Button>
        </Flex>
        <Frames code={filmCodeFormator(fetchedFilm)} film={fetchedFilm} update={update} refetch={refetch} />
      </>}
    </>
  );
}