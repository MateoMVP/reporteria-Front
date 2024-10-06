"use client";
import React, { ChangeEvent, useState } from "react";
import AXIOS from "../config/axios";
import Cookies from "js-cookie";
import type { UserInterface } from "../interfaces/User";
import { Bounce, ToastContainer, toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState<UserInterface["username"]>("");
  const [password, setPassword] = useState<UserInterface["password"]>("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await AXIOS.post("/login", {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        toast.success("Login success", {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: true,
          transition: Bounce,
        });
        const { token } = response.data;
        console.log("Se recibió el token", token);
        Cookies.set("authToken", token);
      } else {
        console.error("Error de autenticación");
        // toast.error("Login error", {
        //   position: "top-center",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      }
    } catch (error) {
      console.error("Error en la solicitud de autenticación", error);
      // toast.error("Login error", {
      //   position: "top-center",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Título del Login */}
          <h2 className="mt-10 text-center text-4xl font-bold text-blue-900">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <input
                  onChange={handleUsernameChange}
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username || ""}
                  autoComplete="username"
                  placeholder="Username"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-600 focus:border-blue-600 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <input
                  onChange={handlePasswordChange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password || ""}
                  autoComplete="current-password"
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
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
