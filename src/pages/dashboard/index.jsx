import React, { useState } from "react";
import Card from "@/components/ui/Card";
import PricingCard from "@/components/ui/PricingCard";

const Dashboard = () => {
  return (
    <div>
      <PricingCard title="custom title" headerClass="bg-customBlue" titleClass="text-white">
        pricing
      </PricingCard>
    </div>
  );
};

export default Dashboard;
