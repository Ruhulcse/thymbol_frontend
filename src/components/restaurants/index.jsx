import ViewMore from '@/components/button/ViewMore';
import SalonsList from '@/components/salons/SalonsList';
import Title from '@/components/title';
import Loading from '../Loading';

function Restaurants({ data }) {
    return (
        <div className="lg:container mx-auto mt-24 w-full">
            {data?.length ? (
                <>
                    <Title>{data[0].category} Near Me</Title>
                    <SalonsList data={data[0].stores} />
                </>
            ) : (
                <Loading />
            )}
            <ViewMore className="hidden md:flex" />
        </div>
    );
}


export default Restaurants;
