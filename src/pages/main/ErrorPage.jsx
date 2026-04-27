import { Link } from "react-router-dom";

export default function ErrorPage({ code, message, image }) {
  return (
    <div className="font-[var(--font-inter)] relative w-full h-screen bg-[#090C16] overflow-hidden flex items-center justify-center">

      <div className="absolute w-[900px] h-[900px] rounded-full 
        bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_0%,_transparent_70%)]" />

      <div className="absolute w-[600px] h-[600px] rounded-full 
        bg-[radial-gradient(circle,_rgba(255,255,255,0.08)_0%,_transparent_70%)]" />

      <div className="absolute w-[350px] h-[350px] rounded-full 
        bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_0%,_transparent_70%)]" />

      <div className="absolute w-full h-full text-white">
        <span className="absolute top-[10%] left-[15%]">✦</span>
        <span className="absolute top-[20%] right-[20%]">✦</span>
        <span className="absolute top-[30%] left-[40%]">✦</span>
        <span className="absolute top-[50%] right-[10%]">✦</span>
        <span className="absolute top-[70%] left-[10%]">✦</span>
        <span className="absolute bottom-[20%] right-[30%]">✦</span>
        <span className="absolute bottom-[10%] left-[25%]">✦</span>
        <span className="absolute top-[15%] right-[5%]">✦</span>
        <span className="absolute bottom-[30%] left-[50%]">✦</span>
        <span className="absolute bottom-[15%] right-[15%]">✦</span>
      </div>

   
      <div className="relative text-center z-10">

        <div className="flex items-center justify-center">
          <span className="text-white font-bold text-[140px]">
            {code[0]}
          </span>

          <img
            src="https://www.svgrepo.com/show/440486/earth.svg"
            alt="error illustration"
            className="w-[110px] mx-4"
          />

          <span className="text-white font-bold text-[140px]">
            {code[2]}
          </span>
        </div>

        <h1 className="text-abu font-bold text-[70px] mt-6">
          Whoops...
        </h1>

        <p className="text-abu font-bold text-[28px] mt-2">
          {message}
        </p>

        <Link
          to="/"
          className="block mt-6 text-[28px] font-medium text-lime hover:opacity-80"
        >
          Go To Home
        </Link>

      </div>
    </div>
  );
}