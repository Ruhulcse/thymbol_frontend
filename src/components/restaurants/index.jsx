import ViewMore from '@/components/button/ViewMore';
import SalonsList from '@/components/salons/SalonsList';
import Title from '@/components/title';
import Loading from '../Loading';

function Restaurants({ data }) {
    return (
        <div className="lg:container mx-auto mt-24 w-full">
            {data?.length ? (
                <>
                    {data?.map((item) => (
                        <>
                            <Title>{item?.category} Near Me</Title>
                            <SalonsList data={item?.stores} />
                            <div className="my-10">
                                <ViewMore className="hidden md:flex" />
                            </div>
                        </>
                    ))}
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default Restaurants;
