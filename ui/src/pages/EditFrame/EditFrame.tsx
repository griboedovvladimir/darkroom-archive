import { useParams } from 'react-router-dom';
import { useGetFilmsQuery } from '../../services/api-service';
import { FrameForm } from '../components/FrameForm';
import Title from 'antd/es/typography/Title';

export const EditFrame = () => {
  // const {data: fetchedFilms, isLoading, refetch} = useGetFilmsQuery({});

  const params = useParams();
  console.log(params);

  const code = '';

  return (
    <>
      <Title level={1}>Edit Frame {code}</Title>
      <FrameForm/>
    </>
  );
}