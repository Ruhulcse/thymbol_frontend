import { infoIcon } from '@/constant/data';
import { Link } from 'react-router-dom';
const [firstIcon] = infoIcon;

function SalonsCard({ item }) {
	// console.log({ item });

	return (
		<Link
			className="w-full h-fit bg-white p-3 shadow-md relative"
			to={`/store/${item._id}`}
		>
			<div className="max-sm:hidden bg-[#FD5728] rounded-full inline-block p-2 absolute -top-5 right-3 ">
				<img src="/flash.png" alt="flash" className="w-6 h-6" />
			</div>
			<div className="flex max-sm:flex-col gap-4">
				<div className="shrink-0 h-[101px] w-[101px] overflow-hidden max-sm:mx-auto max-sm:rounded-full">
					<img
						src={
							item?.logo?.filePath ||
							'https://cdn-icons-png.flaticon.com/512/2474/2474161.png'
						}
						alt={`${item?.store_name} logo`}
						className="h-full w-full object-cover"
					/>
				</div>
				<div className="space-y-2">
					<p className="text-[1rem] capitalize font-semibold text-black-900">
						{item?.store_name}
					</p>
					<p className="font-semibold text-gray-500">{item?.address?.street}</p>
				</div>
			</div>

			<div className="flex justify-between items-center gap-4 mt-3">
				<div className="ratting w-[101px] font-semibold text-black-900">
					<p className="text-orange-600 block max-sm:hidden">⭐ 5</p>
					<p className="text-orange-600 hidden max-sm:block">
						{item?.Discount}% off
					</p>
				</div>
				<div className="review flex-1 ">
					<p className="font-semibold text-gray-500 block max-sm:hidden">
						10 reviews
					</p>
					<button className="bg-blue-500 text-white hidden max-sm:block px-4 py-1">
						Claim Now
					</button>
				</div>
			</div>
		</Link>

		// <div className="bg-white rounded-lg shadow-md p-4 md:p-6 w-full h-auto">
		// 	<div className="flex justify-center mb-4">
		// 		<div className="h-20 w-20 md:h-32 md:w-32 rounded-full overflow-hidden">
		// 			<Link to={`/store/${item._id}`}>
		// 				<img
		// 					src={
		// 						item?.logo?.filePath ||
		// 						'https://cdn-icons-png.flaticon.com/512/2474/2474161.png'
		// 					}
		// 					alt={`${item?.store_name} logo`}
		// 					className="h-full w-full object-cover rounded-full"
		// 				/>
		// 			</Link>
		// 		</div>
		// 	</div>
		// 	<div className="text-center">
		// 		<Link to={`/store/${item._id}`}>
		// 			<div className="font-bold text-[12px] md:text-base text-left capitalize">
		// 				{item?.store_name}
		// 			</div>
		// 		</Link>
		// 		<div className="text-[9px] md:text-sm mt-2">{item.body}</div>
		// 	</div>
		// 	<div className="flex items-center justify-between">
		// 		<div className="h-8 w-11 bg-blue-600 rounded-2xl flex justify-center items-center font-bold">
		// 			<Icon className="text-white " icon={firstIcon.icon} />
		// 		</div>
		// 		<p className="text-black-500">{Math.floor(item.distance) / 1000} KM</p>
		// 	</div>
		// 	<div className="flex justify-between items-center mt-4">
		// 		<div className="text-[13px] md:text-base font-semibold text-orange-600">
		// 			{item?.Discount}% off
		// 		</div>
		// 		<div>
		// 			{' '}
		// 			<p></p>
		// 		</div>
		// 		<Link to={`/store/${item._id}`}>
		// 			<UpdateButton ButtonName={t('Redeem')} />
		// 		</Link>
		// 	</div>
		// </div>
	);
}

export default SalonsCard;
