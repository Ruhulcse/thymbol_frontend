import ViewMore from '@/components/button/ViewMore';
import SalonsList from '@/components/salons/SalonsList';
import Title from '@/components/title';

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
                <p className="text:base md:text-xl text-red-500 font-semibold text-center">
                    No Stores Found
                </p>
            )}
        </div>
    );
}

export default Restaurants;
