import Title from 'antd/es/typography/Title';
import { Button, Flex } from 'antd';
import styles from './Frames.module.css';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FilmState } from '../../../enums/FilmState.ts';
import { IFilm } from '../../../interfaces/IFilm.ts';

type Props = { code: string, film: IFilm, update: any, refetch: VoidFunction }

export const Frames = ({film, update, refetch}: Props) => {
  const navigate = useNavigate();

  const addFrame = async (frameNumber?: number) => {
    await update({
      id: film._id,
      data: {
        ...film,
        frames: frameNumber
          ? film?.frames?.filter((_: unknown, i: number) => i !== frameNumber)
          : [...(film.frames || []), {id: (film.frames?.length || 0) + 1}],
      }
    });

    refetch();
  }

  const onEditFrame = (id: string) => {
    navigate(`/${film.code}/frame/${id}`);
  };

  const isFrames =
    film?.status !== FilmState.Unexposed && film?.status !== FilmState.Exposed && film?.status !== FilmState.Loaded;

  return (
    <>
      {isFrames && <div>
				<Title level={1}>Frames</Title>
				<Flex gap={10} wrap>
          {film?.frames?.map((frame: { id: string; }, index: number) => (
            <Button key={index} className={styles.addCard} onClick={() => onEditFrame(frame.id)}>
              <Flex className={styles.frameCard} vertical justify={'space-between'}>
                <Flex justify={'end'}>
                  <CloseOutlined onClick={() => addFrame(index)}/>
                </Flex>
                <div>Frame {`${index + 1}`}</div>
              </Flex>
            </Button>
          ))}
					<Button className={styles.addCard} onClick={() => addFrame()}>
						<Flex className={styles.addButton} vertical>
							<div>Add Frame</div>
							<div>+</div>
						</Flex>
					</Button>
				</Flex>
			</div>}
    </>
  )
}