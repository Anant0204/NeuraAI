import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import AssistantPreview from "../components/AssistantPreview";
import logo from "../assets/logo.png";
import Logo from "../components/Logo";
const Steps = [
  {
    step: "01",
    title: "Sign Up and Create Your Assistant",
    description:
      "Create your account and start building your personal AI voice assistant in minutes."
  },

  {
    step: "02",
    title: "Customizable Themes",
    description:
      "Choose from a variety of themes to match your needs."
  },

  {
    step: "03",
    title: "Train with Your Data",
    description:
      "Upload business ideas or custom knowledge so your assistant understands your content."
  },

  {
    step: "04",
    title: "Connect Integrations",
    description:
      "Connect apps, APIs, databases, and tools to make your assistant more powerful."
  },

  {
    step: "05",
    title: "Test and Optimize",
    description:
      "Talk with your assistant, improve responses, and fine tune its behavior."
  },

  {
    step: "06",
    title: "Deploy and Go Live",
    description:
      "Launch your AI assistant on websites, mobile apps, or anywhere your users are."
  }
];

const Home = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-white to bg-cyan-300" />
        <div className="absolute top-0 left-1/4 w-[320px] h-[320px] bg-purple-200/40 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[320px] h-[320px] bg-cyan-200/40 blur-3xl rounded-full" />

        <div className="relative max-w-6xl mx-auto">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 bg-white border border-purple-100 shadow-sm text-purple-600 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-cyan-300 rounded-full" />
              AI Virtual Voice Assistant
            </span>
          </div>

          <div className="mt-10 text-center sm:mt-12">
            <h1 className="max-w-5xl mx-auto text-[42px] leading-[52px] sm:text-6xl sm:leading-[72px] lg:text-7xl lg:leading-[88px] font-black tracking-[0.04em] text-black/90">
              Add a <br />
              <span className="inline-block px-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from bg-purple-500 to bg-cyan-300">
                  <Typewriter
                    words={[
                      "Virtual Voice Assistant",
                      "AI Chat Assistant",
                      "Voice Powered Assistant",
                    ]}
                    loop={true}
                    cursor={true}
                    cursorStyle="_"
                    cursorBlinking={true}
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={1200}
                  />
                </span>
              </span>
              <br className="hidden sm:block" />
              to Your Website
            </h1>
            <p className="max-w-2xl mx-auto mt-7 text-sm sm:text-lg lg:text-xl text-gray-400 leading-relaxed px-2">
              Create a smart voice-enabled assistant that talks to visitiors,
              answers questions and helps users navigate your website instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <button
                onClick={() => navigate("/builder")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-purple-700 text-white font-semibold text-sm sm:text-base hover:scale-[1.02] transition-all cursor-pointer"
              >
                Build Your Assistant
              </button>
            </div>

            <p className="mt-5 text-xs sm:text-sm text-gray-400">
              Free plan includes 200 AI responses.
            </p>
          </div>

          <AssistantPreview />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-black/90">
              Get started in minutes.
            </h2>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Smimple setup no complicated integration
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {Steps.map((s , i)=> (
              <div key={i} className="group hover:bg-white border border-gray-200 rounded-2xl p-7 transition-all ">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to bg-cyan-400">{s.step}</span>
              <h3 className="mt-5 text-lg font-semibold text-gray-950">{s.title}</h3>
              <p className="mt-3 text-sm text-gray-700 leading-relaxed">{s.description}</p>
               </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#010c13] px-6 py-7">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
         <div>
           <Logo/>

          <p className="text-gray-400 text-sm mt-2">Voice assistant for websites</p>
         </div>

         <p className="text-gray-500 text-sm">
          ©; {new Date().getFullYear()} NeuraAI. All rights reserved.
         </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
