import logo from '@/assets/images/logo/logo-c.png';
import { Icon } from '@iconify/react';
import { useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';

const GenerateQR = ({ qrAPIData }) => {
    const qrRef = useRef();

    const prepareQrvalue = JSON.stringify(qrAPIData);

    const handleDownload = () => {
        const canvas = qrRef.current.querySelector('canvas');
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr-code.png';
        link.click();
    };

    return (
        <div className="bg-[#fdffff] min-h-screen h-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
                <div className="bg-[#fdffff] p-6 rounded-md shadow-md">
                    <div
                        ref={qrRef}
                        style={{
                            margin: '0 auto',
                        }}
                    >
                        <QRCode
                            value={prepareQrvalue}
                            size={300}
                            quietZone={10}
                            // logoImage={logo}
                            logoWidth={100}
                            logoHeight={100}
                            ecLevel="H"
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={handleDownload}
                className="mt-4 px-4 py-2 bg-customBlue text-white rounded-md shadow-md flex items-center justify-center"
            >
                <Icon
                    icon="heroicons:arrow-down-tray"
                    className="font-xl me-2"
                />
                <div>Download QR Code</div>
            </button>
        </div>
    );
};

export default GenerateQR;
