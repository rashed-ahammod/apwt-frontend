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

const registerSchema = z.object({

  name: z
    .string()
    .min(3, "Name minimum 3 characters"),

  email: z
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password minimum 6 characters")
    .regex(/[A-Z]/, "Password must contain uppercase")
    .regex(/[0-9]/, "Password must contain number"),

  phone: z
    .string()
    .regex(/^[0-9]{11}$/, "Phone must be 11 digits"),

  role: z
    .string()
    .min(1, "Select role"),

});


// ---------------- TYPES ----------------

type RegisterData = z.infer<typeof registerSchema>;


// ---------------- COMPONENT ----------------

export default function RegisterPage(): JSX.Element {

  const router = useRouter();


  // ---------------- STATE ----------------

  const [form, setForm] = useState<RegisterData>({

    name: "",

    email: "",

    password: "",

    phone: "",

    role: "",

  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  // ---------------- HANDLE CHANGE ----------------

  const handleChange = (

    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>

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


    // ZOD VALIDATION

    const result = registerSchema.safeParse(form);

    if (!result.success) {

      setError(result.error.issues[0].message);

      return;

    }


    // REGISTER API

    try {

      setLoading(true);

      setError("");


      const response = await axios.post(

        "http://localhost:5000/employee/create",

        result.data

      );

      console.log(response.data);

      alert("Registration Successful");


      // RESET FORM

      setForm({

        name: "",

        email: "",

        password: "",

        phone: "",

        role: "",

      });


      // REDIRECT

      router.push("/login");

    } catch (err: any) {

      console.log(err);

      setError(

        err?.response?.data?.message ||

        "Registration Failed"

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

          Register

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


          {/* NAME */}

          <div>

            <label className="block mb-1 font-medium">

              Name

            </label>

            <input

              type="text"

              name="name"

              value={form.name}

              onChange={handleChange}

              placeholder="Enter your name"

              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

            />

          </div>


          {/* EMAIL */}

          <div>

            <label className="block mb-1 font-medium">

              Email

            </label>

            <input

              type="email"

              name="email"

              value={form.email}

              onChange={handleChange}

              placeholder="Enter email"

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


          {/* PHONE */}

          <div>

            <label className="block mb-1 font-medium">

              Phone

            </label>

            <input

              type="text"

              name="phone"

              value={form.phone}

              onChange={handleChange}

              placeholder="Enter phone number"

              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

            />

          </div>


          {/* ROLE */}

          <div>

            <label className="block mb-1 font-medium">

              Role

            </label>

            <select

              name="role"

              value={form.role}

              onChange={handleChange}

              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"

            >

              <option value="">

                Select Role

              </option>

              <option value="employee">

                Employee

              </option>

              <option value="manager">

                Manager

              </option>

              <option value="supplier">

                Supplier

              </option>

            </select>

          </div>


          {/* BUTTON */}

          <button

            type="submit"

            disabled={loading}

            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-300"

          >

            {

              loading

                ? "Registering..."

                : "Register"

            }

          </button>

        </form>


        {/* LOGIN LINK */}

        <p className="text-center mt-5 text-sm">

          Already have an account?

          <span

            onClick={() => router.push("/login")}

            className="text-blue-600 ml-1 cursor-pointer"

          >

            Login

          </span>

        </p>

      </div>

    </div>

  );

}