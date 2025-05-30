import { Breadcrumb, Button, Flex, Form, notification, QRCode, Spin } from "antd";
import { FilmForm } from "../components/FilmForm";
import Title from "antd/es/typography/Title";
import { useGetFilmsQuery, useUpdateFilmMutation } from "../../services/api-service";
import { useParams } from "react-router";
import styles from './EditFilm.module.css';
import { useEffect, useRef } from "react";
import { create } from 'zustand'

interface StoreState {
  frames: { id: number }[];
  addFrame: () => void;
}

const useStore = create<StoreState>((set) => 
  ({
    frames: [], 
    addFrame: () => set((state) => ({ frames: [...state.frames, { id: state.frames.length + 1 }] })),
  }));

export const EditFilm = () => {
  const { frames, addFrame } = useStore()
  const { data: fetchedFilms, isLoading } = useGetFilmsQuery({});
  const [update, { isSuccess, isError }] = useUpdateFilmMutation();
  const { id } = useParams();
  const film = fetchedFilms?.find((film: { _id: string | undefined; }) => film._id === id);
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

  const setFrames = (newFrames: { id: number }[]) => {
    useStore.setState({ frames: newFrames });
  }
  

  const code = `${film?.code.toString().padStart(4, '0')}${film?.type === 'instant' ? 'I' : film?.type}${film?.color}${film?.iso}`;

  const qrWrapperRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const canvas = qrWrapperRef?.current?.querySelector('canvas') || qrWrapperRef?.current?.querySelector('img');

    if (!canvas) {
      alert('QR код ещё не готов');
      return;
    }

    const dataUrl = canvas instanceof HTMLCanvasElement ? canvas.toDataURL() : canvas?.src;

    const printWindow = window.open('', '_blank');
    printWindow?.document.open();
    printWindow?.document.write(`
      <html>
        <head></head>
        <style>
        @media print {
  @page {
    margin: 0; 
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

  const isFrames = film?.status !== 'unexposed' && film?.status !== 'exposed' && film?.status !== 'loaded';


  return (
    <div className="main">
    {isLoading && <Spin size="large" fullscreen/>}
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
      {isFrames && <div>
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
      </div>}
    </div>
  );
}