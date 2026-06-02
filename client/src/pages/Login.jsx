import React from "react";
import { PiSparkleFill } from "react-icons/pi";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineMicrophone } from "react-icons/hi";
import {
  HiOutlineSparkles,
  HiOutlineCodeBracket,
  HiOutlineBolt,
} from "react-icons/hi2";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../App";
import toast from "react-hot-toast";
import Neura from "../assets/NeuraAI.png";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <HiOutlineMicrophone />,
      title: "Voice Recognition",
      desc: "Natural real-time voice conversations.",
    },
    {
      icon: <HiOutlineSparkles />,
      title: "Smart Navigation",
      desc: "Natural real-time voice conversations.",
    },
    {
      icon: <HiOutlineCodeBracket />,
      title: "Easy Embed",
      desc: "Natural real-time voice conversations.",
    },
    {
      icon: <HiOutlineBolt />,
      title: "Voice Recognition",
      desc: "Natural real-time voice conversations.",
    },
  ];

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const res = await axios.post(
        serverURL + "/api/auth/google",
        {
          name: displayName,
          email,
        },
        { withCredentials: true },
      );
      setUser(res.data.user);
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-emerald-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* left */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-100 text-purple-600 text-sm font-medium">
              <PiSparkleFill />
              AI Virtual Voice Assistant
            </div>
            <h1 className="mt-8 text-5xl lg:text-7xl font-black leading-tight text-[#081028]">
              Build Smart AI Voice Assistants
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400">
                For Your Website
              </span>
            </h1>
            <p className="mt-8 text-lg text-[#475569] leading-8 max-w-2xl">
              Add powerful voice AI assistants to your website with zero
              complexity.
            </p>

            <button
              onClick={handleLogin}
              className="mt-10 h-16 px-8 rounded-2xl bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 text-white text-lg font-semibold flex items-center gap-4 shadow-[0_20px_80px_rgba(139,92,246,0.25)] hover:scale-[1.02] transition cursor-pointer"
            >
              <FcGoogle className="text-3xl bg-white rounded-full" />
              Continue with Google
            </button>
            <p className="mt-4 text-sm text-[#64748B]">
              Free plan available includes 200 AI responses.
            </p>
          </div>
          {/* right */}
          <div className="relative ">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-300 blur-[120px]" />
            <div className="relative rounded-[40px] border border-black/5 bg-white p-8 overflow-hidden">
              <div className="flex items-center justify-between ">
                <div>
                  <h2 className="mt-26 text-3xl font-bold text-[#070f25]">
                    FEATURES
                  </h2>
                </div>
                <div className="relative flex items-center justify-center flex-1">
                  <div
                    className="absolute w-[320px] h-[140px]  bg-gradient-to-r
                from-cyan-500
                to-purple-500 blur-3xl rounded-full"
                  ></div>
                  <img
                    src={Neura}
                    alt="NeuraAI"
                    className=" max-w-[320px] w-full z-10 relative h-auto transition-all
      duration-700
      hover:scale-110
      hover:ease-in-out
      hover: rounded-4xl
      cursor-pointer
      "
                  />
                </div>
              </div>
              <div className="mt-10 space-y-5">
                {features.map(({ icon, title, desc }, index) => (
                  <div
                    key={index}
                    className="flex gap-5 rounded-3xl border border-black/10 p-5 bg-white"
                  >
                    <div className="min-w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-white text-2xl  bg-gradient-to-r from-purple-400 to-cyan-300">
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-black text-lg font-semibold">
                        {title}
                      </h3>
                      <p className=" mt-2 leading-7 text-gray-500 text-sm">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
