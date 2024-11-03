import BusinessSpotlight from '@/components/businessSpotlight';
import Featured from '@/components/featured';
import Header from '@/components/header';
import HomeBanner from '@/components/homeBanner';
import Loading from '@/components/Loading';
import Restaurants from '@/components/restaurants';
import { spotlight } from '@/data/BusinessSpotlight!';
import { featured } from '@/data/featuredData';
import { selectCurrentLatLng } from '@/store/api/GeoLocation/geoLocationSlice';
import {
	setLoader,
	setSearchCategory,
	setSearchTerm,
	setSearchTrigger,
} from '@/store/api/storeSearch/storeSearchSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
	// const currentLocation = {
	// 	lat: '23.81957',
	// 	lng: '90.35850',
	// };
	const currentLocation = useSelector(selectCurrentLatLng);
	console.log(currentLocation);
	const [storeData, setStoreData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const {
		search_term,
		search_trigger,
		search_category,
		page_count,
		pagination_category,
	} = useSelector((state) => state.searchStore);

	const getNearByStores = async () => {
		setLoading(true);
		const payload = {
			coordinates: [currentLocation.lat, currentLocation.lng],
			page: 1,
		};
		try {
			if (currentLocation.lat && currentLocation.lng) {
				const { data } = await fetchWrapper.post(`/store/nearme`, payload);

				setStoreData(data);
			}
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	const searchCategoryByStore = async () => {
		const payload = {
			coordinates: [currentLocation.lat, currentLocation.lng],
			page: 1,
			category: search_category,
		};
		try {
			if (search_category.length) {
				setError('');
				payload.category = search_category;

				const { data } = await fetchWrapper.post(`/store/nearme`, payload);

				setStoreData(data);
			}
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			dispatch(setSearchCategory(false));
			setLoading(false);
		}
	};

	const searchByType = async () => {
		setLoading(true);
		const payload = {
			coordinates: [currentLocation.lat, currentLocation.lng],
			page: 1,
		};
		try {
			if (search_trigger && search_term.length > 0) {
				setError('');
				payload.searchTerm = search_term;

				const { data } = await fetchWrapper.post(`/store/nearme`, payload);
				setStoreData(data);
			}
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			dispatch(setSearchTrigger(false));
			dispatch(setSearchTerm(''));
			setLoading(false);
		}
	};

	const viewMoreStore = async () => {
		dispatch(setLoader(true));
		const payload = {
			coordinates: [currentLocation.lat, currentLocation.lng],
			page: page_count,
			category: pagination_category,
		};
		try {
			if (pagination_category.length) {
				setError('');
				payload.category = pagination_category;

				const { data } = await fetchWrapper.post(`/store/nearme`, payload);

				setStoreData(data);
			}
		} catch (error) {
			setError(error.response.data.message);
		} finally {
			dispatch(setSearchCategory(false));
			setLoading(false);
			dispatch(setLoader(false));
		}
	};

	useEffect(() => {
		getNearByStores();
	}, [currentLocation]);
	// }, []);

	useEffect(() => {
		viewMoreStore();
	}, [page_count]);

	useEffect(() => {
		searchByType();
	}, [search_trigger]);

	useEffect(() => {
		searchCategoryByStore();
	}, [search_category]);

	if (loading) return <Loading />;

	return (
		<div className="bg-[#F3FCFF] ">
			<HomeBanner />
			<div className="py-16">
				<Header />
				{/* featured categories */}
				<Featured data={featured} />
				{/* Business Spotlight! */}
				<BusinessSpotlight data={spotlight} />
				{/* Great Deals Near Me */}
				{/* <GreatDeals data={greatDealsData} /> */}
				{/* Restaurants Near Me */}
				{error.length ? (
					<div className="text-center text-red-500 tracking-tight my-10 font-medium py-10 text-2xl">
						{error}
					</div>
				) : (
					<Restaurants data={storeData} />
				)}
				{/* Salons Near Me */}

				{/* <SalonsNear data={salonsData} /> */}
			</div>
		</div>
	);
}

export default Home;
