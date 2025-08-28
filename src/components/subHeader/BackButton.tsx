"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
      className="group cursor-pointer rounded-full bg-cyan-900/30 p-2 transition-all duration-300 hover:bg-cyan-900/60"
    >
      <FaArrowLeft className="text-2xl text-cyan-900 transition-all duration-300 group-hover:text-amber-400" />
    </button>
  );
};

export default BackButton;
