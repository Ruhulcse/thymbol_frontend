import React from 'react';
import QRCode from 'react-qr-code';
import Card from '../ui/Card';
import { useSelector } from 'react-redux';

const ScanQRCode = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <Card className="mx-auto  w-3/5 mt-40 p-10">
            <h6 className="mb-10">Scan QR Code</h6>
            <div className="flex justify-center items-center">
                <QRCode size={256} value={JSON.stringify(user)} viewBox={`0 0 256 256`} />
            </div>
        </Card>
    );
};

export default ScanQRCode;
