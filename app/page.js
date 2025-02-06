"use client";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const backend_uri = process.env.BACKEND_URI || "http://localhost:3001";

    fetch(`${backend_uri}/sendevents`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json(); // ✅ Use .json() instead of .text()
      })
      .then((data) => {
        console.log("Fetched Events:", data);
        setEvents(data); // ✅ Correctly update state
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // ✅ Dependency array to prevent infinite re-renders

  // Log events after state update
  useEffect(() => {
    console.log("Updated Events State:", events);
  }, [events]); // ✅ Logs only when `events` changes


  const [Is_Logged, setIs_Logged] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("Is_Logged");
      setIs_Logged(!!token);
    }
  }, []);

  const handlepublish = () => {
    router.push("/publish");
  };

  const handlelogin = () => {
    router.push("/login");
  }

  const handlesignup = () => {
    router.push("/signup");
  }

  const handleprofile = () => {
    router.push("/profile");
  }

  return (
    <div>
      <Navbar Is_Logged={Is_Logged} handlepublish={handlepublish} handlelogin={handlelogin} handlesignup={handlesignup} handleprofile={handleprofile} />
      <div className="flex justify-center h-screen w-full">
        <div className="md:w-[80%] w-[90%] h-full flex">
          {events.length === 0 ? ( // ✅ Correct condition
            <div className="text-black font-bold text-2xl">There are No Events</div>
          ) : (
            <div className="flex flex-wrap w-full gap-4 justify-between">
              {events.map((event) => (
                <div key={event._id} className="p-4 border rounded-lg shadow-md my-2 w-full md:w-[48%] h-[430px] overflow-y-auto cursor-pointer" onClick={() => router.push(`/events/${event._id}`)}>
                  <img src={event.imageUrl} alt={event.eventName} className="w-full h-64 rounded-lg object-cover" />
                  <h2 className="text-4xl font-bold mt-2">{event.eventName}</h2>
                  <p className="mt-2 text-gray-600">
                    {event.description.length > 50
                      ? `${event.description.slice(0, 50)}...`
                      : event.description}
                  </p>
                  <p className="mt-2 text-gray-600">Date: {event.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
