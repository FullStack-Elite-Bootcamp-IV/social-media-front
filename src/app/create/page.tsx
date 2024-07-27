'use client'

import { FormEvent, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import React from 'react';
import { z } from 'zod';
import { postSchema } from "@/validations/createPostSchema";
import {useCreatePostMutation, useUploadImageMutation} from "@/store/services/postsApi";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const CreatePostPage = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [errors, setErrors] = useState<any>({}); // Para almacenar los errores de validación
  const router = useRouter();

  const [createPost, { isLoading, error, isSuccess }] = useCreatePostMutation();
  const [uploadImage, { isLoading: isUploading, error: uploadError, isSuccess: isUploadSuccess }] = useUploadImageMutation();

  const user = useUser();

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const date = new Date();

    console.log("user:", user);
    console.log("media:", media);

    let imageUrl = '';

    if (media) {
      try {
        const response = await uploadImage(media).unwrap();
        imageUrl = response.imageUrl;
        console.log('Image URL:', imageUrl);
      } catch (error) {
        console.error('Failed to upload image:', error);
        return; // Salir si la subida de la imagen falla
      }
    }

    const result = await createPost({
      title,
      description,
      isPublic,
      userId: user.user?.userId,
      media: imageUrl,
    });

    console.log(result)
    
    try {
      postSchema.parse({
        title,
        description,
        media,
        isPublic,
        date
      });


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

    router.push('/homepage');
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-blancoHueso dark:bg-slateGray flex items-center justify-center text-white px-5">
        <form onSubmit={handlePost} className="border border-darkVoid bg-blancoHueso dark:bg-darkVoid flex flex-col justify-between p-6 rounded-xl w-full max-w-xl min-h-[600px]">
          <h1 className="text-4xl text-darkVoid dark:text-blancoHueso">CREATE A POST</h1>
          
          <div className="mb-4">
          <label className="block text-darkVoid dark:text-blancoHueso text-sm font-bold mb-2">
              Title
            </label>
            <textarea
              id="title"
              placeholder="Enter a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`shadow appearance-none rounded w-full py-2 px-3 text-darkVoid bg-lightGray leading-tight focus:outline-none focus:shadow-outline placeholder-darkVoid ${errors.title ? 'border-red-500' : ''}`}
            />
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
    </>
  );
}

export default CreatePostPage;
