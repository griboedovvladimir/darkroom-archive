import { Breadcrumb, Button, Flex, Form, notification, QRCode, Spin } from 'antd';
import { FilmForm } from '../components/FilmForm';
import Title from 'antd/es/typography/Title';
import { useDeleteFilmMutation, useGetFilmsQuery, useUpdateFilmMutation } from '../../services/api-service';
import { useParams } from 'react-router';
import styles from './EditFilm.module.css';
import { useEffect, useRef } from 'react';
import { useHandlePrint } from '../hooks/useHandlePrint';
import { Frames } from '../components/Frames/Frames.tsx';
import { useHandleDelete } from '../hooks/useHandleDelete.tsx';

export const EditFilm = () => {
  const {data: fetchedFilms, isLoading, refetch} = useGetFilmsQuery({});
  const [update, {isSuccess, isError}] = useUpdateFilmMutation();
  const [deleteFilm] = useDeleteFilmMutation();
  const {id} = useParams();
  const film = fetchedFilms?.find((film: { _id: string | undefined; }) => film._id === id);
  const [form] = Form.useForm();
  const onHandleDelete = (id: string) => useHandleDelete(id, deleteFilm);
  const onSave = async () => {
    await update({
      id: film._id,
      data: {
        ...film,
        ...form.getFieldsValue(),
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


  const code = `${film?.code.toString().padStart(4, '0')}${film?.type === 'instant' ? 'I' : film?.type}${film?.color}${film?.iso}`;

  const qrWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className="main">
      {isLoading && <Spin size="large" fullscreen/>}
      <Breadcrumb items={[{title: 'Film list', href: '/'}, {title: 'Edit film'}]}/>
      <Flex align="top" gap={20} justify={'space-between'}>
        <div>
          <div className={styles.qrCode} ref={qrWrapperRef}>
            <QRCode
              bordered={false}
              type="canvas"
              size={256}
              style={{height: 'auto', width: '100px', cursor: 'pointer'}}
              value={code}
              onClick={() => useHandlePrint(qrWrapperRef, code)}
            />
          </div>
          <Title level={1}>Edit Film {code}</Title>
        </div>
        <Button type="primary" danger onClick={() => onHandleDelete(film.id)}>Delete</Button>
      </Flex>
      {!isLoading && <FilmForm form={form} film={film}/>}
      <Flex justify="flex-end"><Button type="primary" onClick={onSave}>Save</Button></Flex>
      <Frames code={code} film={film} update={update} refetch={refetch}/>
    </div>
  );
}