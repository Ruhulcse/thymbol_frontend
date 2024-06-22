import React, { useState } from 'react';
import ModalVideo from 'react-modal-video';
import 'react-modal-video/css/modal-video.min.css';
import img from './../../assets/images/merchant/Group 1000007830.png'
import img1 from './../../assets/images/merchant/Ellipse 11216.png'
import img2 from './../../assets/images/merchant/Rectangle 34626035 (1).png'
import { Icon } from '@iconify/react';

import { Swiper, SwiperSlide } from 'swiper/react';

const data = [img,img1,img2]

function ModalsVideo() {
    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <Swiper
            spaceBetween={50}
            slidesPerView={1}
            pagination={{clickable:true}}
            />
           
           <div className='relative lg:h-[536px] lg:w-[446px] w-[140px] h-[135px] sm:w-[180px] sm:h-[186px] md:w-[230px] md:h-[240px]'><img src={img} alt="" className='h-full w-full' />
           <div className='absolute z-50 inset-0 flex items-center justify-center'>
            <Icon className='text-white text-5xl'
            icon='heroicons:play-circle'
            />
           </div>
           </div>
        </div>
    );
}

export default ModalsVideo;