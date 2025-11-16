import { Modal } from 'antd';

export const handleDelete =
  (id: string | undefined, deleteFilm: (id: string | undefined) => any, entity: string) => {
    return new Promise<void>((resolve, reject) => {
      Modal.confirm({
        title: 'Confirm',
        content: `Are you sure you want to delete this ${entity}?`,
        onOk: async () => {
          try {
            await deleteFilm(id).unwrap();
            resolve();
          } catch (err) {
            reject(err);
          }
        },
        onCancel: () => reject(new Error('Cancelled')),
        footer: (_, {OkBtn, CancelBtn}) => (
          <>
            <CancelBtn/>
            <OkBtn/>
          </>
        ),
      });
    });
  };