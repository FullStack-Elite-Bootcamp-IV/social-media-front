'use client';

import React, { useState, useEffect } from 'react';
import Comments from '../comments/Comments';
import { useDeleteFavouriteMutation, useAddFavouriteMutation, useGetFavouritesByUserIdQuery } from '@/store/services/favouritesApi';
import { useGetUserByIdQuery } from '@/store/services/usersApi';
import { useUser } from '@/context/UserContext';
import { useLikePostMutation, useUnlikePostMutation } from '@/store/services/postsApi';
import { useGetLikesByPostIdQuery } from '@/store/services/likesApi';
import { useCreateNotificationMutation } from '@/store/services/notificationsApi';

interface PostProps {
  userId: string;
  title: string;
  description: string;
  likes: number;
  updateDate: Date;
  media: string;
  comments: number;
  favourites: number;
  postId: string;
}

interface LikeAndPost {
  userId: string;
  postId: string;
}

const Post: React.FC<PostProps> = ({ userId, updateDate, media, likes, comments, description, favourites, postId }) => {
  const { user } = useUser();
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [initialLikes, setInitialLikes ] = useState(likes);
  const [isFavorited, setIsFavorited] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const [addFavourite, { isLoading: isLoadingAddFav }] = useAddFavouriteMutation();
  const [deleteFavourite, { isLoading: isLoadingDelFav }] = useDeleteFavouriteMutation();
  const [likePost, { isLoading: isLoadingAddLike }] = useLikePostMutation();
  const [unlikePost, { isLoading: isLoadingDelLike }] = useUnlikePostMutation();
  const [createNotification] = useCreateNotificationMutation();

  const { data: likePostData } = useGetLikesByPostIdQuery(postId);
  const { data: favouritesPostData } = useGetFavouritesByUserIdQuery(user?.userId);
  const { data: userData } = useGetUserByIdQuery(userId);
  const userLike = likePostData?.some((like: LikeAndPost) => like.userId === user?.userId);
  const userFavourite = favouritesPostData?.some((favourite: LikeAndPost) => favourite.postId === postId);
  const userName = userData?.userName;
  
  const notificationContent = `${user?.userName} Has liked one of your posts`;
  
  useEffect(() => {
    setDate(new Date(updateDate)); // Convert the updateDate string to a Date object
  }, [updateDate, userData]);

  useEffect(() => {
    if (likePostData) {
      setIsLiked(userLike ? true : false);
    }
  }, [userLike]);

  useEffect(() => {
    if (favouritesPostData) {
      setIsFavorited(userFavourite ? true : false);
    }
  }, [userFavourite]);

  const handleLikeClick = async () => {
    const data = {
      userId: user?.userId,
      postId: postId,
    };

    try {
      if (isLiked) {
        await unlikePost(data);
        setInitialLikes(initialLikes - 1);
        const notification = createNotification({
          emisorUser: user?.userId, 
          receptorUser: userId, 
          action: 'likes', 
          title: "New Liked",
          description: notificationContent
        });
      } else {
        await likePost(data);
        setInitialLikes(initialLikes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavoriteClick = async () => {
    const data = {
      userId: user?.userId,
      postId: postId,
    };
    try {
      if (isFavorited) {
        await deleteFavourite(data);
      } else {
        await addFavourite(data);
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error handling favorite action:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(true);
  };

  return (
    <div className="border border-gray-700 p-4 m-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <a href={ userName === user?.userName ? `/profile/${user?.userName}` : `/${userName}`}>
            <h1 className="ml-2">
              { userName || 'Usuario NN' }
            </h1>
          </a>
        </div>
        <div className="text-black dark:text-white bg-white dark:bg-black px-2 py-1 rounded">
          {date.toDateString()}
        </div>
      </div>

      {media && (
        <div className="text-black dark:text-white bg-white dark:bg-black rounded-lg mb-4 mx-auto flex items-center justify-center overflow-hidden w-fit self-center">
          <img src={media} alt="Media content" className="h-full object-cover" />
        </div>
      )}

      <div className="text-black dark:text-white bg-white dark:bg-black p-4 rounded">
        <p>{description}</p>
      </div>

      <div className="flex justify-around mt-4">
        <section className="flex items-center">
          <button
            className={`flex items-center ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
            onClick={handleLikeClick}
            disabled={isLoadingAddLike || isLoadingDelLike}
          >
            {initialLikes} <span className="ml-1">♥</span>
          </button>
        </section>

        <section className="flex items-center cursor-pointer" onClick={toggleComments}>
          {comments} <span className="ml-1">💬</span>
        </section>

        <section className="flex items-center">
          <button
            className={`flex items-center text-xl ${isFavorited ? 'text-yellow-500' : 'text-gray-500'}`}
            onClick={handleFavoriteClick}
            disabled={isLoadingAddFav || isLoadingDelFav}
          >
            {favourites} <span className="ml-1">★</span>
          </button>
        </section>
      </div>

      {showComments && <Comments postId={postId} setShowComments={setShowComments} />}
    </div>
  );
};

export default Post;
