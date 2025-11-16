import { QRCode } from 'antd';
import { handlePrint } from '../../helpers/handlePrint';
import { useRef } from 'react';
import styles from './QRCodeCreater.module.css';

export const QRCodeCreater = ({code}: { code: string }) => {
  const qrWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.qrCode} ref={qrWrapperRef}>
      <QRCode
        bordered={false}
        type="canvas"
        size={256}
        style={{height: 'auto', width: '100px', cursor: 'pointer'}}
        value={code}
        onClick={() => handlePrint(qrWrapperRef, code)}
      />
    </div>
  );
};