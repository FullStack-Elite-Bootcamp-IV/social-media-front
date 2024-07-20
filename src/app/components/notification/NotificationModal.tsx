"use client";
import { useState } from "react";
import NotificationCard from "./NotificationCard";
import { IoClose } from "react-icons/io5";

const initialNotifArray = [
  {
    notificationId: "1",
    emisorName: "Alice Johnson",
    message: "liked your post",
    date: "2024-07-19T10:15:30Z",
  },
  {
    notificationId: "2",
    emisorName: "Bob Smith",
    message: "started following you",
    date: "2024-07-18T14:30:00Z",
  },
  {
    notificationId: "3",
    emisorName: "Charlie Brown",
    message: "commented on your photo",
    date: "2024-07-18T08:45:00Z",
  },
  {
    notificationId: "4",
    emisorName: "David Wilson",
    message: "shared your post",
    date: "2024-07-17T11:20:45Z",
  },
  {
    notificationId: "5",
    emisorName: "Eve Davis",
    message: "mentioned you in a comment",
    date: "2024-07-16T16:05:30Z",
  },
  {
    notificationId: "6",
    emisorName: "Frank Clark",
    message: "sent you a friend request",
    date: "2024-07-16T09:50:15Z",
  },
  {
    notificationId: "7",
    emisorName: "Grace Lee",
    message: "liked your photo",
    date: "2024-07-15T13:10:00Z",
  },
  {
    notificationId: "8",
    emisorName: "Henry Martinez",
    message: "commented on your post",
    date: "2024-07-14T17:35:20Z",
  },
  {
    notificationId: "9",
    emisorName: "Ivy Walker",
    message: "tagged you in a photo",
    date: "2024-07-13T19:25:30Z",
  },
  {
    notificationId: "10",
    emisorName: "Jack Lewis",
    message: "shared your story",
    date: "2024-07-12T12:00:00Z",
  },
];

const NotificationModal = ({ setIsNotifModalOpen }: any) => {
  //Hook to manage the notifications array
  const [notifArray, setNotifArray] = useState(initialNotifArray);

  //Function to delete a notification
  const handleDelete = (notificationId: string) => {
    setNotifArray((previusNotifArray) =>
      previusNotifArray.filter(
        (notif) => notif.notificationId !== notificationId
      )
    );
  };

  return (
    <>
      <div className="w-full md:w-auto mt-20 md:mt-0 overflow-auto h-screen bg-liquidLava scrollbar-hidden fixed top-0 md:left-64 z-10">
        <div className="flex justify-center text-center md:block">
          <h2 className="w-64 md:flex justify-center text-center p-4 text-blancoHueso">
            Notificaciones
          </h2>
          <button
            className="w-64 flex justify-center text-center text-blancoHueso hover:text-gray-300 p-4"
            aria-label="Close Notification Modal"
            onClick={() => {
              setIsNotifModalOpen(false);
            }}
          >
            <IoClose className="text-2xl text-blancoHueso" />
            Cerrar
          </button>
        </div>
        <div className="flex flex-col">
          {notifArray.map((notif) => (
            <NotificationCard
              key={notif.notificationId}
              {...notif}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
