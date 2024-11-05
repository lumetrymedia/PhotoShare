import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

import { Button } from "../../components/ui/button";
import { url } from "../../lib/utils";

interface EventDetailsProps extends React.HTMLAttributes<HTMLDivElement> {}

interface Event {
    _id: string;
    event_name: string;
    event_date: string;
    promptTitle: string;
    galleryImageUrls: string[];
}

const EventDetails = ({ className }: EventDetailsProps) => {
    const { uniqueId } = useParams<{ uniqueId: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Function to fetch event details
    const fetchEventDetails = async () => {
        try {
            const response = await fetch(`${url}/api/event/${uniqueId}`);
            if (!response.ok) {
                throw new Error("Event not found");
            }
            const data = await response.json();
            setEvent(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch event details when component mounts and set up auto-refresh every 15 seconds
    useEffect(() => {
        fetchEventDetails();

        const intervalId = setInterval(() => {
            fetchEventDetails(); // Fetch every 15 seconds
            console.log("reloaded");
        }, 15000);

        return () => clearInterval(intervalId);
    }, [uniqueId]);

    if (loading) {
        return <p className="container mt-64 mx-auto text-center">Loading event details...</p>;
    }

    if (error) {
        return <p className="container mt-64 mx-auto text-center">{error}</p>;
    }

    if (!event) {
        return (
            <p className="container mt-64 mx-auto text-center">Event not found.</p>
        );
    }

    return (
        <div className={classNames(className, "min-h-screen my-16 relative")}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {event.galleryImageUrls?.slice().reverse().map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={image}
                            alt={`Event ${event.event_name} - ${index + 1}`}
                            className="w-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventDetails;
