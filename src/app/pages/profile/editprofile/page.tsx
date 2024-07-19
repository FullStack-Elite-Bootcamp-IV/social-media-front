"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";

const EditProfile = () => {
  const { loginToken, register } = useAuth();

  const [fullname, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [description, setDecription] = useState("");
  const [website, setWebSite] = useState("");
  const [gender, setGender] = useState("");
  const [workplace, setWorkPlace] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    console.log(loginToken);
  }, []);

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
    <main className="bg-black w-80vh p-8 h-screen">
      <form className="space-y-4" onSubmit={handleUpdate}>
        <div className="flex justify-between">
          <h1 className="text-2xl text-white mb-6 text-left">
            Update Information
          </h1>
          <div className="flex justify-end">
            <label className="mb-1 text-white">Profile Picture</label>
            <input
              className=""
              type="file"
              accept="image/png, image/jpeg"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Fullname</label>
          <input
            className="bg-slateGray rounded-lg px-3 py-2 w-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="text"
            placeholder="Enter a fullname"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Gender</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center text-white">
              <input
                type="radio"
                name="gender"
                value="Men"
                className="mr-2 text-white"
              />
              Men
            </label>
            <label className="flex items-center text-white">
              <input
                type="radio"
                name="gender"
                value="Woman"
                className="mr-2"
              />
              Woman
            </label>
            <label className="flex items-center text-white">
              <input
                type="radio"
                name="gender"
                value="Other"
                className="mr-2"
              />
              Other
            </label>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Description</label>
          <input
            className="bg-slateGray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="text"
            placeholder="Enter a description"
            value={description}
            onChange={(e) => setDecription(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Location</label>
          <input
            className="bg-slateGray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="text"
            placeholder="Enter a location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Workplace</label>
          <input
            className="bg-slateGray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="text"
            placeholder="Enter a workplace"
            value={workplace}
            onChange={(e) => setWorkPlace(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-white">Personal Website</label>
          <input
            className="bg-slateGray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            type="text"
            placeholder="Enter a link"
            value={website}
            onChange={(e) => setWebSite(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className=" bg-liquidLava hover:bg-ligthPurple text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Update
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditProfile;
