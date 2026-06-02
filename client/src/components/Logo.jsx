import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Logo() {
     const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 cursor-pointer">

      {/* Logo Circle */}
      <div
       onClick={() => navigate("/")}
        className="
        relative
        w-16 h-16
        rounded-full
        p-[2px]

        bg-gradient-to-br
        from-fuchsia-500
        via-violet-600
        to-cyan-400

        shadow-[0_0_20px_rgba(217,70,239,.30),0_0_25px_rgba(6,182,212,.30)]

        flex items-center justify-center
      "
      >
        <div
          className="
          w-full h-full
          rounded-full

          bg-[radial-gradient(circle,#475569_0%,#334155_45%,#1E293B_100%)]

          flex items-center justify-center
          overflow-hidden
        "
        >
          <img
            src={logo}
            alt="logo"
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>

      {/* Brand Name */}
      <h1 className="font-bold text-2xl text-gray-700 leading-none">
        Neura
        <span
          className="
          font-extrabold
          text-transparent
          bg-clip-text
          bg-gradient-to-r
          from-purple-600
          to-cyan-400
        "
        >
          AI
        </span>
      </h1>

    </div>
  );
}

export default Logo;