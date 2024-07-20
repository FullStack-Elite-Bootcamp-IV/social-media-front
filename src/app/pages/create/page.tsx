'use client'

import AuthGuard from "@/app/components/Guards/AuthGuard";
import { FormEvent, useState } from "react";
import { useAuth } from "../../context/authContext";
import Navbar from "../../components/navbar/Navbar";
import React from 'react';
import { z } from 'zod';
import { postSchema } from "@/app/validations/createPostSchema";



const CreatePost = () => {
  const { loginToken } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [errors, setErrors] = useState<any>({}); // Para almacenar los errores de validación

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      postSchema.parse({
        title,
        description,
        media,
        isPublic
      });

      // Si la validación es exitosa, puedes manejar los datos aquí
      console.log({ title, description, media, isPublic });
      setErrors({}); // Limpiar los errores si la validación es exitosa
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: any = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error('Create post error:', err);
      }
    }
  }

  return (
    <AuthGuard>
      <Navbar />
      <main className="min-h-screen bg-blancoHueso dark:bg-slateGray flex items-center justify-center text-white px-5">
        <form onSubmit={handlePost} className="border border-darkVoid bg-blancoHueso dark:bg-darkVoid flex flex-col justify-between p-6 rounded-xl w-full max-w-xl min-h-[600px]">
          <h1 className="text-4xl text-darkVoid dark:text-blancoHueso">CREATE A POST</h1>
          <div className="mb-4">
            <label className="block text-darkVoid dark:text-blancoHueso text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`shadow appearance-none rounded w-full py-2 px-3 text-darkVoid bg-lightGray leading-tight focus:outline-none focus:shadow-outline placeholder-darkVoid ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-darkVoid dark:text-blancoHueso text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`shadow appearance-none rounded w-full py-2 px-3 text-darkVoid bg-lightGray leading-tight focus:outline-none focus:shadow-outline placeholder-darkVoid ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-darkVoid dark:text-blancoHueso text-sm font-bold mb-2">
              Media
            </label>
            <input
              type="file"
              id="media"
              title="Upload a media file"
              onChange={(e) => setMedia(e.target.files ? e.target.files[0] : null)}
              className={`shadow appearance-none rounded w-full py-2 px-3 text-darkVoid bg-lightGray leading-tight focus:outline-none focus:shadow-outline placeholder-darkVoid ${errors.media ? 'border-red-500' : ''}`}
            />
            {errors.media && <p className="text-red-500 text-xs italic">{errors.media}</p>}
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
}

export default CreatePost;
