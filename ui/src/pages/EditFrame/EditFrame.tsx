import { useParams } from 'react-router-dom';
import { useGetFilmByIdQuery } from '../../services/api-service';
import { FrameForm } from '../components/FrameForm';
import Title from 'antd/es/typography/Title';
import { Breadcrumb, Button, Flex, Spin } from 'antd';
import { frameCodeFormator } from '../helpers/codeFormator';
import { QRCodeCreater } from '../components/QRCodeCreater/QRCodeCreater';

export const EditFrame = () => {
  const {filmCode, id} = useParams();
  const { data: fetchedFilms, isLoading } = useGetFilmByIdQuery(filmCode);
  
  const code = frameCodeFormator(fetchedFilms, id);
  const breadcrumb = [
    {title: 'Film list', href: '/'}, 
    {title: `Film ${code}`, href: `/film/${fetchedFilms?.code}`}, 
    {title: 'Edit Frame'}
  ];
  
  const onHandleDelete = () => {
    console.log('Delete');
  };

  return (
    <>
      {isLoading && <Spin size="large" fullscreen/>}
      {!isLoading && <>
        <Breadcrumb items={breadcrumb} />
        <Flex align="top" gap={20} justify={'space-between'}>
          <Flex gap={20} >
            <QRCodeCreater code={code} />
            <Title level={1}>Edit Frame {code}</Title>
          </Flex>
          <Button type="primary" danger onClick={() => onHandleDelete()}>Delete</Button>
        </Flex>
        <FrameForm />
      </>}
    </>
  );
}