import { Icon } from '@iconify/react';
import { useState } from 'react';
import 'react-modal-video/css/modal-video.min.css';
import img1 from './../../assets/images/merchant/Ellipse 11216.png';
import img from './../../assets/images/merchant/Group 1000007830.png';
import img2 from './../../assets/images/merchant/Rectangle 34626035 (1).png';
import ModalVideo from 'react-modal-video';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const data = [
    { img: img, videoId: "L61p2uyiMSo" },
    { img: img, videoId: "K4TOrB7at0Y" },
    { img: img, videoId: "q3J0BqkZgNM" }
];

function ModalsVideo() {
    const [isOpen, setOpen] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState('');

    const openModal = (videoId) => {
        setCurrentVideoId(videoId);
        setOpen(true);
    };

    return (
        <div className="relative lg:h-[536px] lg:w-[1000px] w-[140px] h-[135px] sm:w-[180px] sm:h-[186px] md:w-[230px] md:h-[240px] px-10">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                navigation={true}
                loop={true}
                modules={[Navigation]}
            >
                {data.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
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
    );
}

export default ModalsVideo;
