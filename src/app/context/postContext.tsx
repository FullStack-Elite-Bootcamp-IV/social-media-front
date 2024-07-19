'use client';
import React from 'react';
import Link from 'next/link';

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
  return (
    <div className="border border-gray-700 p-4 m-4 bg-gray-900 text-white rounded-lg">
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

      <div className="text-black dark:text-white bg-white dark:bg-black rounded-lg h-64 mb-4 flex items-center justify-center overflow-hidden">
         <img src={media} alt="Media content" className="h-full w-full object-cover" />
      </div>


     
      <div className="flex justify-around mb-4">
        
        <section className="flex items-center">
          {/* Realizar lógica de conexión con la vista de todas las personas que han dado like */}
          <Link href="/pages/likes" className="flex items-center">
            {likes} <span className="ml-1">♥</span>
          </Link>
        </section>

        <section className="flex items-center">
          {/* Realizar lógica de conexión con la vista de todas las personas que han comentado */}
          <Link href="/pages/comments" className="flex items-center">
            {comments} <span className="ml-1">💬</span>
          </Link>
        </section>

        <section className="flex items-center">
          {/* Realizar lógica de publicaciones guardadas */}
          <Link href="/pages/favorites" className="flex items-center">
            {favorites} <span className="ml-1">⭐</span>
          </Link>
        </section>
      </div>

      <div className="text-black dark:text-white bg-white dark:bg-black p-4 rounded">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Post;
