import React, { useState } from "react";
import { TiMicrophone } from "react-icons/ti";


const themes = {
  dark: {
    bg: "bg-[#050816]",
    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_45%)]",
    orb: "from-cyan-400 via-purple-500 to-pink-500",
    cardBorder: "border border-white/10 backdrop-blur-md",
    text: "text-white",
    sub: "text-white/65",
    listening: "text-emerald-400",
    wave: "bg-emerald-400",
    button: "from-purple-500 to-violet-400",
    micGlow: "shadow-[0_0_60px_rgba(168,85,247,0.45)]",
  },

  ocean: {
    bg: "bg-gradient-to-b from-[#02111d] via-[#06253a] to-[#0b3a52]",
    overlay:
      "bg-[radial-gradient(circle_at_bottom,rgba(0,255,255,0.12),transparent_60%)]",
    orb: "from-cyan-300 via-blue-400 to-sky-600",
    cardBorder: "border border-cyan-400/20 backdrop-blur-sm",
    text: "text-cyan-50",
    sub: "text-cyan-200/60",
    listening: "text-cyan-300",
    wave: "bg-cyan-300",
    button: "from-cyan-500 to-sky-600",
    micGlow: "shadow-[0_0_90px_rgba(0,255,255,0.35)]",
  },

  neon: {
    bg: "bg-black",
    overlay:
      "bg-[linear-gradient(to_right,rgba(255,0,150,0.08),rgba(0,255,255,0.08))]",
    orb: "from-pink-500 via-fuchsia-500 to-cyan-400",
    cardBorder: "border-2 border-pink-500/30",
    text: "text-pink-50",
    sub: "text-pink-200/70",
    listening: "text-pink-400",
    wave: "bg-pink-400",
    button: "from-pink-500 to-fuchsia-600",
    micGlow: "shadow-[0_0_100px_rgba(255,0,150,0.55)]",
  },

  midnight: {
    bg: "bg-gradient-to-br from-slate-950 via-[#111827] to-slate-900",
    overlay:
      "bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)]",
    orb: "from-indigo-500 via-violet-500 to-blue-500",
    cardBorder: "border border-indigo-500/20",
    text: "text-slate-100",
    sub: "text-slate-400",
    listening: "text-indigo-300",
    wave: "bg-indigo-400",
    button: "from-indigo-600 to-violet-600",
    micGlow: "shadow-[0_0_60px_rgba(99,102,241,0.5)]",
  },

  emerald: {
    bg: "bg-gradient-to-b from-[#02120F] via-[#07332A] to-[#031B17]",
    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(0,255,180,0.12),transparent_50%)]",
    orb: "from-emerald-400 via-green-400 to-lime-400",
    cardBorder: "border border-emerald-500/25",
    text: "text-emerald-50",
    sub: "text-emerald-200/60",
    listening: "text-lime-300",
    wave: "bg-lime-300",
    button: "from-emerald-500 to-green-500",
    micGlow: "shadow-[0_0_80px_rgba(0,255,180,0.35)]",
  },

  glass: {
    bg: "bg-gradient-to-br from-slate-100 to-slate-300",
    overlay:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.5),transparent_60%)]",
    orb: "from-white via-slate-400 to-yellow-400",
    cardBorder: "border border-white/40 backdrop-blur-2xl bg-white/20",
    text: "text-slate-900",
    sub: "text-slate-600",
    listening: "text-purple-500",
    wave: "bg-purple-500",
    button: "from-white to-slate-300",
    micGlow: "shadow-[0_0_40px_rgba(255,255,255,0.6)]",
  },
};

function AssistantPreview() {
  const [theme, setTheme] = useState("dark");
  const current = themes[theme];

  return (
    <div
      className={"flex items-center justify-center px-3 sm:px-4 py-10 sm:py-14"}
    >
      <div
        className={`relative w-[280px] h-[450px] sm:w-[330px] sm:h-[500px] md:w-[380px] md:h-[550px] rounded-[32px] sm:rounded-[43px] overflow-hidden transition-all duration-500 ${current.bg} ${current.cardBorder}`}
      >
        <div className={`absolute inset-0 ${current.overlay}`} />
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex items-center gap-2">
          {/* dark */}
          <button
            onClick={() => setTheme("dark")}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#050816] border transition-all cursor-pointer ${
              theme === "dark"
                ? "border-purple-400 scale-110"
                : "border-white/20"
            }`}
          />

          {/* Ocean */}
          <button
            onClick={() => setTheme("ocean")}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-700 border transition-all cursor-pointer ${
              theme === "ocean"
                ? "border-cyan-400 scale-110"
                : "border-white/20"
            }`}
          />

          {/* Neon */}
          <button
            onClick={() => setTheme("neon")}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 border transition-all cursor-pointer ${
              theme === "neon" ? "border-pink-400 scale-110" : "border-white/20"
            }`}
          />

          {/* Midnight */}
          <button
            onClick={() => setTheme("midnight")}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-indigo-600 to-slate-900 border transition-all cursor-pointer ${
              theme === "midnight"
                ? "border-indigo-400 scale-110"
                : "border-white/20"
            }`}
          />

          {/* Emerald */}
          <button
            onClick={() => setTheme("emerald")}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-emerald-400 to-green-700 border transition-all cursor-pointer ${
              theme === "emerald"
                ? "border-emerald-400 scale-110"
                : "border-white/20"
            }`}
          />

          {/* Glass */}
          <button
            onClick={() => setTheme("glass")}
            className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-white to-slate-300 border transition-all cursor-pointer ${
              theme === "glass"
                ? "border-slate-500 scale-110"
                : "border-gray-300"
            }`}
          />
        </div>

        <div className="relative z-20 flex flex-col items-center justify-between h-full px-5 py-6 sm:px-7 sm:py-8">
          <div className="relative mt-1">
            <div
              className={`absolute inset-0 scale-[2] rounded-full blur-[80px] bg-gradient-to-r ${current.orb} opacity-60`}
            />
            <div
              className={`top-7 relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${current.orb} animate-pulse before:absolute before:inset-0 before:rounded-full  before:bg-white/20 before:blur-xl`}
            />
          </div>
          <div className="text-center">
            <h2
              className={`text-[20px] s:text-[26px] md:text-[32px] font-semibold ${current.text}`}
            >
              Hello! I'm{" "}
              <span className="font-extrabold text-orange-700">NeuraAI</span>
            </h2>
            <p
              className={`mt-4 text-[13px] s:text-[15px] md:text-[16px] leading-6 sm:leading-7 max-w-[280px] mx-auto ${current.sub}`}
            >
              Your smart voice assistant.
              <br />
              Ask anything about your website.
            </p>

            <div className="mt-6 sm:mt-8">
              <p
                className={`text-sm sm:text-base font-medium ${current.listening}`}
              >
                Listening...
              </p>
              <div className="flex items-end justify-center gap-1 sm:gap-1.5 mt-3 sm:mt-4">
                <div
                  className={`w-1 h-7 rounded-full ${current.wave} animate-pulse`}
                />
                <div
                  className={`w-1 h-2 rounded-full ${current.wave} animate-pulse`}
                />
                <div
                  className={`w-1 h-6 rounded-full ${current.wave} animate-pulse`}
                />
                <div
                  className={`w-1 h-1 rounded-full ${current.wave} animate-pulse`}
                />
                <div
                  className={`w-1 h-6 rounded-full ${current.wave} animate-pulse`}
                />
                <div
                  className={`w-1 h-5 rounded-full ${current.wave} animate-pulse`}
                />
                <div
                  className={`w-1 h-5 rounded-full ${current.wave} animate-pulse`}
                />
              </div>

            </div>
          </div>

          <div className="relative mb-1">
            <div className={`absolute inset-0 rounded-full blur-2xl opacity-60 ${current.wave} `}/>
            <button className={`relative w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18 rounded-full bg-gradient-to-br ${current.button} ${current.micGlow} flex items-center justify-center`}>
              <TiMicrophone className="text-black text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssistantPreview;
