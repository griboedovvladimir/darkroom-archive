import { useParams } from 'react-router-dom';
import { useGetFilmByIdQuery } from '../../services/api-service';
import { FrameForm } from '../components/FrameForm';
import Title from 'antd/es/typography/Title';

export const EditFrame = () => {
  const {filmCode} = useParams();
  const { data: fetchedFilms, isLoading, refetch } = useGetFilmByIdQuery(filmCode);

  console.log(fetchedFilms);

  const code = '';

  return (
    <>
      <Title level={1}>Edit Frame {code}</Title>
      <FrameForm/>
    </>
  );
}