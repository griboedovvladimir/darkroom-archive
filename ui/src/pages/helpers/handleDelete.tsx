import { Modal } from "antd";

export const handleDelete = (id: string | undefined, deleteFilm: any) => {
  return new Promise<void>((resolve, reject) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this film?',
      onOk: async () => {
        try {
          await deleteFilm(id).unwrap();
          resolve(); // только после успешного удаления
        } catch (err) {
          reject(err);
        }
      },
      onCancel: () => reject(new Error('Cancelled')),
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  });
};