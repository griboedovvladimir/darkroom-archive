import { Checkbox, DatePicker, Flex, Form, FormInstance, Input, Select } from 'antd';
import { apertureOptions, filterOptions, shooterSpeedOptions } from '../../../constants/costants.ts';
import styles from './FrameForm.module.css';

enum FrameField {
  Notes = 'notes',
  Date = 'date',
  shooterSpeed = 'shooterSpeed',
  ApertureValue = 'apertureValue',
  FocalLength = 'focalLength',
  FrameCount = 'frameCount',
  Filter = 'filter',
  Tripod = 'tripod',
  Flash = 'flash',
}

const FrameLabel = {
  [FrameField.Notes]: 'Notes',
  [FrameField.Date]: 'Date',
  [FrameField.shooterSpeed]: 'Shooter Speed',
  [FrameField.ApertureValue]: 'Aperture Value',
  [FrameField.FocalLength]: 'Focal Length',
  [FrameField.FrameCount]: 'Frame Count',
  [FrameField.Filter]: 'Filter',
  [FrameField.Tripod]: 'Tripod',
  [FrameField.Flash]: 'Flash',
};

export const FrameForm = ({form, counts}: { form: FormInstance, counts: string[] }) => {
  const CountOptions =
    new Array(100).fill(null)
      .map((_, i) => ({label: `${i + 1}`, value: `${i + 1}`}))
      .filter(({value}) => !counts.includes(value));

  return (
    <Form form={form} className={styles.form}>
      <Flex wrap={true} gap={15}>
        <Form.Item name={FrameField.FrameCount} label={FrameLabel[FrameField.FrameCount]}>
          <Select options={CountOptions}/>
        </Form.Item>
        <Form.Item name={FrameField.Date} label={FrameLabel[FrameField.Date]}>
          <DatePicker/>
        </Form.Item>
      </Flex>

      <Flex wrap={true} gap={15}>
        <Form.Item name={FrameField.shooterSpeed} label={FrameLabel[FrameField.shooterSpeed]}>
          <Select options={shooterSpeedOptions}/>
        </Form.Item>

        <Form.Item name={FrameField.ApertureValue} label={FrameLabel[FrameField.ApertureValue]}>
          <Select options={apertureOptions}/>
        </Form.Item>

        <Form.Item name={FrameField.FocalLength} label={FrameLabel[FrameField.FocalLength]}>
          <Input/>
        </Form.Item>
      </Flex>

      <Flex wrap={true} gap={15}>
        <Form.Item name={FrameField.Tripod} label={FrameLabel[FrameField.Tripod]} valuePropName="checked">
          <Checkbox/>
        </Form.Item>

        <Form.Item name={FrameField.Flash} label={FrameLabel[FrameField.Flash]} valuePropName="checked">
          <Checkbox/>
        </Form.Item>

        <Form.Item name={FrameField.Filter} label={FrameLabel[FrameField.Filter]}>
          <Select options={filterOptions}/>
        </Form.Item>
      </Flex>

      <Form.Item label={FrameLabel[FrameField.Notes]}>
        <Input.TextArea/>
      </Form.Item>
    </Form>
  );
}