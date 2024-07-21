'use client';

import AuthGuard from "@/app/components/Guards/AuthGuard";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import Navbar from "../../components/navbar/Navbar";
import React from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { postSchema } from "../../validations/createPostSchema";


type Inputs={
    title: string;
    description: string;
    media: File | null;
    isPublic: boolean;
}

const CreatePost = () => {
  const { loginToken } = useAuth();
  const [isPublic, setIsPublic] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>(
    { resolver: zodResolver(postSchema) }
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    console.log("Selected file:", file);
    setValue("media", file as any);
  };

  return (
    <AuthGuard>
      <Navbar />
      <main className="min-h-screen bg-blancoHueso dark:bg-slateGray flex items-center justify-center text-white px-5">
        <form onSubmit={handleSubmit(onSubmit)} className="border border-darkVoid bg-blancoHueso dark:bg-darkVoid flex flex-col justify-between p-6 rounded-xl w-full max-w-xl min-h-[600px]">
          <h1 className="text-4xl text-darkVoid dark:text-blancoHueso">CREATE A POST</h1>
          <div className="mb-4">
            <label className="block text-darkVoid dark:text-blancoHueso text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter a title"
              {...register("title")}
              className={`shadow appearance-none rounded w-full py-2 px-3 text-darkVoid bg-lightGray leading-tight focus:outline-none focus:shadow-outline placeholder-darkVoid ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-500 text-xs italic">{errors.title?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-darkVoid dark:text-blancoHueso text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter a description"
              {...register("description")}
              className={`shadow appearance-none rounded w-full py-2 px-3 text-darkVoid bg-lightGray leading-tight focus:outline-none focus:shadow-outline placeholder-darkVoid ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description?.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-darkVoid dark:text-blancoHueso text-sm font-bold mb-2">
              Media
            </label>
            <input
              type="file"
              id="media"
              title="Upload a media file"
              onChange={handleFileChange}
              className={`shadow appearance-none rounded w-full py-2 px-3 text-darkVoid bg-lightGray leading-tight focus:outline-none focus:shadow-outline placeholder-darkVoid ${errors.media ? 'border-red-500' : ''}`}
            />
            {errors.media && <p className="text-red-500 text-xs italic">{errors.media?.message}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-darkVoid dark:text-blancoHueso px-2 focus:bg-dustyGray focus:rounded"
              onClick={() => setIsPublic(true)}
            >
              <h2>Public</h2>
            </button>
            <button
              type="button"
              className="text-darkVoid dark:text-blancoHueso px-2 focus:bg-dustyGray focus:rounded"
              onClick={() => setIsPublic(false)}
            >
              <h2>Private</h2>
            </button>
          </div>
          <input type="hidden" value={isPublic.toString()} {...register("isPublic")} />
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
    </AuthGuard>
  );
};

export default CreatePost;

