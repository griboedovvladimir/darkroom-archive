import { Modal } from "antd";

export const handleDelete = async (id: string, deleteFilm: any, refetch?: any) => {
    return Modal.confirm({
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