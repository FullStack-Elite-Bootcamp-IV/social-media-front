"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";

const EditProfile = () => {
  const { loginToken, register } = useAuth();
  const [username, setUserName] = useState("");
  const [fullname, setFullName] = useState("");
  const [description, setDecription] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [website, setWebSite] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");

  const handleUpdate = () => {};

  useEffect(() => {
    console.log(loginToken);
  }, []);

  return (
    <main className="bg-black">
      <h1 className="bg-black">Update Information</h1>
      <form id="UpdateForm" onSubmit={handleUpdate}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Fullname</label>
        <input
          type="text"
          placeholder="Fullname"
          value={fullname}
          onChange={(e) => setFullName(e.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDecription(e.target.value)}
        />
        <label>Personal Website</label>
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebSite(e.target.value)}
        />
        <label>Gender</label>
        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <label>Location</label>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </form>
    </main>
  );
};

export default EditProfile;
