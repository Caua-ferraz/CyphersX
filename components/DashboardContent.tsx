import React from "react";
import { Button } from "@/components/ui/button";
import { manageBilling } from "@/lib/actions/stripe";
import { FaDiscord } from "react-icons/fa";

interface DashboardContentProps {
  user: any;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const handleBilling = async () => {
    if (user?.subscription?.customer_id) {
      try {
        const response = await manageBilling(user.subscription.customer_id);
        const data = JSON.parse(response);
        if (data.error) {
          console.error(data.error);
          // Handle the error appropriately (e.g., show an error message to the user)
        } else {
          window.location.href = data.url;
        }
      } catch (error) {
        console.error("Error handling billing:", error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded">
        <p className="font-medium">Thanks for buying! Our boilerplate will continuously update.</p>
      </div>
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <span className="text-lg font-medium">Status</span>
        <span className="text-green-600 font-semibold">Active</span>
      </div>
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <span className="text-lg font-medium">Plan</span>
        <span>{user.subscription.plan || "Standard"}</span>
      </div>
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <span className="text-lg font-medium">Next Billing Date</span>
        <span>{new Date(user.subscription.end_at).toLocaleDateString()}</span>
      </div>
      <Button onClick={handleBilling} className="w-full mt-6">
        Manage Billing
      </Button>
      <Button
        onClick={() => window.open("https://discord.gg/x8939933333333333333", "_blank")}
        variant="outline"
        className="w-full mt-4 flex items-center justify-center"
      >
        <FaDiscord className="w-5 h-5 mr-2" />
        Join our community
      </Button>
    </div>
  );
}