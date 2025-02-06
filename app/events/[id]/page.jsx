"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
    const pathname = usePathname();
    const segments = pathname.split("/");
    const eventId = segments[segments.length - 1];

    const [events, setEvents] = useState([]);

    const fetchData = async () => {
        const backend_uri = process.env.BACKEND_URI || "https://backend-event-management-2.onrender.com";
        const response = await fetch(`${backend_uri}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventId }), // Send the form data as JSON
        });

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setEvents(data);
    };
    useEffect(() => {
        fetchData();
    })

    const handleadd = async () => {
        const id = localStorage.getItem("id");
        const username = localStorage.getItem("username");
        const backend_uri = process.env.BACKEND_URI || "http://localhost:3001";
        const response = await fetch(`${backend_uri}/addattendee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventId, username, id }), // Send the form data as JSON
        });

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }

        fetchData();
    };

    return (
        <div className='h-screen w-full flex flex-col items-center'>
            <div className='md:w-[80%] w-[90%] h-full flex flex-col items-center'>
                <div key={events._id} className="flex flex-col md:w-[80%] w-[90%] py-8 gap-4">
                    <img src={events.imageUrl} alt={events.eventName} className="w-full h-64 rounded-lg object-cover shadow-md flex justify-center items-center" />
                    <h1 className="text-6xl font-bold">{events.eventName}</h1>
                    <p className='text-xl text-gray-600'>{events.description}</p>
                    <p className='text-xl text-gray-600'>{events.date}</p>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-48 shadow-md' onClick={handleadd}>Attend This Event</button>
                    <ul className='flex flex-col gap-2'>
                        {events.attendees?.length > 0 ? (
                            events.attendees.map((attendee) => (
                                <li key={attendee.id} className='text-xl text-gray-600'>{attendee.username}</li>
                            ))
                        ) : (
                            <p>No attendees yet.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default page