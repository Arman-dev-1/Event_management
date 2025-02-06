"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Profile() {
    const [username, setUsername] = useState("");
    const [events, setEvents] = useState([]);
    const [eventbyuser, setEventbyuser] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUsername = localStorage.getItem("username");
            if (storedUsername) {
                setUsername(storedUsername);
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const id = localStorage.getItem("id");
            const backend_uri = process.env.BACKEND_URI || "https://backend-event-management-1.onrender.com";

            try {
                const response = await fetch(`${backend_uri}/eventsbyuser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch");
                }

                const { filteredEvents, eventbyuser } = await response.json();
                setEvents(filteredEvents);
                setEventbyuser(eventbyuser);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("id");
        localStorage.removeItem("Is_Logged");
        router.push("/");
    };

    return (
        <div className="h-screen w-full flex flex-col items-center">
            <div className="md:w-[80%] w-[90%] h-full flex flex-col items-center mt-8">
                <button
                    className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg shadow-md transition hover:shadow-lg self-start"
                    onClick={() => router.push("/")}
                >
                    Back
                </button>
                <div className="w-full flex justify-between">
                    <h1 className="text-3xl font-bold mt-4">Hello, {username}</h1>
                    <button
                        className="px-4 py-2 text-black rounded-lg shadow-md transition hover:shadow-lg"
                        onClick={handleLogout}
                    >
                        LogOut
                    </button>
                </div>

                <h2 className="text-2xl font-bold mt-4 self-start mt-8">All Events Published By You</h2>
                <div className="flex flex-wrap justify-between w-full">
                    {eventbyuser.length === 0 ? (
                        <p className="self-start">No events published yet.</p>
                    ) : (
                        eventbyuser.map((event) => (
                            <div key={event.id} className="p-4 border rounded-lg shadow-md my-2 w-full md:w-[48%]">
                                <h3 className="text-xl font-bold">{event.name}</h3>
                                <p>{event.description}</p>
                                <p>{event.date}</p>
                            </div>
                        ))
                    )}
                </div>

                <h2 className="text-2xl font-bold mt-4 self-start mt-8">All Events You Are Attending</h2>
                <div className="flex flex-wrap justify-between w-full">
                    {events.length === 0 ? (
                        <p>You are not attending any events yet.</p>
                    ) : (
                        events.map((event) => (
                            <div key={event.id} className="p-4 border rounded-lg shadow-md my-2 w-full md:w-[48%]">
                                <h3 className="text-xl font-bold">{event.name}</h3>
                                <p>{event.description}</p>
                                <p>{event.date}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
