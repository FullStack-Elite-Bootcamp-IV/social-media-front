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
import { usePathname, useRouter } from "next/navigation";
import { useLogoutMutation } from "@/store/services/authApi";
import { useUser } from "@/context/UserContext";
import Chats from "../chat/Chats";
import NavItem from "./NavItem";
import NavButton from "./NavButton";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const { user } = useUser();

  const [logout, { isSuccess: isLogout }] = useLogoutMutation();
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
        <ul className="flex flex-col space-y-2 p-4">
          <NavItem
            href="/homepage"
            icon={<IoHomeSharp className="text-xl" />}
            label="Inicio"
          />

          <NavItem
            href="/create"
            icon={<IoIosAddCircle className="text-xl" />}
            label="Crear"
          />

          <NavItem
            href={`/profile/${user?.userName}`}
            icon={<FaUser className="text-xl" />}
            label="Perfil"
          />
          <NavItem
            href="/settings"
            icon={<IoMdSettings className="text-xl" />}
            label="Configuración"
          />
          <NavButton
            icon={<FaSearch className="text-xl" />}
            label="Buscar"
            onClick={handleSearchClick}
          />
          <NavButton
            icon={<IoChatbubbleEllipses className="text-xl" />}
            label="Chats"
            onClick={() => setIsChatModalOpen((prevState) => !prevState)}
            isActive={isChatModalOpen}
          />
          <NavButton
            icon={<MdNotificationsActive className="text-xl" />}
            label="Notificaciones"
            onClick={() => {
              handleNotifToggle();
              setIsOpen(false);
            }}
          />
          <NavButton
            icon={<IoLogOutOutline className="text-xl" />}
            label="Cerrar sesión"
            onClick={handleLogout}
          />
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
          <div className="bg-blancoHueso p-4 rounded-lg shadow-lg w-3/4 relative">
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
      {isChatModalOpen && <Chats />}
    </div>
  );
};

export default Navbar;
