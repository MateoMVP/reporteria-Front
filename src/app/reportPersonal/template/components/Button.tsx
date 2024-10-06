"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface ButtonProps{
    ruta: string;
}

const Button: React.FC<ButtonProps> = ({ruta}) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push(ruta);
  };

  return (
    <button
      onClick={handleGoHome}
      className="absolute right-0 top-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Go home
    </button>
  );
};

export default Button;
