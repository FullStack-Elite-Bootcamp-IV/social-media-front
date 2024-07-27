"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoHomeSharp, IoChatbubbleEllipses, IoMenu } from "react-icons/io5";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdNotificationsActive } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import SearchBar from "../search/Search";
import NotificationModal from "../notification/NotificationModal";
import { IoLogOutOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/store/services/authApi";
import { useUser } from "@/context/UserContext";
import Chats from "../chat/Chats";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const { user } = useUser();

  const [logout, {isSuccess: isLogout, isLoading}] = useLogoutMutation();
  const router = useRouter();

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleSearchClick = () => {
    setIsSearchBarVisible(true);
  };

  const handleCloseSearchBar = () => {
    setIsSearchBarVisible(false);
  };

  useEffect(() => {
    if (isLogout) {
      return router.push("/login");
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLogout, router]);

  const handleNotifToggle = () => {
    setIsNotifModalOpen(!isNotifModalOpen);
  };

  //Logout
  const handleLogout = async () => {
    logout({
      date: new Date(),
      email: "jhanssss@gmail.com",
    });
  };

  return (
    <div className="fixed h-auto w-screen bg-liquidLava text-blancoHueso flex flex-col md:h-screen md:w-64 z-20">
      <div className="flex items-center justify-between p-4">
      <Link href="/homepage">
        <h2 className="text-2xl font-bold">Nexo</h2>
      </Link>
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
        } fixed top-16 left-0 w-full z-20 bg-liquidLava md:block md:w-64`}
      >
        <ul className="flex flex-col space-y-4 p-4">
          <Link href="/homepage">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray">
              <IoHomeSharp className="text-xl" />
              <span>Inicio</span>
            </li>
          </Link>
          <li
            className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray"
            onClick={handleSearchClick}
          >
            <FaSearch className="text-xl" />
            <span>Buscar</span>
          </li>
          <button onClick={() => setIsChatModalOpen(prevState => !prevState)}>
            <li className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray">
              <IoChatbubbleEllipses className="text-xl" />
              <span>Chats</span>
            </li>
          </button>
          <Link href="/create">
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
          <Link href={`/profile/${user?.userName}`}>
            <li className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray">
              <FaUser className="text-xl" />
              <span>Perfil</span>
            </li>
          </Link>
          <Link href="/settings">
            <li className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray">
              <IoMdSettings className="text-xl" />
              <span>Configuración</span>
            </li>
          </Link>
          <li
            className="flex items-center space-x-2 cursor-pointer hover:text-dustyGray"
            onClick={handleLogout}
          >
            <IoLogOutOutline className="text-xl" />
            <span>Cerrar sesión</span>
          </li>
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
      {isSearchBarVisible && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-blancoHueso p-4 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={handleCloseSearchBar}
            >
              &times;
            </button>
            <SearchBar />
          </div>
        </div>
      )}
      {
        isChatModalOpen && <Chats />
      }
    </div>
  );
};

export default Navbar;
