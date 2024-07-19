'use client'

import { useEffect } from "react";
import { useAuth } from "../../../context/authContext";

const EditProfile = () => {
    const { loginToken, register } = useAuth();

    useEffect(() => {
        console.log(loginToken);
    }, []);

    return (
        <div className="bg-black">
            <h1>Edit profile</h1>
            <p>Roboto</p>
        </div>
    );
}

export default EditProfile;