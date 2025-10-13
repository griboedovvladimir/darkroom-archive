import { Breadcrumb, Button, Flex, Form, notification, QRCode, Spin } from 'antd';
import { FilmForm } from '../components/FilmForm';
import Title from 'antd/es/typography/Title';
import { useDeleteFilmMutation, useGetFilmsQuery, useUpdateFilmMutation } from '../../services/api-service';
import { useParams } from 'react-router';
import styles from './EditFilm.module.css';
import { useEffect, useRef } from 'react';
import { handlePrint } from '../helpers/handlePrint.tsx';
import { Frames } from '../components/Frames/Frames.tsx';
import { handleDelete } from '../helpers/handleDelete.tsx';
import { useNavigate } from 'react-router-dom';
import { formatFilmForm } from '../../hooks/formatFilmForm.ts';
import { codeFormator } from '../helpers/codeFormator.ts';

export const EditFilm = () => {
  const {data: fetchedFilms, isLoading, refetch} = useGetFilmsQuery({});
  const [update, {isSuccess, isError}] = useUpdateFilmMutation();
  const [deleteFilm] = useDeleteFilmMutation();

  const {id} = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const film = fetchedFilms?.find((film: { _id: string | undefined; }) => film._id === id);
  const onHandleDelete = (id: string | undefined) => {
    handleDelete(id, deleteFilm).then(()=> {navigate('/')} )
  };
  const onSave = async () => {
    await update({
      id: film._id,
      data: {
        ...film,
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

  const code = codeFormator(film);

  const qrWrapperRef = useRef<HTMLDivElement>(null);
  const breadcrumb = [{title: 'Film list', href: '/'}, {title: 'Edit film'}];

  return (
    <>
      {isLoading && <Spin size="large" fullscreen/>}
      <Breadcrumb items={breadcrumb}/>
      <Flex align="top" gap={20} justify={'space-between'}>
        <div>
          <div className={styles.qrCode} ref={qrWrapperRef}>
            <QRCode
              bordered={false}
              type="canvas"
              size={256}
              style={{height: 'auto', width: '100px', cursor: 'pointer'}}
              value={code}
              onClick={() => handlePrint(qrWrapperRef, code)}
            />
          </div>
          <Title level={1}>Edit Film {code}</Title>
        </div>
        <Button type="primary" danger onClick={() => onHandleDelete(id)}>Delete</Button>
      </Flex>
      {!isLoading && <FilmForm form={form} film={film}/>}
      <Flex justify="flex-end">
        <Button type="primary" onClick={onSave}>Save</Button>
      </Flex>
      <Frames code={codeFormator(film)} film={film} update={update} refetch={refetch}/>
    </>
  );
}