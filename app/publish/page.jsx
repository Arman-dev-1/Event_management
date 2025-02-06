"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Page = () => {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const id = localStorage.getItem("id");
      const backend_uri = process.env.BACKEND_URI || "https://backend-event-management-1.onrender.com/";
      const formData = new FormData();
      formData.append("eventName", data.eventName);
      formData.append("description", data.description);
      formData.append("date", data.date);
      formData.append("image", image);
      formData.append("id", id);

      const response = await fetch(`${backend_uri}/createevent`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      console.log("Event created successfully:", data);
      router.push("/");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 border p-4 md:h-[40%] md:w-[20%] justify-center items-center justify-around rounded-lg"
      >
        <div className="w-full px-1">
          <input
            type="text"
            id="eventName"
            name="eventName"
            placeholder="Event Name"
            className="border p-2 rounded-md w-full"
            {...register("eventName", { required: "Event name is required" })}
          />
          {errors.eventName && <p>{errors.eventName.message}</p>}
        </div>

        <div className="w-full px-1">
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            className="border p-2 rounded-md w-full"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="w-full px-1">
          <input
            type="date"
            id="date"
            name="date"
            className="border p-2 rounded-md w-full"
            {...register("date", { required: "Date is required" })}
          />
          {errors.date && <p>{errors.date.message}</p>}
        </div>
 
        <div className="w-full px-1">
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="border p-2 rounded-md w-full"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {errors.image && <p>{errors.image.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mx-1"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Page;
