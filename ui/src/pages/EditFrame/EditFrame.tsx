import { Breadcrumb, Button, Flex, Form, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IFrame } from '../../interfaces/IFrame';
import { useGetFilmByIdQuery } from '../../services/api-service';
import { FrameForm } from '../components/FrameForm';
import { QRCodeCreater } from '../components/QRCodeCreater/QRCodeCreater';
import { filmCodeFormator, frameCodeFormator } from '../helpers/codeFormator';
import { handleDelete } from '../helpers/handleDelete';
import { Prints } from '../components/Prints/Prints';

export const EditFrame = () => {
  const {filmCode, id} = useParams();
  const {data: fetchedFilm, isLoading} = useGetFilmByIdQuery(filmCode);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const code = frameCodeFormator(fetchedFilm, id);
  const breadcrumb = [
    {title: 'Film list', href: '/'},
    {title: `Film ${filmCodeFormator(fetchedFilm)}`, href: `/film/${fetchedFilm?.code}`},
    {title: code}
  ];
  const counts = fetchedFilm?.frames.map((frame: IFrame) => frame.frameCount);

  useEffect(() => {
    if (fetchedFilm && id) {
      const formData = {
        ...fetchedFilm.frames[Number(id) - 1],
        date: dayjs(fetchedFilm.frames[Number(id) - 1].date)
      }

      form.setFieldsValue(formData);
    }
  }, [fetchedFilm]);


  const onHandleDelete = () => {
    handleDelete(id, () => {
    }, 'frame').then(() => {
      navigate('/')
    })
  };

  const onSave = async () => {
    await update({
      id: fetchedFilm._id,
      data: {
        ...fetchedFilm,
      }
    });

    refetch();
  }

  return (
    <>
      {isLoading && <Spin size="large" fullscreen/>}
      {!isLoading && <>
				<Breadcrumb items={breadcrumb}/>
				<Flex align="top" gap={20} justify={'space-between'}>
					<Flex gap={20}>
						<QRCodeCreater code={code}/>
						<Title level={1}>Edit Frame {code}</Title>
					</Flex>
					<Button type="primary" danger onClick={() => onHandleDelete()}>Delete</Button>
				</Flex>
				<FrameForm form={form} counts={counts}/>
				<Flex justify="flex-end">
					<Button type="primary" onClick={onSave}>Save</Button>
				</Flex>
				<Prints frame={fetchedFilm.frames[Number(id) - 1]}/>
			</>}
    </>
  );
}