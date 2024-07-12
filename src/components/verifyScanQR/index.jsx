import { useState } from 'react';
import QrReader from 'react-qr-reader';
import Button from '../ui/Button';

const VerifyScanQR = (props) => {
    const [result, setResult] = useState('');
    const [startScan, setStartScan] = useState(false);
    const [loadingScan, setLoadingScan] = useState(false);
    let handleScan = (data) => {
        setLoadingScan(true);
        if (data && data !== '') {
            setResult(data);
            setLoadingScan(false);
            setStartScan(false);
        }
    };

    let handleError = (err) => {
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
                <div className="text-center font-semibold my-2">
                    Getting QR code data
                </div>
            )}
            {result !== '' && (
                <p className="text-center text-base md:text-xl font-semibold text-green-600 my-4">
                    {result}
                </p>
            )}
        </div>
    );
};

export default VerifyScanQR;
