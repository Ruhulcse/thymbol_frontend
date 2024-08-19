import Payment from "@/components/payment/Payment";
import { useParams } from "react-router-dom";

const ConsumerPaymentPage = () => {
  const { type } = useParams();
  const price_id =
    type?.toLowerCase() === "monthly"
      ? import.meta.env.VITE_STRIPE_PRICE_ID_MONTHLY_PREMIUM_CONSUMER
      : import.meta.env.VITE_STRIPE_PRICE_ID_ANNUAL_PREMIUM_CONSUMER;
  return (
    <div className="app_height flex flex-col items-center justify-center">
      <Payment price_id={price_id} type={type} />
    </div>
  );
};

export default ConsumerPaymentPage;
