'use client'

import React, { useState } from 'react';
import Comments from '../comments/Comments';
import AuthGuard from "@/components/Guards/AuthGuard";
import { useAuth } from '@/context/authContext';
import { useDeleteFavouriteMutation, useAddFavouriteMutation } from '@/redux/services/favouritesApi';
import { useCreateLikeMutation, useDeleteLikeMutation } from '@/redux/services/likesApi';

interface PostProps {
  userid: string;
  title: string;
  description: string;
  likes: number;
  updateDate: Date;
  media: string;
  comments: number;
  favorites: number;
  postId: string;
}

const Post: React.FC<PostProps> = ({ userid, updateDate, media, likes, comments, description, favorites, postId }) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const [addFavourite, { isLoading: isLoadingAddFav, error: errorAddFav }] = useAddFavouriteMutation();
  const [deleteFavourite, { isLoading: isLoadingDelFav, error: errorDelFav }] = useDeleteFavouriteMutation();
  const [createLike, { isLoading: isLoadingAddLike, error: errorAddLike }] = useCreateLikeMutation();
  const [deleteLike, { isLoading: isLoadingDelLike, error: errorDelLike }] = useDeleteLikeMutation();
  
  const { getCurrentUTCDate } = useAuth();
  const date = getCurrentUTCDate();

  const handleLikeClick = async () => {
    const data = {
      userid,
      postId,
      date,
      action: isLiked ? 'unlike' : 'like'
    };
    console.log(data);

    try {
      if (isLiked) {
        await deleteLike({ userid, postId, date });
        setIsLiked(false);
      } else {
        await createLike({ userid, postId, date });
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error handling like action:', error);
    }
  };

  const handleFavoriteClick = async () => {
    const data = {
      userid,
      postId,
      date,
      action: isFavorited ? 'unfavorite' : 'favorite'
    };
    console.log(data);

    try {
      if (isFavorited) {
        await deleteFavourite({ userid, postId, date });
        setIsFavorited(false);
      } else {
        await addFavourite({ userid, postId, date });
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error handling favorite action:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <AuthGuard>
      <div className="border border-gray-700 p-4 m-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-lg max-w-4xl mx-auto">
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

        <div className="text-black dark:text-white bg-white dark:bg-black rounded-lg mb-4 mx-auto flex items-center justify-center overflow-hidden w-fit self-center">
          <img src={media} alt="Media content" className="h-full object-cover" />
        </div>

        <div className="flex justify-around mb-4">
          <section className="flex items-center">
            <button 
              className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'}`} 
              onClick={handleLikeClick} 
              disabled={isLoadingAddLike || isLoadingDelLike}
            >
              {likes} <span className="ml-1">♥</span>
            </button>
          </section>

          <section className="flex items-center cursor-pointer" onClick={toggleComments}>
            {comments} <span className="ml-1">💬</span>
          </section>

          <section className="flex items-center">
            <button 
              className={`flex items-center ${isFavorited ? 'text-yellow-500' : 'text-gray-500'}`} 
              onClick={handleFavoriteClick} 
              disabled={isLoadingAddFav || isLoadingDelFav}
            >
              {favorites} <span className="ml-1">⭐</span>
            </button>
          </section>
        </div>

        <div className="text-black dark:text-white bg-white dark:bg-black p-4 rounded">
          <p>{description}</p>
        </div>

        {showComments && <Comments />}
      </div>
    </AuthGuard>
  );
};

export default Post;
