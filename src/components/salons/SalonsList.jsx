import SalonsCard from "@/components/salons/SalonsCard";

function SalonsList({ data }) {
  return (
    <div className="flex justify-center mt-12 mx-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-screen-xl">
        {data?.map((item, i) => (
          <SalonsCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
}

export default SalonsList;
