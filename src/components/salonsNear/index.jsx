import ViewMore from "@/components/button/ViewMore";
import SalonsList from "@/components/salons/SalonsList";
import Title from "@/components/title";

function SalonsNear({ data }) {
  console.log("selon data", data);
  return (
    <div className="lg:container mx-auto mt-24 w-full ">
      <Title>Salons Near Me</Title>
      <SalonsList data={data} />
      <ViewMore className="hidden md:flex" />
    </div>
  );
}

export default SalonsNear;
