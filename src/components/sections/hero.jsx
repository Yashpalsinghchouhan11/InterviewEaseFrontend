import React from "react";
import { Link } from "react-router-dom";

const avatars = [
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/65.jpg",
];

export default function HeroSection() {
  return (
    <section className="w-full py-20 font-poppins text-center text-gray-900">
      <div className="max-w-custom mx-auto px-6 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-bold leading-snug text-gray-900">
          Ace Your Interviews
        </h2>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-[#3A86FF] to-[#8338EC] bg-clip-text text-transparent mt-2">
          Effortlessly
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-2xl text-gray-900">
          Practice with our{" "}
          <span className="text-pink-500 font-semibold">AI-powered Interviewer</span> and receive{" "}
          <span className="text-pink-500 font-semibold">personalized</span>{" "}
          <span className="text-pink-500 font-semibold">feedback</span> on both technical skills and communication.
        </p>

        <Link
          to="/category"
          className="mt-8 px-8 py-3 rounded-full text-lg font-medium text-white bg-gradient-to-r from-[#9381FF] to-[#3A86FF] hover:from-[#3A86FF] hover:to-[#8338EC] shadow-lg transition-transform hover:scale-105"
        >
          Start Free Interview
        </Link>

        <div className="mt-8 flex items-center gap-3 rounded-full px-4 py-2 shadow-md">
          <div className="flex -space-x-2">
            {avatars.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`user${index + 1}`}
                className="w-10 h-10 rounded-full border-2 border-white transition-transform duration-300 hover:-translate-y-1.5"
              />
            ))}
          </div>
          <span className="font-medium text-sm md:text-base text-gray-800">
            +1000 others already Joined
          </span>
        </div>
      </div>
    </section>
  );
}
