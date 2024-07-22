"use client";
import React from "react";
import { IoClose } from "react-icons/io5";
import { format } from "date-fns";

interface NotificationCardProps {
  id: string; 
  emisorUser: string; 
  title: string;
  notificationDate: string;
  onDelete: (id: string) => void; 
}

// Component to display a notification card
const NotificationCard: React.FC<NotificationCardProps> = (props) => {
  const formattedDate = format(new Date(props.notificationDate), "dd MMM yyyy, HH:mm"); // Format the date using date-fns library
  return (
    <div className="md:max-w-64 w-full bg-ligthPurple rounded-lg p-4 mb-4 text-blancoHueso">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">
            {props.emisorUser} - {props.title}
          </p>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close Notification"
          onClick={() => props.onDelete(props.id)}
        >
          <IoClose className="text-xl" />
        </button>
      </div>
      <p className="text-sm">{formattedDate}</p>
    </div>
  );
};

export default NotificationCard;
