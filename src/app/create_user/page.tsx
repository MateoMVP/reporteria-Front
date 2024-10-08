"use client";
import React, { ChangeEvent, useState } from "react";
import AXIOS from "../config/axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { UserInterface } from "../interfaces/User";

function Register() {

  const [registerData, setRegisterData] = useState<UserInterface>({
    name: "",
    username: "",
    password: "",
  });

 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value }); // Actualiza el estado dinámicamente
  };

  
  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AXIOS.post("/register", {
        name: registerData.name,
        username: registerData.username,
        password: registerData.password,
      });

      if (response.status === 200) {
        toast.success("User registered successfully", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          transition: Bounce,
        });
        setRegisterData({ name: "", username: "", password: "" }); // Limpiar formulario
      }
    } catch (error) {
      console.error("Error en el registro de usuario", error);
      toast.error("Registration error", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Título del Registro */}
          <h2 className="mt-10 text-center text-4xl font-bold text-blue-900">Register</h2>
          <form onSubmit={handleSubmitRegister} className="mt-10 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <input
                  onChange={handleInputChange}
                  id="name"
                  name="name" // El nombre debe coincidir con la propiedad del estado
                  type="text"
                  required
                  value={registerData.name}
                  placeholder="Full Name"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <input
                  onChange={handleInputChange}
                  id="username"
                  name="username" // El nombre debe coincidir con la propiedad del estado
                  type="text"
                  required
                  value={registerData.username}
                  placeholder="Username"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <input
                  onChange={handleInputChange}
                  id="password"
                  name="password" // El nombre debe coincidir con la propiedad del estado
                  type="password"
                  required
                  value={registerData.password}
                  placeholder="Password"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
