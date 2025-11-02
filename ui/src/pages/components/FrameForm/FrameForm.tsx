import { Checkbox, DatePicker, Form, Input, Select } from "antd";
import { shooterSpeedOptions } from "../../../constants/costants.ts";

enum FrameField {
  Notes = "notes",
  Date = "date",
  shooterSpeed = "shooterSpeed",
  ApertureValue = "apertureValue",
  FocalLength = "focalLength",
  FrameCount = "frameCount",
  Filter = "filter",
  Tripod = "tripod",
  Flash = "flash",
}

const FrameLabel = {
  [FrameField.Notes]: "Notes",
  [FrameField.Date]: "Date",
  [FrameField.shooterSpeed]: "Shooter Speed",
  [FrameField.ApertureValue]: "Aperture Value",
  [FrameField.FocalLength]: "Focal Length",
  [FrameField.FrameCount]: "Frame Count",
  [FrameField.Filter]: "Filter",
  [FrameField.Tripod]: "Tripod",
  [FrameField.Flash]: "Flash",
};

export const FrameForm = () => {
  return (
    <Form>
      <Form.Item name={FrameField.FrameCount} label={FrameLabel[FrameField.FrameCount]}>
        <Input />
      </Form.Item>
      
      <Form.Item label={FrameLabel[FrameField.Date]}>
        <DatePicker />
      </Form.Item>

      <Form.Item name={FrameField.shooterSpeed} label={FrameLabel[FrameField.shooterSpeed]}>
        <Select options={shooterSpeedOptions} />
      </Form.Item>
      
      <Form.Item name={FrameField.ApertureValue} label={FrameLabel[FrameField.ApertureValue]}>
        <Input />
      </Form.Item>
      
      <Form.Item name={FrameField.FocalLength} label={FrameLabel[FrameField.FocalLength]}>
        <Input />
      </Form.Item>
      
      <Form.Item name={FrameField.Filter} label={FrameLabel[FrameField.Filter]}>
        <Checkbox />
      </Form.Item>
      
      <Form.Item name={FrameField.Tripod} label={FrameLabel[FrameField.Tripod]}>
        <Checkbox />
      </Form.Item>
      
      <Form.Item name={FrameField.Flash} label={FrameLabel[FrameField.Flash]}>
        <Checkbox />
      </Form.Item>
      
      <Form.Item label={FrameLabel[FrameField.Notes]}>
        <Input.TextArea />
      </Form.Item>
    </Form>
  );
}