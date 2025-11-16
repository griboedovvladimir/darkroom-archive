import { useNavigate } from 'react-router-dom';
import { IFrame } from '../../../interfaces/IFrame';
import { CloseOutlined } from '@ant-design/icons';
import { Flex, Button } from 'antd';
import Title from 'antd/es/skeleton/Title';
import { IPrint } from '../../../interfaces/IPrint';
import styles from './Prints.module.css';

type Props = {
  frame: IFrame;
};

export const Prints = ({frame, update}: Props) => {
  const navigate = useNavigate();

  const addPrint = async (printNumber?: number) => {
  };

  const onEditFrame = (id: string) =>
    navigate(`/film/${frame.id}/frame/${id}`);

  return (
    <>
      <div>
        <Title level={1}>Prints</Title>
        <Flex gap={10} wrap>
          {frame?.prints?.map((print: IPrint, index: number) => (
            <Button
              key={print.id}
              className={styles.addCard}
              onClick={() => onEditFrame(print.id)}
            >
              <Flex
                className={styles.printCard}
                vertical
                justify="space-between"
              >
                <Flex justify="end">
                  <CloseOutlined onClick={() => addPrint(index)}/>
                </Flex>
                <span>{print.paperSize}</span>
                <div>Print {`${index + 1}`}</div>
              </Flex>
            </Button>
          ))}
          <Button className={styles.addCard} onClick={() => addPrint()}>
            <Flex className={styles.addButton} vertical>
              <div>Add Print</div>
              <div>+</div>
            </Flex>
          </Button>
        </Flex>
      </div>
    </>
  );
};
