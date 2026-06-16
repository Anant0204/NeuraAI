import React from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../App";
import axios from "axios";

function Billing({ user , setUser}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !user.isSetupComplete) {
      toast.error("Setup your assistant first !");
      navigate("/builder");
    }
  }, []);

  const remainingMessages =
    Math.max(0, user?.requestLimit || 0) - (user?.totalMessages || 0);

  const remainingDays = user?.proExpiry
    ? Math.ceil((new Date(user.proExpiry) - new Date()) / (1000 * 60 * 60 * 24))
    : 0;

  const handlePay = async () => {
    try {
      const res = await axios.post(
        serverURL + "/api/billing/order",
        { plan: "pro" },
        { withCredentials: true },
      );
      const order = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "NeuraAI",
        description: "Pro plan",
        order_id: order.id,

        handler: async (response) => {
          const verifyResponse = await axios.post(serverURL + "/api/billing/verify" , response , {withCredentials:true})
          if(verifyResponse.data.success){
            toast.success("Payment Successfully")

            setUser(verifyResponse.data.user)



          }
        },
        theme:{
          color: "#7c3aed"
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      toast.error("Payment failed")
      console.log(error)
    }
  };
  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className=" mb-8">
          <h2 className="text-3xl font-bold text-black">
            Billing & Subscription
          </h2>
          <p className="text-gray-500 mt-1">
            Manage your AI assistant plan and usage
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="rounded-2xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500 ">Current Plan</p>
            <h2 className="text-xl font-bold text-black mt-1 capitalize">
              {user?.plan}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500 "> Gemini Status</p>
            <h2
              className={`text-xl font-bold mt-1 capitalize ${user?.geminiStatus === "active" ? "text-green-500" : user?.geminiStatus === "invalid" ? "text-red-500" : "text-gray-500"}`}
            >
              {user?.geminiStatus}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500 ">
              {user?.plan === "free" ? "Messages Left" : "Plan Expiry"}
            </p>
            <h2 className="text-xl font-bold text-black mt-1 capitalize">
              {user?.plan === "free"
                ? remainingMessages
                : `${remainingDays} Days`}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-gray-200 rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950">Free Plan</h2>
            <h3 className="text-5xl font-bold mt-5 text-[#081028">₹0</h3>
            <ul className="mt-6 space-y-6 text-gray-600">
              <li>200 AI messages</li>
              <li>Voice Assistant</li>
              <li>Navigation Support</li>
              <li>Basic Customization</li>
            </ul>
          </div>

          {/* pro plan  */}
          <div className="rounded-3xl p-8 bg-gradient-to-r from-purple-600 to-cyan-300 text-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-950">Pro Plan</h2>
            <h3 className="text-5xl font-bold mt-5 text-[#081028">₹699</h3>
            <p className="mt-2 opacity-80">3 Months Access</p>
            <ul className="mt-6 space-y-4 opacity-90">
              <li>Unlimited AI messages</li>
              <li>Advancded AI assistant</li>
              <li>Priority performance</li>
              <li>Unlimited navigations</li>
              <li>Premium support</li>
            </ul>

            <button
            onClick={handlePay}
              disabled={user?.plan === "pro"}
              className={`mt-8 h-14 w-full rounded-2xl font-semibold transition ${user?.plan === "pro" ? "bg-cyan-300 text-black cursor-default" : "bg-white text-gray-700 cursor-pointer"}`}
            >
              {user?.plan === "pro" ? "Active Plan" : "Upgrade Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
