import { DatePicker, Form, Input, Select, TimePicker } from "antd";

const Formats = {
  '35mm': ['full', 'half', 'panoramic'],
  '120': ['6x4.5', '6x6', '6x7', '6x9'],
  'sheet': ['4x5', '5x7', '8x10'],
}

const Cameras = {
  '35mm': ['Rolie 35S', 'Olympus mju II', 'Diana F+', 'Horizon 202', 'Lomo LC-A'],
  '120': ['Hasselblad 500CM', 'Rolleiflex 2.8C', 'Diana F+', 'Voigtlander Bessa 46', 'Salut-S'],
  'sheet': ['FKD 5x7'],
}

export const FilmForm = () => {
  const onGenderChange = () => {

  }

  const typeOptions = [
    {value: '1', label: '35mm'},
    {value: '2', label: '120'},
    {value: '3', label: 'sheet'},
  ];

  const developerOptions = [
    {value: '1', label: 'Kodak HC-110'},
    {value: '2', label: 'Ilford ID-11'},
    {value: '3', label: 'Kodak D-76'},
    {value: '4', label: 'Ilford Ilfosol 3'},
    {value: '5', label: 'Rodinal'},
    {value: '6', label: 'Kodak Xtol'},
  ];

  const filmStockOptions = [
    {value: '1', label: 'Ilford Delta 100'},
    {value: '2', label: 'Ilford Delta 400'},
    {value: '3', label: 'Ilford Delta 3200'},
    {value: '4', label: 'Ilford FP4 Plus'},
    {value: '5', label: 'Ilford HP5 Plus'},
    {value: '6', label: 'Ilford Pan F Plus'},
    {value: '7', label: 'Ilford XP2 Super'},
    {value: '8', label: 'Ilford SFX 200'},
    {value: '9', label: 'Ilford Ortho Plus'},
    {value: '10', label: 'Kodak T-Max 100'},
    {value: '11', label: 'Kodak T-Max 400'},
    {value: '12', label: 'Kodak Tri-X 400'},
    {value: '13', label: 'Kodak Portra 160'},
    {value: '14', label: 'Kodak Portra 400'},
    {value: '15', label: 'Kodak Portra 800'},
    {value: '16', label: 'Kodak Ektar 100'},
    {value: '17', label: 'Kodak Gold 200'},
    {value: '18', label: 'Kodak Ultramax 400'},
    {value: '19', label: 'Kodak ColorPlus 200'},
    {value: '20', label: 'Kodak Pro Image 100'},
  ];

  const statusOptions = [
    {value: '1', label: 'UnExposed'},
    {value: '2', label: 'Exposed'},
    {value: '3', label: 'Developed'},
    {value: '4', label: 'Scanned'},
    {value: '5', label: 'Archived'},
  ];

  const formatOptions = Formats['120'].map((format) => (
    {value: format, label: format}));

  return (
    <Form>
      <Form.Item name="status" label="Status" rules={[{required: true}]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
          options={statusOptions}
          defaultValue={statusOptions[0].value}
        />
      </Form.Item>

      <Form.Item name="useBy" label="Use By" rules={[{required: true}]}>
        <DatePicker onChange={onGenderChange}/>
      </Form.Item>

      <Form.Item name="type" label="Type" rules={[{required: true}]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
          options={typeOptions}
          defaultValue={typeOptions[1].value}
        />
      </Form.Item>

      <Form.Item name="format" label="Format" rules={[{required: true}]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
          options={formatOptions}
          defaultValue={formatOptions[1].value}
        />
      </Form.Item>

      <Form.Item name="filmStock" label="Film Stock" rules={[{required: true}]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
          options={filmStockOptions}
          defaultValue={filmStockOptions[1].value}
        />
      </Form.Item>

      <Form.Item name="camera" label="Camera" rules={[{required: true}]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
          options={Cameras['120'].map((camera) => (
            {value: camera, label: camera}))}
          defaultValue={Cameras['120'][1]}
        />
      </Form.Item>

      <Form.Item name="location" label="Location">
        <Input onChange={onGenderChange}/>
      </Form.Item>

      <Form.Item name="dataLoaded" label="Data Loaded" rules={[{required: true}]}>
        <DatePicker onChange={onGenderChange}/>
      </Form.Item>

      <Form.Item name="dataUnloaded" label="Data Unloaded" rules={[{required: true}]}>
        <DatePicker onChange={onGenderChange}/>
      </Form.Item>

      <Form.Item name="dataDeveloped" label="Data Developed" rules={[{required: true}]}>
        <DatePicker onChange={onGenderChange}/>
      </Form.Item>

      <Form.Item name="developer" label="Developer" rules={[{required: true}]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
          options={developerOptions}
          defaultValue={developerOptions[1].value}
        />
      </Form.Item>

      <Form.Item name="developerTime" label="Developer Time" rules={[{required: true}]}>
        <TimePicker onChange={onGenderChange}/>
      </Form.Item>

      <Form.Item name="Pull/Push" label="Pull/Push">
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
          options={[
            {value: '0', label: '0'},
            {value: '-1', label: '-1'},
            {value: '-2', label: '-2'},
            {value: '+1', label: '+1'},
            {value: '+2', label: '+2'},
          ]}
          defaultValue={'0'}
        />
      </Form.Item>

      <Form.Item name="notes" label="Notes">
        <Input.TextArea onChange={onGenderChange}/>
      </Form.Item>
    </Form>
  );
}