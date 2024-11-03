import { useSelector } from 'react-redux';
import Card from '../ui/Card';
import VerifyScanQR from '../verifyScanQR';

//QR code Scan

const ScanQRCode = () => {
    const { user } = useSelector((state) => state.user);
    return (
        <Card className="mx-auto  w-[100%] sm:w-[50%] md:w-[40%] mt-40 p-10">
            <h6 className="mb-10 text-center">Scan QR Code</h6>
            <div className="flex justify-center items-center">
                {/* <QRCode size={256} value={JSON.stringify(user)} viewBox={`0 0 256 256`} /> */}
            </div>
                <VerifyScanQR />
        </Card>
    );
};

export default ScanQRCode;
