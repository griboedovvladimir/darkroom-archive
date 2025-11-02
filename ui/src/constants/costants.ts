export const cameras: Record<string, { value: string, label: string, format: string, formatCode?: string }[]> = {
  '120': [
    {value: '1', label: 'Hasselblad 500CM', format: '6x6', formatCode: '66'},
    {value: '2', label: 'Rolleiflex 2.8C', format: '6x6', formatCode: '66'},
    {value: '3', label: 'Diana F+', format: '6x6', formatCode: '66'},
    {value: '4', label: 'Voigtlander Bessa 46', format: '6x4.5', formatCode: '645'},
    {value: '5', label: 'Salut-S', format: '6x6', formatCode: '66'},
  ],
  'sheet': [
    {value: '1', label: 'FKD 5x7', format: '5x7', formatCode: '57'},
    {value: '2', label: 'FKD 4x5', format: '4x5', formatCode: '45'},
    {value: '3', label: 'FKD 8x10', format: '8x10', formatCode: '810'},],
  'instant': [
    {value: '1', label: 'Polaroid Impulse Portrait', format: 'palaroid'},
    {value: '2', label: 'Polaroid SX-70', format: 'palaroid'},
    {value: '3', label: 'Fuji Instax Wide', format: 'wide'},
    {value: '4', label: 'Fuji Instax Mini', format: 'mini'},
    {value: '5', label: 'Diana Instant Square', format: 'square'},
    {value: '6', label: 'Diana F+', format: 'mini'},
  ],
  '135': [
    {value: '1', label: 'Rolie 35S', format: 'full', formatCode: 'FF'},
    {value: '3', label: 'Diana F+', format: 'full', formatCode: 'FF'},
    {value: '4', label: 'Horizon 202', format: 'panoramic', formatCode: 'PAN'},
    {value: '5', label: 'Lomo LC-A', format: 'full', formatCode: 'FF'}
  ],
}

export const developerOptions = [
  {value: '1', label: 'С-41'},
  {value: '2', label: 'С-6'},
  {value: '3', label: 'Kodak HC-110'},
  {value: '4', label: 'Ilford ID-11'},
  {value: '5', label: 'Kodak D-76'},
  {value: '6', label: 'Ilford Ilfosol 3'},
  {value: '7', label: 'Rodinal'},
  {value: '8', label: 'Kodak Xtol'},
];

export const filmStocks = [
  {value: '1', label: 'Ilford Delta 100', iso: 100, color: 'BW', process: 'BW'},
  {value: '2', label: 'Ilford Delta 400', iso: 400, color: 'BW', process: 'BW'},
  {value: '3', label: 'Ilford Delta 3200', iso: 3200, color: 'BW', process: 'BW'},
  {value: '4', label: 'Ilford FP4 Plus', iso: 125, color: 'BW', process: 'BW'},
  {value: '5', label: 'Ilford HP5 Plus', iso: 400, color: 'BW', process: 'BW'},
  {value: '6', label: 'Ilford Pan F Plus', iso: 50, color: 'BW', process: 'BW'},
  {value: '7', label: 'Ilford XP2 Super', iso: 400, color: 'BW', process: 'C41'},
  {value: '8', label: 'Ilford SFX 200', iso: 200, color: 'BW', process: 'BW'},
  {value: '9', label: 'Ilford Ortho Plus', iso: 80, color: 'BW', process: 'BW'},
  {value: '10', label: 'Kodak T-Max 100', iso: 100, color: 'BW', process: 'BW'},
  {value: '11', label: 'Kodak T-Max 400', iso: 400, color: 'BW', process: 'BW'},
  {value: '12', label: 'Kodak Tri-X 400', iso: 400, color: 'BW', process: 'BW'},
  {value: '13', label: 'Kodak Portra 160', iso: 160, color: 'C', process: 'C41'},
  {value: '14', label: 'Kodak Portra 400', iso: 400, color: 'C', process: 'C41'},
  {value: '15', label: 'Kodak Portra 800', iso: 800, color: 'C', process: 'C41'},
  {value: '16', label: 'Kodak Ektar 100', iso: 100, color: 'C', process: 'C41'},
  {value: '17', label: 'Kodak Gold 200', iso: 200, color: 'C', process: 'C41'},
  {value: '18', label: 'Kodak Ultramax 400', iso: 400, color: 'C', process: 'C41'},
  {value: '19', label: 'Kodak ColorPlus 200', iso: 200, color: 'C', process: 'C41'},
  {value: '20', label: 'Kodak Pro Image 100', iso: 100, color: 'C', process: 'C41'},
  {value: '21', label: 'Kodak Ektachrome 100', iso: 100, color: 'S', process: 'E6'},
  {value: '22', label: 'Kodak Ektachrome 200', iso: 200, color: 'S', process: 'E6'},
  {value: '23', label: 'Kodak Ektachrome 100VS', iso: 100, color: 'S', process: 'E6'},
  {value: '24', label: 'Fujifilm Provia 100F', iso: 100, color: 'S', process: 'E6'},
  {value: '25', label: 'Fujifilm Velvia 50', iso: 50, color: 'S', process: 'E6'},
  {value: '26', label: 'Fujifilm Velvia 100', iso: 100, color: 'S', process: 'E6'},
  {value: '27', label: 'Fujifilm Astia 100F', iso: 100, color: 'S', process: 'E6'},
  {value: '28', label: 'Fujifilm Pro 400H', iso: 400, color: 'C', process: 'C41'},
  {value: '29', label: 'Fujifilm Superia X-TRA 400', iso: 400, color: 'C', process: 'C41'},
  {value: '30', label: 'Fujifilm Velvia 100F', iso: 100, color: 'S', process: 'E6'},
  {value: '31', label: 'Fujifilm Velvia 50F', iso: 50, color: 'S', process: 'E6'},
  {value: '32', label: 'Fujifilm Acros 100', iso: 100, color: 'BW', process: 'BW'},
  {value: '33', label: 'Fujifilm Neopan 400', iso: 400, color: 'BW', process: 'BW'},
  {value: '34', label: 'Fujifilm Neopan 1600', iso: 1600, color: 'BW', process: 'BW'},
  {value: '35', label: 'Fujifilm Neopan 100 Acros II', iso: 100, color: 'BW', process: 'BW'},
  {value: '36', label: 'Fujifilm Neopan 400 Super', iso: 400, color: 'BW', process: 'BW'},
  {value: '37', label: 'Fujifilm Neopan 1600 Super', iso: 1600, color: 'BW', process: 'BW'},
  {value: '38', label: 'Fujifilm Instax Wide', iso: 800, color: 'C', process: 'instant'},
  {value: '39', label: 'Fujifilm Instax Mini', iso: 800, color: 'C', process: 'instant'},
  {value: '40', label: 'Fujifilm Instax Square', iso: 800, color: 'C', process: 'instant'},
  {value: '41', label: 'Fujifilm Instax Wide', iso: 800, color: 'BW', process: 'instant'},
  {value: '42', label: 'Fujifilm Instax Mini', iso: 800, color: 'BW', process: 'instant'},
  {value: '43', label: 'Fujifilm Instax Square', iso: 800, color: 'BW', process: 'instant'},
  {value: '44', label: 'Polaroid 600', iso: 800, color: 'C', process: 'instant'},
  {value: '45', label: 'Polaroid SX-70', iso: 100, color: 'C', process: 'instant'},
  {value: '46', label: 'Agfa APX 100', iso: 100, color: 'BW', process: 'BW'},
  {value: '47', label: 'Agfa APX 400', iso: 400, color: 'BW', process: 'BW'},
  {value: '48', label: 'Fujifilm Reala 100', iso: 100, color: 'C', process: 'C41'},
  {value: '49', label: 'Lomography Potsdam 100', iso: 100, color: 'BW', process: 'BW'},
  {value: '50', label: 'Rollei Ortho 25', iso: 25, color: 'BW', process: 'BW'},
  {value: '51', label: 'Ilford Ilfocolor 400 plus', iso: 400, color: 'C', process: 'C41'},
  {value: '52', label: 'Noname', iso: 200, color: 'C', process: 'C41'},
]

export const statusOptions = [
  {value: 'unexposed', label: 'UnExposed'},
  {value: 'loaded', label: 'Loaded'},
  {value: 'exposed', label: 'Exposed'},
  {value: 'developed', label: 'Developed'},
  {value: 'scanned', label: 'Scanned'},
];

export const scannerOptions = [
  {value: '1', label: 'Epson V800'},
  {value: '2', label: 'Epson V550'},
  {value: '3', label: 'Nikkon Coolscan 9000'},
  {value: '4', label: 'Photoservice Scan'},
];

export const shooterSpeedOptions = [
  {value: '1', label: 'auto'},
  {value: '2', label: '10"'},
  {value: '3', label: '5"'},
  {value: '4', label: '2"'},
  {value: '5', label: '1"'},
  {value: '6', label: '1/2'},
  {value: '7', label: '1/4'},
  {value: '8', label: '1/8'},
  {value: '9', label: '1/15'},
  {value: '10', label: '1/30'},
  {value: '11', label: '1/60'},
  {value: '12', label: '1/128'},
  {value: '13', label: '1/250'},
  {value: '14', label: '1/500'},
  {value: '15', label: '1/1000'},
  {value: '16', label: '1/2000'},
  {value: '17', label: '1/4000'},
  {value: '18', label: '1/8000'},
  {value: '19', label: 'Bulb'},
];

export const apertureOptions = [
  {value: '1', label: 'auto'},
  {value: '2', label: '1.2'},
  {value: '3', label: '1.4'},
  {value: '4', label: '1.7'},
  {value: '5', label: '2'},
  {value: '6', label: '2.8'},
  {value: '7', label: '3.2'},
  {value: '8', label: '4'},
  {value: '9', label: '5.6'},
  {value: '10', label: '8'},
  {value: '11', label: '11'},
  {value: '12', label: '16'},
  {value: '13', label: '22'},
  {value: '14', label: '32'},
  {value: '15', label: '64'},
  {value: '16', label: 'pinhole'},
];

export const filmStockOptions = filmStocks.map((stock) => (
  {value: stock.value, label: stock.label}));

export const formStates: Record<string, string[]> = {
  unexposed: ['usedBy'],
  loaded: ['camera', 'format', 'loadedDate', 'usedBy'],
  exposed: ['camera', 'format', 'loadedDate', 'location'],
  developed: ['camera', 'format', 'loadedDate', 'developedDate', 'developer', 'developerTime', 'pullPush', 'location'],
  scanned: [
    'camera', 
    'format', 
    'loadedDate', 
    'developedDate', 
    'developer', 
    'developerTime', 
    'pullPush', 
    'location', 
    'scanner'],
}

export type FilmType = keyof typeof Formats;

export const getAllCameraOptions = () => {
  const allCameras = Object.values(cameras).flat();
  return allCameras.map((camera, idx) => ({value: idx + 1, label: camera.label}));
}

export const getCameraOptions = (filmType: FilmType) => cameras[filmType].map(({value, label}) => ({value, label}));
export const formatOptions = (filmType: FilmType) => Formats[filmType].map((format) => (
  {value: format, label: format}));

export const Formats = Object.keys(cameras).reduce((acc, type) => {
  acc[type] = cameras[type].map((camera) => camera.format)
    .filter((format, index, self) => self.indexOf(format) === index);
  return acc;
}, {} as Record<string, string[]>);

export const typeOptions = Object.keys(cameras).map((type) => (
  {value: type, label: type}
));

