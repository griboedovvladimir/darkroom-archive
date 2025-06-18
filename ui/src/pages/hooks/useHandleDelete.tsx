import { Modal } from "antd";

export const useHandleDelete = async (id: string, deleteFilm: any, refetch: any) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this film?',
      onOk: async () => {
        await deleteFilm(id).unwrap();
        refetch();
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  }