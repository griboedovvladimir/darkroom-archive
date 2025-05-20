import { DatePicker, Form, Input, Select } from "antd";
import { shooterSpeedOptions } from "../../../constants/costants.ts";

export const FrameForm = () => {
  return (
    <Form>
      <Form.Item label="Description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Release Date">
        <DatePicker />
      </Form.Item>

      <Form.Item name="shooterSpeed" label="Shooter Speed">
        <Select options={shooterSpeedOptions} />
      </Form.Item>
    </Form>
  );
}