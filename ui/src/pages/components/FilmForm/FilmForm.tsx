import { DatePicker, Flex, Form, Input, Select, TimePicker } from 'antd';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import {
    developerOptions,
    filmStockOptions,
    filmStocks, FilmType,
    formatOptions, formStates,
    getCameraOptions,
    pullPushOptions,
    scannerOptions,
    statusOptions,
    typeOptions,
} from '../../../constants/costants';
import { FilmFormField } from '../../../enums/FilmField.ts';
import { FilmState } from '../../../enums/FilmState';
import { IFilm } from '../../../interfaces/IFilm';
import styles from './FilmForm.module.css';

export const FilmForm = ({form, film}: { form: FormInstance, film?: IFilm }) => {
  const [formState, setFormState] = useState(formStates[FilmState.Scanned]);
  const [currentFilmType, setCurrentFilmType] = useState<FilmType>('120');
  const defaultValues: IFilm = {
    status: 'unexposed',
    useBy: '',
    type: '120',
    format: '6x6',
    filmStock: '1',
    camera: '1',
    loadedDate: '',
    developedDate: '',
    developer: '1',
    developerTime: '',
    pullPush: '0',
    scanner: '1',
    location: '',
    notes: '',
    frames: [],
    code: undefined,
    id: ''
  }

  const placeHolder = 'Select a option';
  const disabledDateAfter =
    (current: unknown): boolean => !!current && current >= dayjs().endOf('day');
  const onFormatChange = (type: FilmType) => {
    setCurrentFilmType(type);
    form.setFieldValue(FilmFormField.Format, formatOptions(type)[0].value);
    form.setFieldValue(FilmFormField.Camera, getCameraOptions(type)[0].value);
    form.setFieldValue(FilmFormField.FilmStock,
      type === 'instant' ? filmStocks.filter(film => film.process === 'instant')[0].value : filmStockOptions[0].value);
  }
  const onFormChange = (event: Partial<{ status: string }>) => {
    if (event?.status) setFormState(formStates[event?.status]);
  }
  const statusOptionsByType =
    form.getFieldValue(FilmFormField.Type) === 'instant' ? statusOptions.slice(0, 3) : statusOptions;


  useEffect(() => {
      const formData = film ? {
        ...film,
        useBy: dayjs(film.useBy),
        loadedDate: dayjs(film.loadedDate),
        developedDate: dayjs(film.developedDate)
      } : defaultValues;

      setFormState(formStates[film?.status || FilmState.Unexposed]);
      form.setFieldsValue(formData);
      setCurrentFilmType(film?.type || '120');
    },
    [form])

  return (
    <Form form={form} layout="vertical" onValuesChange={onFormChange}>
      <Flex wrap={true} gap={15} className={styles.form}>
        <Form.Item name="status" label="Status" rules={[{required: true}]}>
          <Select
            placeholder={placeHolder}
            options={statusOptionsByType}
          />
        </Form.Item>

        {formState.includes('usedBy') && <Form.Item name="useBy" label="Use By" rules={[{required: true}]}>
					<DatePicker/>
				</Form.Item>}

        <Form.Item name="type" label="Type" rules={[{required: true}]}>
          <Select
            placeholder={placeHolder}
            onChange={onFormatChange}
            options={typeOptions}
          />
        </Form.Item>

        {formState.includes(FilmFormField.Format) &&
					<Form.Item name="format" label="Format" rules={[{required: true}]}>
						<Select
							placeholder={placeHolder}
							options={formatOptions(currentFilmType)}
						/>
					</Form.Item>}

        <Form.Item name="filmStock" label="Film Stock" rules={[{required: true}]}>
          <Select
            placeholder={placeHolder}
            options={currentFilmType === 'instant'
              ? filmStocks.filter(film => film.process === 'instant') : filmStockOptions}
          />
        </Form.Item>

        {formState.includes('camera') && <Form.Item name="camera" label="Camera" rules={[{required: true}]}>
					<Select
						placeholder={placeHolder}
						options={getCameraOptions(currentFilmType)}
					/>
				</Form.Item>}

        {formState.includes('loadedDate') &&
					<Form.Item name="loadedDate" label="Loaded Date" rules={[{required: true}]}>
						<DatePicker disabledDate={disabledDateAfter}/>
					</Form.Item>}

        {formState.includes('developedDate') &&
					<Form.Item name="developedDate" label="Developed Date" rules={[{required: true}]}>
						<DatePicker disabledDate={disabledDateAfter}/>
					</Form.Item>}

        {formState.includes(FilmFormField.Developer) &&
					<Form.Item name="developer" label="Developer" rules={[{required: true}]}>
						<Select
							placeholder={placeHolder}
							options={developerOptions}
						/>
					</Form.Item>}

        {formState.includes(FilmFormField.DeveloperTime) &&
					<Form.Item name="developerTime" label="Developer Time">
						<TimePicker/>
					</Form.Item>}

        {formState.includes(FilmFormField.PullPush) && <Form.Item name="pullPush" label="Pull/Push">
					<Select
						placeholder={placeHolder}
						options={pullPushOptions}
					/>
				</Form.Item>}

        {formState.includes(FilmFormField.Scanner) &&
		      <Form.Item name="scanner" label="Scanner" rules={[{required: true}]}>
					<Select
						placeholder={placeHolder}
						options={scannerOptions}
					/>
				</Form.Item>}
      </Flex>

      <div>
        {formState.includes(FilmFormField.Location) && <Form.Item name="location" label="Location">
					<Input/>
				</Form.Item>}

        <Form.Item name="notes" label="Notes">
          <Input.TextArea/>
        </Form.Item>
      </div>
    </Form>
  );
}
