import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import 'react-modal-video/css/modal-video.min.css';
import img from './../../assets/images/merchant/Group 1000007830.png';
import ModalVideo from 'react-modal-video';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import useCurrentWidth from '@/hooks/useCurrentWidth';
import Button from '@/components/button/Button';
import crown from '@/assets/images/icon/crown.svg'
import RecordVideo from '@/components/ui/RecordVideo';

const data = [
    { img: img, videoId: "L61p2uyiMSo" },
    { img: img, videoId: "K4TOrB7at0Y" },
    { img: img, videoId: "q3J0BqkZgNM" }
];

function ModalsVideo() {
    const [isOpen, setOpen] = useState(false);
    const [showVideoCapture, setShowVideoCapture] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState('');
    const currentWidth = useCurrentWidth();
    const [slider, setSlider] = useState(1);
    const [space, setSpace] = useState(50);

    const openModal = (videoId) => {
        setCurrentVideoId(videoId);
        setOpen(true);
    };

    useEffect(() => {
        setSpace(currentWidth >= 768 ? 50 : 0);
        setSlider(currentWidth >= 768 ? 1 : 3);
    }, [currentWidth]);

    return (
        <div className='flex w-full h-full mt-24 py-10 flex-col md:flex-row items-center'>
            <div className="relative md:w-[50%] w-full gap-5 flex">
                <Swiper
                    spaceBetween={space}
                    slidesPerView={slider}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    navigation={true}
                    loop={true}
                    modules={[Navigation]}
                >
                    {data.map((item, index) => (
                        <SwiperSlide key={index} className='flex items-center  gap-3 justify-center '>
                            <div className="relative h-full max-w-32 sm:h-full sm:max-w-48 md:h-full md:max-w-96 lg:h-[536px] lg:w-[446px] mx-2">
                                <img src={item.img} alt="" className="h-full w-full" />
                                <div
                                    className="absolute z-50 inset-0 flex items-center justify-center cursor-pointer"
                                    onClick={() => openModal(item.videoId)}
                                >
                                    <Icon
                                        className="text-white text-5xl"
                                        icon="heroicons:play-circle"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <ModalVideo
                    channel="youtube"
                    youtube={{ mute: 0, autoplay: 0 }}
                    isOpen={isOpen}
                    videoId={currentVideoId}
                    onClose={() => setOpen(false)}
                />
            </div>
            {showVideoCapture?(
                <div><RecordVideo/></div>
            ):(
                <div className='w-[50%]  md:flex h-full items-center '>
                <div className='flex flex-col my-auto items-center justify-center'>
                    <div className='space-y-5'>
                        <div className='font-semibold hidden md:block'>Watch what our satisfied customers have to say</div>
                        <div className='font-bold text-xl hidden md:block'>Share Your Video Review <br /> & Earn Rewards! <img src={crown} className='inline-flex ml-10 h-6 w-6' /></div>
                      <div>
                      <Button
                            icon="video-camera"
                            className="text-[14px] bg-customBlue mx-4 p-3 max-w-[250px] "
                            onClick={() =>
                                setShowVideoCapture(true)
                            }
                        >
                            Add Video Review
                        </Button>
                      </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default ModalsVideo;
