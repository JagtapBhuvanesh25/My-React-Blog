import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import Authservice from "../Appwrite/auth";
import { login as authLogin } from "../store/authSlice";

function LoginP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await Authservice.login(data);
      if (session) {
        const currentUser = await Authservice.getCurrentUser();
        if (currentUser) dispatch(authLogin(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center w-full px-4">
      <div className="mx-auto w-full max-w-md bg-gray-700 text-gray-200 rounded-xl p-8 border border-gray-700 shadow-md">
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-semibold leading-tight">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
          >
            Sign Up
          </Link>
        </p>

        {error && (
          <p
            className="text-red-400 mt-6 text-center text-sm"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email Address Must Be A Valid Address",
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button type="submit" className="w-full bg-blue-600 text-white">
              Login
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          By signing in you agree to our{" "}
          <Link to="/" className="underline hover:text-gray-300">
            Terms
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

export default LoginP;
