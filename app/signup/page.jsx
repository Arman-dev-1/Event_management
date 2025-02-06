"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';

const Page = () => {
  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const backend_uri = process.env.BACKEND_URI || "https://backend-event-management-1.onrender.com";
      const response = await fetch(`${backend_uri}/signup`, {
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
      
      // Handle successful submission (e.g., show a success message)
      console.log('Form submitted successfully:', data);
      if(response.status === 200) {
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
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 border p-4 md:h-[40%] md:w-[20%] justify-center items-center justify-around rounded-lg'>
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder='Username'
            className='border p-2 rounded-md w-full'
            {...register('username', { required: 'Username is required' })} // Hook into react-hook-form
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Email'
            className='border p-2 rounded-md w-full'
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Password'
            className='border p-2 rounded-md w-full'
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-3/4'>Submit</button>
      </form>
    </div>
  );
};

export default Page;
