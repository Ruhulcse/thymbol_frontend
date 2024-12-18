import crown from '@/assets/images/icon/crown.svg';
import Button from '@/components/button/Button';
import RecordVideo from '@/components/ui/RecordVideo';
import useCurrentWidth from '@/hooks/useCurrentWidth';
import { useGetReviewVideosQuery } from '@/store/api/uploadReviewVideo/uploadReviewVideoApiSlice';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

import { t } from 'i18next';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../Loading';
import Modal from '../ui/Modal';

function ModalsVideo() {
	const { id: store_id } = useParams();

	const { data: videos, isLoading } = useGetReviewVideosQuery({ store_id });

	const [isOpen, setOpen] = useState(false);
	const [showVideoCapture, setShowVideoCapture] = useState(false);
	const [currentVideoId, setCurrentVideoId] = useState(null);
	const currentWidth = useCurrentWidth();
	const [slider, setSlider] = useState(1);
	const [space, setSpace] = useState(50);

	const openModal = (videoId) => {
		setCurrentVideoId(videoId);
		setOpen(true);
	};

	useEffect(() => {
		setSpace(currentWidth >= 768 ? 50 : 0);
		setSlider(currentWidth >= 768 ? 3 : 1);
	}, [currentWidth]);

	if (isLoading) return <Loading />;

	return (
		<div className="flex w-full h-full mt-24 py-10 flex-col md:flex-row items-center">
			<div className="relative md:w-[50%] w-full gap-5 flex">
				{videos?.length ? (
					<Swiper
						spaceBetween={space}
						slidesPerView={slider}
						navigation={true}
						loop={true}
						modules={[Navigation]}
					>
						{videos?.map((item) => (
							<SwiperSlide
								key={item.videoId}
								className="flex items-center gap-3 justify-center"
							>
								<div className="relative h-full max-w-32 sm:h-full sm:max-w-48 md:h-full md:max-w-96 lg:h-[536px] lg:w-[446px] mx-2">
									<div className="h-full w-full flex items-center justify-center">
										<video width="100%" height="100%">
											<source src={item.videoUrl} />
										</video>
									</div>
									<div
										className="absolute z-50 inset-0 flex items-center justify-center cursor-pointer"
										onClick={() => openModal(item.videoUrl)}
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
				) : (
					<div className="h-full w-full flex items-center justify-center">
						No reviews yet
					</div>
				)}
				<Modal
					activeModal={isOpen}
					onClose={() => setOpen(false)}
					title="Our Satisfied Customer Review"
					id={currentVideoId}
					centered
				>
					{currentVideoId && (
						<video width="100%" height="100%" controls autoPlay>
							<source src={currentVideoId} />
						</video>
					)}
				</Modal>
			</div>
			{showVideoCapture ? (
				<div>
					<RecordVideo setShowVideoCapture={setShowVideoCapture} />
				</div>
			) : (
				<div className="w-[50%] md:flex h-full items-center">
					<div className="flex flex-col my-auto items-center justify-center">
						<div className="space-y-5">
							<div className="font-semibold hidden md:block">
								{t('Watch what our satisfied customers have to say')}
							</div>
							<div className="font-bold text-xl hidden md:block">
								{t('Share Your Video Review')} <br /> & {t('Earn Rewards!')}
								<img src={crown} className="inline-flex ml-10 h-6 w-6" />
							</div>
							<div>
								<Button
									icon="video-camera"
									className="text-[14px] bg-customBlue p-3 max-w-[250px]"
									onClick={() => setShowVideoCapture(true)}
								>
									{t('Add Video Review')}
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
