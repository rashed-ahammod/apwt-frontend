"use client";
import React from "react";
import { FormEvent } from "react";
import axios from "axios";
import { useState, ChangeEvent, JSX } from "react";
import { z } from "zod";

// ✅ Zod schema (same style as your login file)
const registerSchema = z.object({
  name: z.string().min(3, "Name must be 3+ chars"),

  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(6, "Min 6 chars")
    .regex(/[A-Z]/, "Must include uppercase")
    .regex(/[0-9]/, "Must include number"),

     phone: z
    .string()
    .regex(/^[0-9]{11}$/, "Phone must be 11 digits"),

  role: z.string().min(1, "Select role"),

 
});

// ✅ type (optional but good)
type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterPage(): JSX.Element {
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
     phone: "",
    role: "",
   
  });

  const [error, setError] = useState<string>("");

  // ✅ one handler (simple)
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // ✅ same pattern as login
    const result = registerSchema.safeParse(form);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/employee/create",
        result.data
      );

      alert("Registration Successful");

      // reset
      setForm({
        name: "",
        email: "",
        password: "",
        role: "",
        phone: "",
      });

      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div>
      <h1><center>Register Form</center></h1>
<center></center>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            // type="password" // optional but recommended  
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
            <div>
            <label>Phone</label>
            <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
            />
        </div>  

        <div>
          <label>Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="accountant">Accountant</option>
          </select>
        </div>

        {error && <p>{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}