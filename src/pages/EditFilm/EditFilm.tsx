import { Breadcrumb, Button, Flex, Form, notification, QRCode } from "antd";
import { FilmForm } from "../components/FilmForm";
import Title from "antd/es/typography/Title";
import { useGetFilmsQuery, useUpdateFilmMutation } from "../../services/api-service";
import { useParams } from "react-router";
import styles from './EditFilm.module.css';
import { useEffect, useRef, useState } from "react";

export const EditFilm = () => {
  const [frames, setFrames] = useState<{ [key: string]: any }[]>([]);
  const { data: fetchedFilms, isLoading } = useGetFilmsQuery({});
  const [update, { isSuccess, isError }] = useUpdateFilmMutation();
  const { id } = useParams();
  const film = fetchedFilms?.find((film) => film._id === id);
  const [form] = Form.useForm();
  const onSave = async () => {
    update({
      id: film._id,
      data: {
        ...film,
        ...form.getFieldsValue(),
      }
    });
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

  const addFrame = () => {
    setFrames([...frames, { id: frames.length + 1 }]);
  }

  const code = `${film?.code.toString().padStart(4, '0')}${film?.type === 'instant' ? 'I' : film?.type}${film?.color}${film?.iso}`;

  const qrWrapperRef = useRef(null);

  const handlePrint = () => {
    const canvas = qrWrapperRef?.current?.querySelector('canvas') || qrWrapperRef?.current?.querySelector('img');

    if (!canvas) {
      alert('QR код ещё не готов');
      return;
    }

    const dataUrl = canvas.toDataURL ? canvas.toDataURL() : canvas.src;

    const printWindow = window.open('', '_blank');
    printWindow?.document.open();
    printWindow?.document.write(`
      <html>
        <head></head>
        <style>
        @media print {
  @page {
    margin: 0; /* убрать поля (если браузер позволит) */
  }

  body {
    margin: 0;
    padding: 0;
  }
  header, footer, nav, .no-print {
    display: none !important;
  }
}</style>
        <body style="margin:0; padding:0;">
          <img src="${dataUrl}" style="width:100px;">
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            }
          </script>
        </body>
      </html>
    `);
    printWindow?.document.close();
  };


  return (
    <div className="main">
      <Breadcrumb items={[{ title: 'Film list', href: '/' }, { title: 'Edit film' }]} />
      <Flex align="top" gap={20}>
        <div className={styles.qrCode} ref={qrWrapperRef} onClick={handlePrint}>
        <QRCode
          bordered={false}
          type="canvas"
          size={256}
          style={{ height: "auto", width: "100px" }}
          value={code}
        />
        </div>
        <Title level={1}>Edit Film {code}</Title>
      </Flex>
      {!isLoading && <FilmForm form={form} film={film} />}
      <Flex justify="flex-end"><Button type="primary" onClick={onSave}>Save changes</Button></Flex>
      <Title level={1}>Frames</Title>
      <Flex gap={10} wrap>
        {frames.map((frame, index) => (
          <div style={{ height: 100, width: 100, padding: 0 }} key={index}>
            <div>
              <div>Frame {frame.id}</div>
            </div>
            <Button type="primary" danger onClick={() => {
              setFrames(frames.filter((_, i) => i !== index));
            }}>Delete</Button>
          </div>
        ))}
        <Button style={{ height: 100, width: 100, padding: 0 }} onClick={addFrame}><div className={styles.addButton}><div>Add Frame</div><div>+</div></div></Button>
      </Flex>
    </div>
  );
}