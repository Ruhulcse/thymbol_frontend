import PricingCard from "@/components/ui/PricingCard";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const premium = [
  "create 6 digital coupons",
  "Sand push Notification",
  "video reviews",
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-evenly gap-3">
      <PricingCard
        title="Basic Account"
        headerClass="bg-customBlue"
        titleClass="text-white"
        paymentMethod="Free"
        onClick={() => navigate("/payment")}
      >
        <div className="flex items-center bg-gray-100 my-1   rounded-lg py-1">
          <span className="text-blue-500 m-2">
            <FaCheckCircle />
          </span>
          Create 2 digital coupons
        </div>
      </PricingCard>
      <PricingCard
        title="Premium Account"
        headerClass="bg-customBlue"
        titleClass="text-white"
        paymentMethod="$10"
        paymentAmount={"$33/month"}
        saveCost={"SAVE 33%"}
        onClick={() => navigate("/payment")}
      >
        {premium.map((item, i) => (
          <div
            key={i}
            className="flex items-center bg-gray-100 my-1   rounded-lg py-1"
          >
            <span className="text-blue-500 m-2">
              <FaCheckCircle />
            </span>
            {item}
          </div>
        ))}
      </PricingCard>
    </div>
  );
};

export default Dashboard;
