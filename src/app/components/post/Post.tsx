'use client';
<<<<<<< HEAD
import React from 'react';
import Link from 'next/link';
=======
import React, { useState } from 'react';
import Link from 'next/link';
import Comments from '../comments/Comments';
>>>>>>> 4d07b7a6da8b5c9471bf009f37f716f78b5e127c

interface PostProps {
  userid: string;
  title: string;
  description: string;
  likes: number;
  updateDate: Date;
  media: string;
  comments: number;
  favorites: number;
}

const Post: React.FC<PostProps> = ({ userid, updateDate, media, likes, comments, description, favorites }) => {
<<<<<<< HEAD
  return (
    <div className="border border-gray-700 p-4 m-4 bg-gray-900 text-white rounded-lg">
=======
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="border border-gray-700 p-4 m-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-lg max-w-4xl mx-auto">
>>>>>>> 4d07b7a6da8b5c9471bf009f37f716f78b5e127c
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="text-black dark:text-white bg-white dark:bg-black rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-lg font-bold">{userid[0].toUpperCase()}</span>
          </div>
          <h1 className="ml-2">{userid}</h1>
        </div>
        <div className="text-black dark:text-white bg-white dark:bg-black px-2 py-1 rounded">
          {updateDate.toDateString()}
        </div>
      </div>

<<<<<<< HEAD
      <div className="text-black dark:text-white bg-white dark:bg-black rounded-lg h-64 mb-4 flex items-center justify-center overflow-hidden">
         <img src={media} alt="Media content" className="h-full w-full object-cover" />
      </div>


     
      <div className="flex justify-around mb-4">
        
        <section className="flex items-center">
          {/* Realizar lógica de conexión con la vista de todas las personas que han dado like */}
=======
      <div className="text-black dark:text-white bg-white dark:bg-black rounded-lg mb-4 mx-auto flex items-center justify-center overflow-hidden w-fit self-center">
        <img src={media} alt="Media content" className="h-full object-cover" />
      </div>

      <div className="flex justify-around mb-4">
        <section className="flex items-center">
>>>>>>> 4d07b7a6da8b5c9471bf009f37f716f78b5e127c
          <Link href="/pages/likes" className="flex items-center">
            {likes} <span className="ml-1">♥</span>
          </Link>
        </section>

<<<<<<< HEAD
        <section className="flex items-center">
          {/* Realizar lógica de conexión con la vista de todas las personas que han comentado */}
          <Link href="/pages/comments" className="flex items-center">
            {comments} <span className="ml-1">💬</span>
          </Link>
        </section>

        <section className="flex items-center">
          {/* Realizar lógica de publicaciones guardadas */}
=======
        <section className="flex items-center cursor-pointer" onClick={toggleComments}>
          {comments} <span className="ml-1">💬</span>
        </section>

        <section className="flex items-center">
>>>>>>> 4d07b7a6da8b5c9471bf009f37f716f78b5e127c
          <Link href="/pages/favorites" className="flex items-center">
            {favorites} <span className="ml-1">⭐</span>
          </Link>
        </section>
      </div>

      <div className="text-black dark:text-white bg-white dark:bg-black p-4 rounded">
        <p>{description}</p>
      </div>
<<<<<<< HEAD
=======

      {showComments && <Comments />}
>>>>>>> 4d07b7a6da8b5c9471bf009f37f716f78b5e127c
    </div>
  );
};

export default Post;
<<<<<<< HEAD
=======

>>>>>>> 4d07b7a6da8b5c9471bf009f37f716f78b5e127c
