import SalonsCard from '@/components/salons/SalonsCard';

function SalonsList({ data }) {
    return (
        <div className="overflow-x-auto flex gap-4 justify-around mt-12 mx-8 overflow-y-hidden">
            {data?.map((item, i) => (
                <SalonsCard item={item} key={i} />
            ))}
        </div>
    );
}

export default SalonsList;
