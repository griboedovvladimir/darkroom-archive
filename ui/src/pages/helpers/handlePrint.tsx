export const handlePrint = (qrWrapperRef: any, code: string) => {
    const canvas = qrWrapperRef?.current?.querySelector('canvas') || qrWrapperRef?.current?.querySelector('img');

    if (!canvas) {
      alert('QR код ещё не готов');
      return;
    }

    const dataUrl = canvas instanceof HTMLCanvasElement ? canvas.toDataURL() : canvas?.src;

    const printWindow = window.open('', '_blank');
    printWindow?.document.open();
    printWindow?.document.write(`
      <html>
        <head></head>
        <style>
        @media print {
  @page {
    margin: 0; 
  }

  body {
    margin: 0;
    padding: 0;
  }
  header, footer, nav, .no-print {
    display: none !important;
  }
}</style>
        <body style="margin:0; padding:0;">
          <img src="${dataUrl}" style="width:100px;">
          <div style="font-size:14px;">${code}</div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            }
          </script>
        </body>
      </html>
    `);
    printWindow?.document.close();
  };
