import { Icon } from '@iconify/react';
import { useState } from 'react';
import ModalVideo from 'react-modal-video';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const VerificationVideo = () => {
    const [isOpen, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };

    return (
        <div className="bg-[#F3FCFF] min-h-screen">
            <div className="px-10 mx-10 text-center py-10">
                <h6 className="font-semibold text-xl md:text-2xl my-5">
                    Welcome to Thymbol
                </h6>
                <div className="text-base md:text-xl my-5">
                    Watch Video Tutorial
                </div>
                <div className="relative w-11/12 mx-auto">
                    <img
                        src={
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYz8zEAFyjZKTNeQW-MRagzdrD-bTFpArsiA&s'
                        }
                        alt=""
                        className=" w-full h-72"
                    />
                    <div
                        className="absolute z-50 inset-0 flex items-center justify-center cursor-pointer"
                        onClick={() => openModal(true)}
                    >
                        <Icon
                            className="text-white text-5xl"
                            icon="heroicons:play-circle"
                        />
                    </div>
                </div>
                <div className="">
                    <ModalVideo
                        channel="youtube"
                        youtube={{ mute: 0, autoplay: 0 }}
                        isOpen={isOpen}
                        videoId="L61p2uyiMSo"
                        onClose={() => setOpen(false)}
                    />
                </div>
            </div>
            <div className="w-full">
                <Link to={'/redeem-deals'} className='w-full flex justify-center'>
                    <Button
                        text="Skip to deals"
                        className="bg-customBlue text-white w-1/5"
                    />
                </Link>
            </div>
        </div>
    );
};

export default VerificationVideo;
