'use client';

import React, { useState, useEffect } from 'react';
import Post from '@/components/post/Post';
import Navbar from '@/components/navbar/Navbar';
import { useGetAllPublicsPostsQuery } from '@/store/services/postsApi';
import { useUser } from '@/context/UserContext';

interface PostData {
  userId: string;
  title: string;
  description: string;
  media: string;
  likes: number;
  updateDate: Date;
  publicationDate: Date; // Ensure this property is a Date object
  comments: number;
  favorites: number;
  postId: string;
  isPublic?: boolean; // Ensure your data includes this property
}

const HomePage: React.FC = () => {
  const { user } = useUser();
  const id = user?.userId;
  const { data, isLoading, error } = useGetAllPublicsPostsQuery(id);

  const [posts, setPosts] = useState<PostData[]>([]);
  const [liked, setLiked] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [publics, setPublics] = useState(false);
  const [privates, setPrivates] = useState(false);

  useEffect(() => {
    if (data) {
      const processedPosts = data.map((post: PostData) => ({
        ...post,
        publicationDate: new Date(post.publicationDate) // Convert publicationDate to Date
      }));
      setPosts(processedPosts);
    }
  }, [data]);

  const setLikeds = () => {
    setLiked(true);
    setFavorite(false);
    setPublics(false);
    setPrivates(false);
  };

  const setFavorites = () => {
    setFavorite(true);
    setLiked(false);
    setPublics(false);
    setPrivates(false);
  };

  const setPublices = () => {
    setLiked(false);
    setFavorite(false);
    setPublics(true);
    setPrivates(false);
  };

  const setPrivatesPost = () => {
    setLiked(false);
    setFavorite(false);
    setPublics(false);
    setPrivates(true);
  };

  const filterPosts = () => {
    let filteredPosts = posts;

    if (liked) {
      filteredPosts = filteredPosts.filter(post => post.likes > 0);
    }
    if (favorite) {
      filteredPosts = filteredPosts.filter(post => post.favorites > 0);
    }
    if (publics) {
      filteredPosts = filteredPosts.filter(post => post.isPublic);
    }
    if (privates) {
      filteredPosts = filteredPosts.filter(post => !post.isPublic);
    }

    // Sort posts by publication date (newest to oldest)
    filteredPosts.sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime());

    return filteredPosts;
  };

  const displayedPosts = filterPosts();

  return (
    <>
      <Navbar />
      <div className='items-center justify-center flex pt-20 md:pt-4 md:ml-64 gap-4 py-2 flex-wrap dark:bg-gray-900'>
        <button onClick={setLikeds} className='dark:text-blancoHueso text-darkVoid hover:bg-gray-300 border border-gray-400 shadow-md rounded-lg px-6 py-3'>Likes</button>
        <button onClick={setFavorites} className='dark:text-blancoHueso text-darkVoid hover:bg-gray-300 border border-gray-400 shadow-md rounded-lg px-6 py-3'>Favorites</button>
        <button onClick={setPrivatesPost} className='dark:text-blancoHueso text-darkVoid hover:bg-gray-300 border border-gray-400 shadow-md rounded-lg px-6 py-3'>Private</button>
        <button onClick={setPublices} className='dark:text-blancoHueso text-darkVoid hover:bg-gray-300 border border-gray-400 shadow-md rounded-lg px-6 py-3'>Public</button>
      </div>
      <main className="flex min-h-screen dark:bg-darkVoid">
        <div className="app flex-1 ml-0 p-2 pt-16 md:ml-64 md:pt-4 sm:p-16">
          {isLoading && <p>Loading posts...</p>}
          {error && <p>Error loading posts.</p>}
          {Array.isArray(displayedPosts) && displayedPosts.map((post, index) => (
            <Post
              key={index}
              userId={post.userId}
              title={post.title}
              description={post.description}
              media={post.media}
              likes={post.likes}
              updateDate={post.updateDate}
              comments={post.comments}
              favorites={post.favorites}
              postId={post.postId}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
