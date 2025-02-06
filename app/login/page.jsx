"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const backend_uri = process.env.BACKEND_URI || "http://localhost:3001";
      const response = await fetch(`${backend_uri}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const {id , username} = await response.json();

      if (response.status === 200) {
        localStorage.setItem("Is_Logged", true);
        localStorage.setItem("username", username);
        localStorage.setItem("id",id);
        router.push("/");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="md:w-[20%] w-[90%] h-full flex flex-col gap-2 p-4 border rounded-lg shadow-md md:h-1/3 h-1/2 justify-evenly">
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            className="border p-2 rounded-md w-full"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="border p-2 rounded-md w-full"
            {...register("password", { required: "Password is required" })}
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
