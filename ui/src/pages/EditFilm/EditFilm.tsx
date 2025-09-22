import { Breadcrumb, Button, Flex, Form, notification, QRCode, Spin } from 'antd';
import { FilmForm } from '../components/FilmForm';
import Title from 'antd/es/typography/Title';
import { useGetFilmsQuery, useUpdateFilmMutation } from '../../services/api-service';
import { useParams } from 'react-router';
import styles from './EditFilm.module.css';
import { useEffect, useRef } from 'react';
import { useHandlePrint } from '../hooks/useHandlePrint';

export const EditFilm = () => {
  const {data: fetchedFilms, isLoading, refetch} = useGetFilmsQuery({});
  const [update, {isSuccess, isError}] = useUpdateFilmMutation();
  const {id} = useParams();
  const film = fetchedFilms?.find((film: { _id: string | undefined; }) => film._id === id);
  const [form] = Form.useForm();
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
  });


  const code = `${film?.code.toString().padStart(4, '0')}${film?.type === 'instant' ? 'I' : film?.type}${film?.color}${film?.iso}`;

  const qrWrapperRef = useRef<HTMLDivElement>(null);

  const isFrames = film?.status !== 'unexposed' && film?.status !== 'exposed' && film?.status !== 'loaded';

  const addFrame = async (frameNumber?: number) => {
    await update({
      id: film._id,
      data: {
        ...film,
        frames: frameNumber ? film.frames.filter((_: any, i: number) => i !== frameNumber) : [...(film.frames || []), {id: (film.frames?.length || 0) + 1}],
      }
    });

    refetch();
  }

  return (
    <div className="main">
      {isLoading && <Spin size="large" fullscreen/>}
      <Breadcrumb items={[{title: 'Film list', href: '/'}, {title: 'Edit film'}]}/>
      <Flex align="top" gap={20}>
        <div className={styles.qrCode} ref={qrWrapperRef} onClick={() => useHandlePrint(qrWrapperRef)}>
          <QRCode
            bordered={false}
            type="canvas"
            size={256}
            style={{height: 'auto', width: '100px'}}
            value={code}
          />
        </div>
        <Title level={1}>Edit Film {code}</Title>
      </Flex>
      {!isLoading && <FilmForm form={form} film={film}/>}
      <Flex justify="flex-end"><Button type="primary" onClick={onSave}>Save changes</Button></Flex>
      {isFrames && <div>
				<Title level={1}>Frames</Title>
				<Flex gap={10} wrap>
          {film?.frames.map((frame: { id: string; }, index: number) => (
            <div className={styles.frameCard} key={index}>
              <div>
                <div>Frame {`${code}-${frame.id}`}</div>
              </div>
              <Button type="primary" danger onClick={() => addFrame(index)}>X</Button>
            </div>
          ))}
					<Button style={{height: 100, width: 100, padding: 0}} onClick={() => addFrame()}>
						<div className={styles.addButton}>
							<div>Add Frame</div>
							<div>+</div>
						</div>
					</Button>
				</Flex>
			</div>}
    </div>
  );
}