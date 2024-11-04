import FeaturedList from '@/components/featuredCategories/FeaturedList';
import { useTranslation } from 'react-i18next';

function Featured() {
	const { t } = useTranslation();
	return (
		<div className="container mx-auto mt-24">
			<div className="flex justify-between items-baseline">
				<div className="font-bold md:text-2xl lg:text-3xl text-black-500 text-xl ">
					{t('Featured Categories')}
				</div>
				{/* <div>{t('See all')}</div> */}
			</div>
			<FeaturedList />
		</div>
	);
}

export default Featured;
