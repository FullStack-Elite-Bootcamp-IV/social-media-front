"use client";
import { useEffect, useState } from "react";
import NotificationCard from "./NotificationCard";
import { IoClose } from "react-icons/io5";
import { useGetNotificationsByUserQuery } from "@/store/services/notificationsApi";
import { useUser } from "@/context/UserContext";

interface Notification {
  id: string;
  status: boolean;
  action: string;
  title: string;
  description: string;
  notificationDate: string;
  receptorUser: string;
  emisorUser: string;
}
const NotificationModal = ({ setIsNotifModalOpen }: any) => {

  const { user } = useUser();

  const { data: notifications } = useGetNotificationsByUserQuery(user?.userId);

  const [notifArray, setNotifArray] = useState<Notification[]>([]);
  
  useEffect(() => {
    if (notifications) {
      setNotifArray(notifications);
    }
  }, [notifications]);

  const handleDelete = (notificationId: string) => {
    setNotifArray((previousNotifArray) =>
      previousNotifArray.filter(
        notif => notif.id !== notificationId
      )
    );
  };

  return (
    <>
      <div className="w-full md:w-auto mt-20 md:mt-0 px-4 overflow-auto h-screen bg-purple-900 scrollbar-hidden fixed top-0 md:left-64 z-10">
        <div className="flex justify-center text-center md:block">
          <h2 className="w-64 md:flex justify-center text-center p-4 text-blancoHueso">
            Notifications
          </h2>
          <button
            className="w-64 flex justify-center text-center text-blancoHueso hover:text-gray-300 p-4"
            aria-label="Close Notification Modal"
            onClick={() => {
              setIsNotifModalOpen(false);
            }}
          >
            <IoClose className="text-2xl text-blancoHueso" />
            Close
          </button>
        </div>
        <div className="flex flex-col">
        {notifArray.map((notif) => (
            <NotificationCard
              key={notif.id}
              id={notif.id}
              emisorUser={notif.emisorUser}
              title={notif.description}
              notificationDate={notif.notificationDate}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
