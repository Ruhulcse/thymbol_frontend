import fetchWrapper from '@/util/fetchWrapper';
import { useState } from 'react';
import QrReader from 'react-qr-reader';
import Button from '../ui/Button';

const VerifyScanQR = () => {
    const [result, setResult] = useState('');
    const [startScan, setStartScan] = useState(false);
    const [loadingScan, setLoadingScan] = useState(false);
    const [scannedResult, setScannedResult] = useState('');
    const [errorResult, setErrorResult] = useState('');
    let handleScan = (data) => {
        setLoadingScan(true);
        const parsedQrData = JSON.parse(data);

        if (parsedQrData && parsedQrData !== '') {
            setResult(parsedQrData);
            verifyScanQR(parsedQrData);
            setLoadingScan(false);
            setStartScan(false);
        }
    };

    const verifyScanQR = async (parsedQrData) => {
        try {
            const { data } = await fetchWrapper.post(
                `scan_qrcode`,
                parsedQrData
            );

            setScannedResult(data.message);
        } catch (error) {
            setErrorResult(error.response.data.message);
        }
    };

    let handleError = (err) => {
        console.log('🚀  ~ err:', err);
        // alert(err);
    };
    return (
        <div>
            <div className="flex justify-center items-center my-3">
                <Button
                    onClick={() => setStartScan(!startScan)}
                    text={startScan ? 'Stop Scan' : 'Start Scan'}
                />
            </div>
            {startScan ? (
                <>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{
                            width: '100%',
                            boxShadow:
                                'rgba(255, 0, 0, 0.5) 0px 0px 0px 5px inset',
                        }}
                        // facingMode="environment"
                    />
                </>
            ) : null}
            {loadingScan && (
                <div className="text-center font-semibold my-2 flex justify-center items-center">
                    <>
                        <svg
                            className={`animate-spin ltr:-ml-1 ltr:mr-3 rtl:-mr-1 rtl:ml-3 h-5 w-5 ${loadingScan}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Verifying data...
                    </>
                </div>
            )}
            {scannedResult !== '' && (
                <p className="text-center text-base md:text-xl font-semibold text-green-600 my-4">
                    {scannedResult}
                </p>
            )}
            {errorResult !== '' && (
                <p className="text-center text-base md:text-xl font-semibold text-red-600 my-4">
                    {errorResult}
                </p>
            )}
        </div>
    );
};

export default VerifyScanQR;
