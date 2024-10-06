import React,{ChangeEvent, useState} from "react";
import axios from "axios";


function Login() {

  const [username,setUsername] = useState<string>();
  const [password,serPassword] = useState();

  const handleUsernameChange = (e:ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  }

  
  
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form action="#" method="POST" className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-100"
          >
            Username
          </label>
          <input
            onChange={(e)=>e}
            id="username"
            name="username"
            type="text"
            required
            autoComplete="username"
            placeholder="Username"
            className="block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-100"
          >
            Password
          </label>
          <div className="text-sm">
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            className="block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></input>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
