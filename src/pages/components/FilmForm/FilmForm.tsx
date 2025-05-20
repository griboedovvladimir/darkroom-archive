import { DatePicker, Flex, Form, Input, Select, TimePicker } from "antd";
import styles from './FilmForm.module.css';
import { useEffect, useState } from "react";
import { FormInstance } from "antd/es/form/hooks/useForm";
import {
  developerOptions,
  filmStockOptions,
  filmStocks,
  formatOptions, formStates,
  getCameraOptions,
  scannerOptions, statusOptions, typeOptions
} from "../../../constants/costants.ts";
import { IFilm } from "../../../interfaces/IFilm.ts";
import dayjs from 'dayjs';

type FilmType = "135" | "120" | "sheet" | 'instant'| string;


export const FilmForm = ({form, film}: { form: FormInstance, film?: IFilm }) => {
  const [formState, setFormState] = useState(formStates['scanned']);
  const [currentFIlmType, setCurrentFIlmType] = useState<FilmType>('120');
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
    id: ""
  }

  const disabledDateAfter = (current) => {
    return current && current >= dayjs().endOf('day');
  };

  const onFieldChange = (event) => {

  }

  const onFormatChange = (type: unknown) => {
    setCurrentFIlmType(type as unknown as FilmType);
    form.setFieldValue('format', formatOptions(type as unknown as FilmType)[0].value);
    form.setFieldValue('camera', getCameraOptions(type as unknown as FilmType)[0].value);
    form.setFieldValue('filmStock', (type as unknown as FilmType) === 'instant' ? filmStocks.filter(film => film.process === 'instant')[0].value : filmStockOptions[0].value);
  }

  const onFormChange = (event: {
    type(type: any): unknown; status: string 
}) => {
    event?.status && setFormState(formStates[event?.status]);
  }
  useEffect(() => {
    const formData = film ? {...film, useBy: dayjs(film.useBy), loadedDate: dayjs(film.loadedDate), developedDate: dayjs(film.developedDate)} : defaultValues;

    setFormState(formStates[film?.status || 'unexposed']);
    form.setFieldsValue(formData);
    setCurrentFIlmType(film?.type || '120');
  }, [form])

  return (
    <Form form={form} layout="vertical" onValuesChange={onFormChange}>
      <Flex wrap={true} gap={15} className={styles.form}>
        <Form.Item name="status" label="Status" rules={[{required: true}]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={onFieldChange}
            options={statusOptions}
          />
        </Form.Item>

        {formState.includes('usedBy') &&  <Form.Item name="useBy" label="Use By" rules={[{required: true}]}>
          <DatePicker onChange={onFieldChange}/>
        </Form.Item>}

        <Form.Item name="type" label="Type" rules={[{required: true}]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={onFormatChange}
            options={typeOptions}
          />
        </Form.Item>

        {formState.includes('format') && <Form.Item name="format" label="Format" rules={[{required: true}]}>
					<Select
						placeholder="Select a option and change input text above"
						onChange={onFieldChange}
						options={formatOptions(currentFIlmType)}
					/>
				</Form.Item>}

        <Form.Item name="filmStock" label="Film Stock" rules={[{required: true}]}>
          <Select
            placeholder="Select a option and change input text above"
            onChange={onFieldChange}
            options={currentFIlmType === 'instant' ? filmStocks.filter(film => film.process === 'instant') : filmStockOptions}
          />
        </Form.Item>

        {formState.includes('camera') && <Form.Item name="camera" label="Camera" rules={[{required: true}]}>
					<Select
						placeholder="Select a option and change input text above"
						onChange={onFieldChange}
						options={getCameraOptions(currentFIlmType)}
					/>
				</Form.Item>}

        {formState.includes('loadedDate') &&
					<Form.Item name="loadedDate" label="Loaded Date" rules={[{required: true}]}>
						<DatePicker disabledDate={disabledDateAfter} onChange={onFieldChange}/>
					</Form.Item>}

        {formState.includes('developedDate') &&
					<Form.Item name="developedDate" label="Developed Date" rules={[{required: true}]}>
						<DatePicker disabledDate={disabledDateAfter} onChange={onFieldChange}/>
					</Form.Item>}

        {formState.includes('developer') && <Form.Item name="developer" label="Developer" rules={[{required: true}]}>
					<Select
						placeholder="Select a option and change input text above"
						onChange={onFieldChange}
						options={developerOptions}
					/>
				</Form.Item>}

        {formState.includes('developerTime') &&
					<Form.Item name="developerTime" label="Developer Time">
						<TimePicker onChange={onFieldChange}/>
					</Form.Item>}

        {formState.includes('pullPush') && <Form.Item name="pullPush" label="Pull/Push">
					<Select
						placeholder="Select a option and change input text above"
						onChange={onFieldChange}
						options={[
              {value: '0', label: '0'},
              {value: '-1', label: '-1'},
              {value: '-2', label: '-2'},
              {value: '+1', label: '+1'},
              {value: '+2', label: '+2'},
            ]}
					/>
				</Form.Item>}

        {formState.includes('scanner') && <Form.Item name="scanner" label="Scanner" rules={[{required: true}]}>
					<Select
						placeholder="Select a option and change input text above"
						onChange={onFieldChange}
						options={scannerOptions}
					/>
				</Form.Item>}
      </Flex>

      <div>
        {formState.includes('location') && <Form.Item name="location" label="Location">
					<Input onChange={onFieldChange}/>
				</Form.Item>}

        <Form.Item name="notes" label="Notes">
          <Input.TextArea onChange={onFieldChange}/>
        </Form.Item>
      </div>
    </Form>
  );
}