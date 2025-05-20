import { Breadcrumb, Button, Flex, Form } from "antd";
import { FilmForm } from "./components/FilmForm";
import Title from "antd/es/typography/Title";
import { useGetFilmsQuery } from "../services/api-service";
import { useParams } from "react-router";

export const EditFilm = () => {
  const { data: fetchedFilms, isLoading } = useGetFilmsQuery({});
  const { id } = useParams();
  const film = fetchedFilms?.find((film) => film._id === id);
  const [form] = Form.useForm();
  const onSave = async () => {
    const values = form.getFieldsValue();
    console.log(values);
  }


  return (
    <div className="main">
      <Breadcrumb items={[{ title: 'Film list', href: '/' }, { title: 'Edit film' }]} />
      <Title level={1} >Edit Film</Title>
      {!isLoading && <FilmForm form={form} film={film}/>}
      <Flex justify="flex-end"><Button type="primary" onClick={onSave}>Save changes</Button></Flex>
      <Title level={1}>Frames</Title>
      <Button type="primary">Add Frame</Button>
    </div>
  );
}