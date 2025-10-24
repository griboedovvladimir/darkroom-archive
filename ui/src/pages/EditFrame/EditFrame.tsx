import { FrameForm } from '../components/FrameForm';
import Title from 'antd/es/typography/Title';

export const EditFrame = () => {

  const code = '';

  return (
    <>
      <Title level={1}>Edit Frame {code}</Title>
      <FrameForm/>
    </>
  );
}