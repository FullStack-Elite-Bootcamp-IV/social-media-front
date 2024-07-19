'use client'

import AuthGuard from "@/app/components/Guards/AuthGuard";
import { FormEvent, useState } from "react";
import { useAuth } from "../../context/authContext";
import Cookies from "js-cookie";

const CreatePost = () => {
    const { loginToken } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState<File | null>(null);
    const [isPublic, setIsPublic] = useState(true);

    const handlePost = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData={
            title,
            description,
            media,
            isPublic
        }

        console.log(formData);
    }

    return (
        <main className="min-h-screen bg-slateGray flex items-center justify-center text-white px-5">

        <form onSubmit={handlePost} className="bg-darkVoid flex flex-col justify-between p-6 rounded-xl w-full max-w-xl min-h-[600px]">

            <h1 className="text-4xl">CREATE A POST</h1>

            <div className="mb-4">
                <label className="block text-blancoHueso text-sm font-bold mb-2" >
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none  rounded w-full py-2 px-3 text-white bg-slateGray leading-tight focus:outline-none focus:shadow-outline placeholder-blancoHueso"
                />
            </div>
            <div className="mb-4">
                <label className="block text-blancoHueso text-sm font-bold mb-2" >
                    Description
                </label>
                <textarea
                    id="description"
                    placeholder="Enter a description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none  rounded w-full py-2 px-3 text-white bg-slateGray leading-tight focus:outline-none focus:shadow-outline placeholder-blancoHueso"
                />
            </div>
            <div className="mb-4">
                <label className="block text-blancoHueso text-sm font-bold mb-2" >
                    Media
                </label>
                <input
                    type="file"
                    id="media"
                    title="Upload a media file"
                    onChange={(e) => setMedia(e.target.files ? e.target.files[0] : null)}
                    className="shadow  appearance-none  rounded w-full py-2 px-3 text-white bg-slateGray leading-tight focus:outline-none focus:shadow-outline placeholder-blancoHueso"
                />
            </div>
            <div className="flex justify-end">
                <button type="button" className="px-2 focus:bg-dustyGray focus:rounded" onClick={()=>{setIsPublic(true)}}>
                    <h2>Public</h2>
                </button>

                <button type="button" className="px-2 focus:bg-dustyGray focus:rounded" onClick={()=>{setIsPublic(false)}}>
                    <h2>Private</h2>
                </button>
            </div>
            <div className="flex items-center justify-end md:justify-end">
                <button
                    type="submit"
                    className="bg-ligthPurple hover:bg-liquidLava text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Create Post
                </button>
            </div>
        </form>
    </main>
    
    );
}

export default CreatePost;
