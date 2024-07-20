"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import NotificationModal from "../notification/NotificationModal";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // State to handle the notification modal
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  // Function to toggle the menu
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle the resize of the window and set the state of the menu
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Function to close the menu
  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  // UseEffect to handle the resize of the window and call the function handleResize to set the state of the menu
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to open/close the notification modal
  const handleNotifToggle = () => {
    setIsNotifModalOpen(!isNotifModalOpen);
  };

  return (
    <div className="h-auto w-screen bg-liquidLava text-blancoHueso flex flex-col md:h-screen md:w-64">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-2xl font-bold">Nexo</h2>
        <button
          onClick={handleMenuToggle}
          className="md:hidden"
          aria-label="Open Menu"
        >
          <IoMenu className="text-2xl" />
        </button>
      </div>
      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } fixed top-16 left-0 w-full z-20 bg-liquidLava md:block md:w-auto`}
      >
        <ul className="flex flex-col space-y-4 p-4">
          <Link href="/">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray">
              <IoHomeSharp className="text-xl" />
              <span>Inicio</span>
            </li>
          </Link>
          <Link href="/">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray">
              <FaSearch className="text-xl" />
              <span>Buscar</span>
            </li>
          </Link>
          <Link href="/pages/chat">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray">
              <IoChatbubbleEllipses className="text-xl" />
              <span>Chats</span>
            </li>
          </Link>
          <Link href="/pages/create">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray">
              <IoIosAddCircle className="text-xl" />
              <span>Crear</span>
            </li>
          </Link>

          <li
            className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray"
            onClick={() => {
              handleNotifToggle();
              setIsOpen(false);
            }}
          >
            <MdNotificationsActive className="text-xl" />
            <span>Notificaciones</span>
          </li>

          <Link href="/pages/profile">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray">
              <FaUser className="text-xl" />
              <span>Perfil</span>
            </li>
          </Link>
          <Link href="/pages/settings">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray">
              <IoMdSettings className="text-xl" />
              <span>Configuración</span>
            </li>
          </Link>
        </ul>
      </nav>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-10 md:hidden"
          onClick={handleCloseMenu}
        ></div>
      )}
      {isNotifModalOpen && (
        <div className="">
          ,<NotificationModal setIsNotifModalOpen={setIsNotifModalOpen} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
