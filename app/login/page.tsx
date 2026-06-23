"use client";

import React from "react";

import { JSX } from "react";

import {

  useState,

  ChangeEvent,

  FormEvent,

} from "react";

import axios from "axios";

import { z } from "zod";

import { useRouter } from "next/navigation";


// ---------------- ZOD SCHEMA ----------------

const loginSchema = z.object({

  username: z
    .string()
    .min(3, "Username minimum 3 characters"),

  password: z
    .string()
    .min(6, "Password minimum 6 characters"),

});


// ---------------- TYPES ----------------

type LoginData = z.infer<typeof loginSchema>;


// ---------------- COMPONENT ----------------

export default function LoginPage(): JSX.Element {

  const router = useRouter();


  // ---------------- STATE ----------------

  const [form, setForm] = useState<LoginData>({

    username: "",

    password: "",

  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  // ---------------- HANDLE CHANGE ----------------

  const handleChange = (

    e: ChangeEvent<HTMLInputElement>

  ): void => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };


  // ---------------- HANDLE SUBMIT ----------------

  const handleSubmit = async (

    e: FormEvent<HTMLFormElement>

  ): Promise<void> => {

    e.preventDefault();


    // VALIDATION

    const result = loginSchema.safeParse(form);

    if (!result.success) {

      setError(result.error.issues[0].message);

      return;

    }


    try {

      setLoading(true);

      setError("");


      // LOGIN API

      const response = await axios.post(

        "http://localhost:5000/auth/login",

        result.data

      );

      console.log(response.data);


      // SAVE TOKEN

      localStorage.setItem(

        "token",

        response.data.access_token

      );


      // SAVE USER INFO

      localStorage.setItem(

        "user",

        JSON.stringify(response.data.user)

      );


      alert("Login Successful");

      router.push("/dashboard");

    } catch (err: any) {

      console.log(err);

      setError(

        err?.response?.data?.message ||

        "Login Failed"

      );

    } finally {

      setLoading(false);

    }

  };


  // ---------------- UI ----------------

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">


        {/* TITLE */}

        <h1 className="text-3xl font-bold text-center mb-6">

          Login

        </h1>


        {/* ERROR */}

        {

          error && (

            <p className="text-red-500 text-center mb-4">

              {error}

            </p>

          )

        }


        {/* FORM */}

        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >


          {/* USERNAME */}

          <div>

            <label className="block mb-1 font-medium">

              Email

            </label>

            <input

              type="text"

              name="username"

              value={form.username}

              onChange={handleChange}

              placeholder="Enter Email"

              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

            />

          </div>


          {/* PASSWORD */}

          <div>

            <label className="block mb-1 font-medium">

              Password

            </label>

            <input

              type="password"

              name="password"

              value={form.password}

              onChange={handleChange}

              placeholder="Enter password"

              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

            />

          </div>


          {/* BUTTON */}

          <button

            type="submit"

            disabled={loading}

            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"

          >

            {

              loading

                ? "Logging in..."

                : "Login"

            }

          </button>

        </form>


        {/* REGISTER LINK */}

        <p className="text-center mt-5 text-sm">

          Don't have an account?

          <span

            onClick={() => router.push("/registration")}

            className="text-blue-600 ml-1 cursor-pointer"

          >

            Register

          </span>

        </p>

      </div>

    </div>

  );

}