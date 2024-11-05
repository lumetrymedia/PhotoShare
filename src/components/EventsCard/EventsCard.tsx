import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import { Button } from "../ui/button";

import "./EventsCard.scss";

// Updated event interface to match the API data
interface Event {
  _id: string;           // Using _id as the id
  event_name: string;    // event_name from the API
  event_date: string;    // event_date from the API
  promptTitle: string;   // promptTitle is now used as location
}

interface EventsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  event: Event;
}

const EventsCard = ({
    className,
    event
  }: EventsCardProps) => {
    const formattedDate = new Date(event.event_date).toISOString().split('T')[0];
  
    return (
      <div key={event._id} className={classNames(className, "event-card bg-neutral-800 rounded-3xl shadow-md p-6 flex flex-col justify-between")}>
        <div>
          <h2 className="heading-2 mb-1">{event.event_name}</h2>
          <p className="text-neutral-400">{formattedDate}</p>
          <p className="mb-4">{event.promptTitle || "No prompt provided"}</p>
        </div>
  
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/event/${event._id}`}>View Gallery</Link>
        </Button>
      </div>
    );
  };
  
  export default EventsCard;
