import SingleFeatured from '@/components/featuredCategories/SingleFeatured';
import { useGetAllConsumerCategoriesQuery } from '@/store/api/masterdata/masterdataApiSlice';
import React from 'react';
import Loading from '../Loading';

const FeaturedList = () => {
	const {
		data: categoryData,
		isSuccess,
		isLoading,
		error,
		isError,
	} = useGetAllConsumerCategoriesQuery();

	if (isError) {
		return (
			<div className="text-center text-2xl text-red-500 flex justify-center  gap-4 mt-12 overflow-x-visible overflow-y-hidden">
				Error fetching Data
			</div>
		);
	} else if (isLoading) <Loading />;
	return (
		<div className="grid grid-cols-3  lg:grid-cols-5  gap-6 mt-12  ">
			{categoryData?.data?.map((item) => (
				<React.Fragment key={crypto.randomUUID()}>
					<SingleFeatured item={item} key={item.value} />
				</React.Fragment>
			))}
		</div>
	);
};

export default FeaturedList;
