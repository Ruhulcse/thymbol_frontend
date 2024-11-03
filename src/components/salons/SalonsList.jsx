import SalonsCard from '@/components/salons/SalonsCard';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

function SalonsList({ data }) {
	return (
		<div className="flex justify-center mt-12 mx-4">
			<Swiper
				breakpoints={{
					320: {
						slidesPerView: 2,
						grid: {
							rows: 1,
						},
					},
					480: {
						slidesPerView: 2,
						grid: {
							rows: 1,
						},
					},
					768: {
						slidesPerView: 3,
						grid: {
							rows: 2,
						},
					},
				}}
				grid={{
					rows: 2,
					fill: 'row',
				}}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}
				modules={[Grid, Pagination]}
				className="mySwiper py-5 w-full max-w-screen-xl"
			>
				{data?.map((item, i) => (
					<SwiperSlide key={i} className="flex justify-center">
						<SalonsCard item={item} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default SalonsList;
