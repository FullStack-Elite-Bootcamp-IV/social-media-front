"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import AuthGuard from "@/app/components/Guards/AuthGuard";
import Navbar from "../../../components/navbar/Navbar"

const EditProfile = () => {
  const { loginToken, register, handleDarkMode } = useAuth();

  const [fullname, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [description, setDecription] = useState("");
  const [website, setWebSite] = useState("");
  const [gender, setGender] = useState("");
  const [workplace, setWorkPlace] = useState("");
  const [location, setLocation] = useState("");
  const setHandlerDarkMode = () => {
    handleDarkMode();
  };

  useEffect(() => {}, []);

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      fullname,
      profilePicture,
      description,
      website,
      gender,
      workplace,
      location,
    };

    console.log(data);
  };

  return (
    <AuthGuard>
      <Navbar></Navbar>
      <main className="dark:bg-black bg-white w-80vh p-8 h-screen overflow-auto">
        <form className="space-y-4" onSubmit={handleUpdate}>
          <h1 className="text-2xl dark:text-white text-black mb-6 text-left">
            Update Information
          </h1>
          <div className="flex justify-start flex-col">
            <label className="mb-1 text-black dark:text-white">
              Profile Picture
            </label>
            <input
              className="dark:text-white bg-lightGray dark:text-e dark:bg-slateGray p-1 rounded-lg"
              type="file"
              accept="image/png, image/jpeg"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-black dark:text-white">Fullname</label>
            <input
              className="dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white"
              type="text"
              placeholder="Enter a fullname"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 dark:text-white text-black">Gender</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center dark:text-white text-black">
                <input
                  type="radio"
                  name="gender"
                  value="Men"
                  className="mr-2 dark:text-white text-black"
                  onChange={(e) => setGender(e.target.value)}
                />
                Men
              </label>
              <label className="flex items-center dark:text-white text-black">
                <input
                  type="radio"
                  name="gender"
                  value="Woman"
                  className="mr-2 dark:text-white text-black"
                  onChange={(e) => setGender(e.target.value)}
                />
                Woman
              </label>
              <label className="flex items-center dark:text-white text-black">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  className="mr-2 dark:text-white text-black"
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 dark:text-white text-black">
              Description
            </label>
            <input
              className="dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white"
              type="text"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDecription(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 dark:text-white text-black">Location</label>
            <input
              className="dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white"
              type="text"
              placeholder="Enter a location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 dark:text-white text-black">Workplace</label>
            <input
              className="dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white"
              type="text"
              placeholder="Enter a workplace"
              value={workplace}
              onChange={(e) => setWorkPlace(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 dark:text-white text-black">
              Personal Website
            </label>
            <input
              className="dark:placeholder-lightGray placeholder-slateGray bg-lightGray text-black dark:bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-white"
              type="text"
              placeholder="Enter a link"
              value={website}
              onChange={(e) => setWebSite(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className=" bg-liquidLava hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Update
            </button>
          </div>
        </form>
      </main>
    </AuthGuard>
  );
};

export default EditProfile;
