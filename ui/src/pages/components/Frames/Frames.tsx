import { CloseOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { FilmState } from '../../../enums/FilmState.ts';
import { IFilm, IFrame } from '../../../interfaces/IFilm.ts';
import styles from './Frames.module.css';

type Props = 
{ 
  code: string, 
  film: IFilm, 
  update: (data: {id: string | undefined, data: IFilm}) => Promise<void>, 
  refetch: VoidFunction 
}

export const Frames = ({film, update}: Props) => {
  const navigate = useNavigate();

  const addFrame = async (frameNumber?: number) => {
    await update({
      id: film._id,
      data: {
        ...film,
        frames: frameNumber
          ? film?.frames?.filter((_: unknown, i: number) => i !== frameNumber)
          : [...(film.frames || []), {id: ((film.frames?.length || 0) + 1).toString()} as IFrame],
      }
    });

    //TODO: Frame index should be createated another way
    navigate(`/film/${film.code}/frame/${(film.frames?.length || 0) + 1}`);
  }

  const onEditFrame = (id: string) => navigate(`/film/${film.code}/frame/${id}`);

  const isFrames =
    film?.status !== FilmState.Unexposed && film?.status !== FilmState.Exposed && film?.status !== FilmState.Loaded;

  return (
    <>
      {isFrames && <div>
				<Title level={1}>Frames</Title>
				<Flex gap={10} wrap>
          {film?.frames?.map((frame: IFrame, index: number) => (
            <Button key={frame.id} className={styles.addCard} onClick={() => onEditFrame(frame.id)}>
              <Flex className={styles.frameCard} vertical justify={'space-between'}>
                <Flex justify={'end'}>
                  <CloseOutlined onClick={() => addFrame(index)}/>
                </Flex>
                <span>{frame.shooterSpeed}</span>
                <span>{frame.apertureValue}</span>
                <span>{frame.date}</span>
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